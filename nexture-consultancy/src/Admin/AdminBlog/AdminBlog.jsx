import React, { useState, useEffect } from "react";
import "./AdminBlog.css";
import axios from "axios";
import base_url from "../../../config";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBlog, setEditBlog] = useState({
    _id: "",
    title: "",
    content: "",
    tags: [],
    status: "published",
    images: []
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    scheduled: 0
  });

  const blogsPerPage = 5;

  // Calculate statistics
  const calculateStats = (blogData) => {
    const stats = {
      total: blogData.length,
      published: blogData.filter(blog => blog.status === "published" || !blog.status).length,
      draft: blogData.filter(blog => blog.status === "draft").length,
      scheduled: blogData.filter(blog => blog.status === "scheduled").length
    };
    setStats(stats);
  };

  const createBlog = () => {
    setEditBlog({
      _id: "",
      title: "New Blog Post",
      content: "Start writing your content here...",
      tags: [],
      status: "draft",
      images: []
    });
    setSelectedImages([]);
    setImagePreview([]);
    setShowEditModal(true);
  };

  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/api/blogs`);
      const blogsWithStatus = response.data.map(blog => ({
        ...blog,
        status: blog.status || "published"
      }));
      setBlogs(blogsWithStatus);
      setFilteredBlogs(blogsWithStatus);
      calculateStats(blogsWithStatus);
      setError(null);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    
    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreview(previewUrls);
  };

  // Remove image from preview
  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreview(newPreviews);
  };

  // Save blog (create or update)
  const saveBlog = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editBlog.title);
      formData.append('content', editBlog.content);
      formData.append('tags', JSON.stringify(editBlog.tags));
      formData.append('status', editBlog.status);
      
      // Add images to FormData
      selectedImages.forEach((image, index) => {
        formData.append('images', image);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editBlog._id) {
        await axios.put(`${base_url}/api/blogs/${editBlog._id}`, formData, config);
      } else {
        await axios.post(`${base_url}/api/blogs/create-blog`, formData, config);
      }

      setShowEditModal(false);
      setSelectedImages([]);
      setImagePreview([]);
      getBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      setError("Failed to save blog. Please try again.");
    }
  };

  // Delete blog
  const deleteBlog = async () => {
    if (!blogToDelete) return;
    
    try {
      await axios.delete(`${base_url}/api/blogs/${blogToDelete}`);
      setShowDeleteModal(false);
      setBlogToDelete(null);
      getBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete blog. Please try again.");
    }
  };

  // Handle tag addition
  const addTag = () => {
    if (newTag.trim() && !editBlog.tags.includes(newTag.trim())) {
      setEditBlog({
        ...editBlog,
        tags: [...editBlog.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setEditBlog({
      ...editBlog,
      tags: editBlog.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...blogs];
    
    if (searchTerm) {
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== "All Status") {
      const status = statusFilter.toLowerCase();
      result = result.filter(blog => blog.status === status);
    }
    
    if (categoryFilter !== "All Categories") {
      result = result.filter(blog => 
        blog.tags.some(tag => tag.toLowerCase() === categoryFilter.toLowerCase())
      );
    }
    
    setFilteredBlogs(result);
    setCurrentPage(1);
  }, [blogs, searchTerm, statusFilter, categoryFilter]);

  // Get current blogs for pagination
  const getCurrentBlogs = () => {
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    return filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <header className="admin-blog-header">
        <div className="admin-blog-container">
          <div className="admin-blog-header-content">
            <div>
              <h1>Blog Management</h1>
              <p>Manage your blog posts and content with ease</p>
            </div>
            <button onClick={createBlog} className="admin-blog-btn-primary">
              <i className="fas fa-plus"></i>
              New Post
            </button>
          </div>
        </div>
      </header>

      <div className="admin-blog-container">
        {error && (
          <div className="admin-blog-error">
            <p>{error}</p>
            <button onClick={getBlogs} className="admin-blog-btn-retry">
              Try Again
            </button>
          </div>
        )}

        <div className="admin-blog-stats-grid">
          <div className="admin-blog-stat-card">
            <div className="admin-blog-stat-card-content">
              <div className="admin-blog-stat-icon blue">
                <i className="fas fa-file-alt"></i>
              </div>
              <div>
                <div className="admin-blog-stat-number">{stats.total}</div>
                <div className="admin-blog-stat-label">Total Posts</div>
              </div>
            </div>
          </div>

          <div className="admin-blog-stat-card">
            <div className="admin-blog-stat-card-content">
              <div className="admin-blog-stat-icon green">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <div className="admin-blog-stat-number">{stats.published}</div>
                <div className="admin-blog-stat-label">Published</div>
              </div>
            </div>
          </div>

          <div className="admin-blog-stat-card">
            <div className="admin-blog-stat-card-content">
              <div className="admin-blog-stat-icon yellow">
                <i className="fas fa-edit"></i>
              </div>
              <div>
                <div className="admin-blog-stat-number">{stats.draft}</div>
                <div className="admin-blog-stat-label">Drafts</div>
              </div>
            </div>
          </div>

          <div className="admin-blog-stat-card">
            <div className="admin-blog-stat-card-content">
              <div className="admin-blog-stat-icon purple">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <div className="admin-blog-stat-number">{stats.scheduled}</div>
                <div className="admin-blog-stat-label">Scheduled</div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-blog-controls">
          <div className="admin-blog-controls-grid">
            <div className="admin-blog-search-box">
              <i className="fas fa-search admin-blog-search-icon"></i>
              <input
                type="text"
                className="admin-blog-search-input"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className="admin-blog-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>

            <select 
              className="admin-blog-filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              {Array.from(new Set(blogs.flatMap(blog => blog.tags))).map((tag, index) => (
                <option key={index}>{tag}</option>
              ))}
            </select>

            <button 
              className="admin-blog-btn-secondary"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All Status");
                setCategoryFilter("All Categories");
              }}
            >
              <i className="fas fa-sync"></i>
              Reset Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin-blog-loading">
            <div className="admin-blog-loading-spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="admin-blog-empty-state">
            <div className="admin-blog-empty-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <h3>No Blog Posts Found</h3>
            <p>Try adjusting your search or filters, or create a new blog post.</p>
            <button onClick={createBlog} className="admin-blog-btn-primary" style={{ marginTop: '20px' }}>
              <i className="fas fa-plus"></i>
              Create New Post
            </button>
          </div>
        ) : (
          <div className="admin-blog-list">
            {getCurrentBlogs().map((blog) => {
              const { _id, title, content, images, tags, status, createdAt } = blog;
              return (
                <div className="admin-blog-item" key={_id}>
                  <div className="admin-blog-image-container">
                    {images && images[0] ? (
                      <img src={`${base_url}/${images[0]}`} alt={title} className="admin-blog-image"/>
                    ) : (
                      <div className="admin-blog-image admin-blog-no-image">
                        <i className="fas fa-image"></i>
                      </div>
                    )}
                  </div>
                  
                  <div className="admin-blog-content">
                    <h3>{title}</h3>
                    <div className="admin-blog-meta">
                      <span>
                        <i className="fas fa-user"></i> Nexture Education
                      </span>
                      <span>
                        <i className="fas fa-calendar"></i> {formatDate(createdAt)}
                      </span>
                      <span className={`admin-blog-status-badge admin-blog-status-${status.toLowerCase()}`}>
                        {status}
                      </span>
                    </div>
                    <p className="admin-blog-excerpt">
                      {content && content.substring(0, 100)}...
                    </p>
                    <div className="admin-blog-tags">
                      {tags && tags.map((tag, index) => (
                        <span key={index} className="admin-blog-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="admin-blog-actions">
                    <a
                      href={`/blog/${_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-blog-action-btn admin-blog-btn-view"
                      title="View Post"
                    >
                      <i className="fas fa-eye"></i>
                    </a>
                    <button
                      className="admin-blog-action-btn admin-blog-btn-edit"
                      title="Edit Post"
                      onClick={() => {
                        setEditBlog({...blog});
                        setSelectedImages([]);
                        setImagePreview([]);
                        setShowEditModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="admin-blog-action-btn admin-blog-btn-delete"
                      title="Delete Post"
                      onClick={() => {
                        setBlogToDelete(_id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredBlogs.length > blogsPerPage && (
          <div className="admin-blog-pagination">
            <button 
              className="admin-blog-page-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`admin-blog-page-btn ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button 
              className="admin-blog-page-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredBlogs.length / blogsPerPage)))}
              disabled={currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="admin-blog-modal-overlay">
          <div className="admin-blog-modal">
            <div className="admin-blog-modal-header">
              <h3>Confirm Deletion</h3>
              <button 
                className="admin-blog-modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="admin-blog-modal-body">
              <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
            </div>
            <div className="admin-blog-modal-footer">
              <button 
                className="admin-blog-btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="admin-blog-btn-danger"
                onClick={deleteBlog}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Blog Modal */}
      {showEditModal && (
        <div className="admin-blog-modal-overlay">
          <div className="admin-blog-modal admin-blog-modal-large">
            <div className="admin-blog-modal-header">
              <h3>{editBlog._id ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
              <button 
                className="admin-blog-modal-close"
                onClick={() => setShowEditModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="admin-blog-modal-body">
              <div className="admin-blog-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editBlog.title}
                  onChange={(e) => setEditBlog({...editBlog, title: e.target.value})}
                  className="admin-blog-form-input"
                  placeholder="Enter blog title"
                />
              </div>
              
              <div className="admin-blog-form-group">
                <label>Content</label>
                <textarea
                  value={editBlog.content}
                  onChange={(e) => setEditBlog({...editBlog, content: e.target.value})}
                  className="admin-blog-form-textarea"
                  placeholder="Write your blog content here..."
                  rows={10}
                />
              </div>
              
              <div className="admin-blog-form-group">
                <label>Status</label>
                <select
                  value={editBlog.status}
                  onChange={(e) => setEditBlog({...editBlog, status: e.target.value})}
                  className="admin-blog-form-select"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div className="admin-blog-form-group">
                <label>Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="admin-blog-form-input"
                />
                {imagePreview.length > 0 && (
                  <div className="admin-blog-image-preview-container">
                    {imagePreview.map((url, index) => (
                      <div key={index} className="admin-blog-image-preview">
                        <img src={url} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          className="admin-blog-remove-image"
                          onClick={() => removeImage(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {editBlog.images && editBlog.images.length > 0 && (
                  <div className="admin-blog-existing-images">
                    <label>Existing Images:</label>
                    <div className="admin-blog-image-preview-container">
                      {editBlog.images.map((image, index) => (
                        <div key={index} className="admin-blog-image-preview">
                          <img src={`${base_url}/${image}`} alt={`Existing ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="admin-blog-form-group">
                <label>Tags</label>
                <div className="admin-blog-tag-input-container">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="admin-blog-form-input"
                    placeholder="Add a tag and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <button 
                    className="admin-blog-btn-secondary"
                    onClick={addTag}
                  >
                    Add
                  </button>
                </div>
                <div className="admin-blog-tags admin-blog-edit-tags">
                  {editBlog.tags && editBlog.tags.map((tag, index) => (
                    <span key={index} className="admin-blog-tag admin-blog-tag-removable">
                      {tag}
                      <button 
                        className="admin-blog-tag-remove"
                        onClick={() => removeTag(tag)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="admin-blog-modal-footer">
              <button 
                className="admin-blog-btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="admin-blog-btn-primary"
                onClick={saveBlog}
              >
                Save Blog Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBlog;
