import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./BlogPage.css";
import axios from 'axios';
import base_url from '../../../config';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/api/blogs`);
      setBlogs(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // Filter blogs based on search term and selected tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Get all unique tags from blogs
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Truncate text function
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <>


      <div className="blog-posts-container">
        <div className="blog-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <select 
              value={selectedTag} 
              onChange={(e) => {
                setSelectedTag(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="tag-filter"
            >
              <option value="">All Tags</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        <h1 className="section-title">Latest Articles</h1>
        <p className="section-subtitle">Insights and tips for your international education journey</p>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={getBlogs} className="retry-button">Try Again</button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="no-results">
            <p>No blog posts found matching your criteria.</p>
            {(searchTerm || selectedTag) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }} 
                className="clear-filters-button"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="blog-posts-grid">
              {currentBlogs.map((post) => {
                const { _id, title, content, images, tags, createdAt } = post;
                return (
                  <article key={_id} className="blog-post-card">
                    <div className="blog-post-image">
                      {images && images[0] ? (
                        <img src={`${base_url}/${images[0]}`} alt={title} />
                      ) : (
                        <div className="image-placeholder">
                          <span className="placeholder-icon">🖼️</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span className="author">
                          <span className="author-icon">👤</span>
                          Nexture Education
                        </span>
                        <span className="date">
                          <span className="date-icon">📅</span>
                          {formatDate(createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="blog-post-title">{title}</h3>
                      
                      <p className="blog-post-excerpt">{truncateText(content, 150)}</p>
                      
                      <div className="blog-post-footer">
                        <div className="tags-container">
                          {tags && tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="tag"
                              onClick={() => {
                                setSelectedTag(tag);
                                setCurrentPage(1);
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <Link to={`/blog/${_id}`} className="read-more-link">
                          Read More
                          <span className="arrow-icon">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            
            {/* Pagination */}
            {filteredBlogs.length > blogsPerPage && (
              <div className="pagination">
                {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BlogPage;