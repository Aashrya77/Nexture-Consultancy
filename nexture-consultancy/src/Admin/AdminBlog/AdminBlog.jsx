import React, { useState, useEffect } from "react";
import "./AdminBlog.css";
import axios from "axios";
import base_url from "../../../config";
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/models/dom/model';
import 'tinymce/icons/default/icons';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';

// Prevent TinyMCE from attempting to fetch a license manager plugin over the network
// when running under strict CSP in production.
if (typeof tinymce !== 'undefined' && tinymce?.PluginManager) {
  try {
    tinymce.PluginManager.add('licensekeymanager', () => {});
  } catch (_) {}
}

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

  const getAssetUrl = (assetPath) => {
    if (!assetPath || typeof assetPath !== 'string') return '';
    if (/^https?:\/\//i.test(assetPath)) return assetPath;
    const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
    return `${base_url}${normalized}`;
  };

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
      title: "",
      content: "",
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
      const blogData = response.data.data || response.data || [];
      const blogsWithStatus = blogData.map(blog => ({
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
                      <img src={getAssetUrl(images[0])} alt={title} className="admin-blog-image"/>
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
          <div className="admin-blog-modal admin-blog-modal-large" style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px 0 rgba(80,86,170,0.14)', padding: 0, maxWidth: 680, width: '100%' }}>
            <div className="admin-blog-modal-header" style={{ borderBottom: '2px solid #a78bfa', padding: '28px 32px 18px 32px', background: '#f9fafb', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#3730a3', margin: 0 }}>{editBlog._id ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
              <button 
                className="admin-blog-modal-close"
                style={{ fontSize: '2.2rem', color: '#8b5cf6', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setShowEditModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="admin-blog-modal-body" style={{ padding: '30px 32px', background: '#fff' }}>
              <div className="admin-blog-form-group">
                <label style={{ color: '#3730a3', fontWeight: 700 }}>Title</label>
                <input
                  type="text"
                  value={editBlog.title}
                  onChange={(e) => setEditBlog({...editBlog, title: e.target.value})}
                  className="admin-blog-form-input"
                  placeholder="Enter blog title"
                  style={{ borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f9fafb', fontSize: 16, padding: '12px 14px', marginBottom: 0 }}
                />
              </div>
              <div className="admin-blog-form-group">
                <label style={{ color: '#3730a3', fontWeight: 700 }}>Content</label>
                <Editor
                  tinymce={tinymce}
                  value={editBlog.content}
                  onEditorChange={(content) => setEditBlog({ ...editBlog, content })}
                  init={{
                    height: 300,
                    menubar: false,
                    skin: false,
                    content_css: false,
                    branding: false,
                    promotion: false,
                    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table wordcount',
                    model: 'dom',
                    license_key: 'gpl',
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat',
                  }}
                />
              </div>
              <div className="admin-blog-form-group" style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ color: '#3730a3', fontWeight: 700 }}>Status</label>
                  <select
                    value={editBlog.status}
                    onChange={(e) => setEditBlog({...editBlog, status: e.target.value})}
                    className="admin-blog-form-select"
                    style={{ borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f9fafb', fontSize: 15, padding: '10px 12px' }}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div style={{ flex: 2 }}>
                  <label style={{ color: '#3730a3', fontWeight: 700 }}>Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="admin-blog-form-input"
                    style={{ borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f9fafb', fontSize: 15, padding: '10px 12px' }}
                  />
                  {imagePreview.length > 0 && (
                    <div className="admin-blog-image-preview-container" style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                      {imagePreview.map((url, index) => (
                        <div key={index} className="admin-blog-image-preview" style={{ position: 'relative' }}>
                          <img src={url} alt={`Preview ${index + 1}`} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 8px 0 rgba(139,92,246,0.09)' }} />
                          <button
                            type="button"
                            className="admin-blog-remove-image"
                            onClick={() => removeImage(index)}
                            style={{ position: 'absolute', top: -10, right: -10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', width: 22, height: 22, color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px 0 rgba(139,92,246,0.09)' }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {editBlog.images && editBlog.images.length > 0 && (
                    <div className="admin-blog-existing-images" style={{ marginTop: 8 }}>
                      <label style={{ fontWeight: 600, color: '#555' }}>Existing Images:</label>
                      <div className="admin-blog-image-preview-container" style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                        {editBlog.images.map((image, index) => (
                          <div key={index} className="admin-blog-image-preview">
                            <img src={getAssetUrl(image)} alt={`Existing ${index + 1}`} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 8px 0 rgba(139,92,246,0.09)' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="admin-blog-form-group">
                <label style={{ color: '#3730a3', fontWeight: 700 }}>Tags</label>
                <div className="admin-blog-tag-input-container" style={{ gap: 6 }}>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="admin-blog-form-input"
                    placeholder="Add a tag and press Enter"
                    style={{ borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f9fafb', fontSize: 15, padding: '10px 12px' }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <button 
                    className="admin-blog-btn-secondary"
                    style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px 0 rgba(139,92,246,0.07)' }}
                    onClick={addTag}
                  >
                    Add
                  </button>
                </div>
                <div className="admin-blog-tags admin-blog-edit-tags" style={{ marginTop: 8, gap: 6 }}>
                  {editBlog.tags && editBlog.tags.map((tag, index) => (
                    <span key={index} className="admin-blog-tag admin-blog-tag-removable" style={{ background: '#ede9fe', color: '#7c3aed', borderRadius: 6, padding: '4px 12px', marginRight: 8, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center' }}>
                      {tag}
                      <button 
                        className="admin-blog-tag-remove"
                        style={{ background: 'none', border: 'none', color: '#a21caf', fontSize: 13, marginLeft: 6, cursor: 'pointer' }}
                        onClick={() => removeTag(tag)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="admin-blog-modal-footer" style={{ borderTop: '1.5px solid #e5e7eb', padding: '22px 32px', background: '#f9fafb', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
              <button 
                className="admin-blog-btn-secondary"
                style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginRight: 10 }}
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="admin-blog-btn-primary"
                style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 8px 0 rgba(139,92,246,0.09)' }}
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
