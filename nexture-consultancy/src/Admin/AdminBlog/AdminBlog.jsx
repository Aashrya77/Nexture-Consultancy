import React, { useEffect } from "react";
import "./AdminBlog.css";
import axios from "axios";
import base_url from "../../../config";

const AdminBlog = () => {
  const [blogs, setBlogs] = React.useState([]); // State to hold blog posts

  const createBlog = async () => {
    try {
      const response = await axios.post(`${base_url}/api/blogs`, {
        title: "",
        content: ""
      });
    } catch (error) {
      
    }
  }

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${base_url}/api/blogs`);
      console.log(response.data);

      setBlogs(response.data); 
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
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
            <a href="#" className="admin-blog-btn-primary">
              <i className="fas fa-plus"></i>
              New Post
            </a>
          </div>
        </div>
      </header>

      <div className="admin-blog-container">
        <div className="admin-blog-stats-grid">
          <div className="admin-blog-stat-card">
            <div className="admin-blog-stat-card-content">
              <div className="admin-blog-stat-icon blue">
                <i className="fas fa-file-alt"></i>
              </div>
              <div>
                <div className="admin-blog-stat-number">24</div>
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
                <div className="admin-blog-stat-number">18</div>
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
                <div className="admin-blog-stat-number">5</div>
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
                <div className="admin-blog-stat-number">1</div>
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
              />
            </div>

            <select className="admin-blog-filter-select">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>

            <select className="admin-blog-filter-select">
              <option>All Categories</option>
              <option>Universities</option>
              <option>Scholarships</option>
              <option>Visa</option>
              <option>Study Abroad</option>
            </select>

            <a href="#" className="admin-blog-btn-secondary">
              <i className="fas fa-filter"></i>
              More Filters
            </a>
          </div>
        </div>

        <div className="admin-blog-list">
          {blogs.map((blog) => {
            const { _id, title, content, images, tags } = blog;
            return (
              <div className="admin-blog-item" key={_id}>
              
                <img src={`${base_url}/${images[0]}`} alt="Blog"className="admin-blog-image"/>
                 
                  
                
                <div className="admin-blog-content">
                  <h3>
                    {title}
                  </h3>
                  <div className="admin-blog-meta">
                    <span>
                      <i className="fas fa-user"></i> Nexture Education
                    </span>
                    <span>
                      <i className="fas fa-calendar"></i> January 15, 2024
                    </span>
                    <span className="admin-blog-status-badge admin-blog-status-published">
                      Published
                    </span>
                  </div>
                  <p className="admin-blog-excerpt">
                    {content.substring(0, 100)}...
                  </p>
                  <div className="admin-blog-tags">
                    {tags.map((tag) => 
                    (
                      
                      <span  className="admin-blog-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="admin-blog-actions">
                  <button
                    className="admin-blog-action-btn admin-blog-btn-view"
                    title="View Post"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="admin-blog-action-btn admin-blog-btn-edit"
                    title="Edit Post"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="admin-blog-action-btn admin-blog-btn-delete"
                    title="Delete Post"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}

          {/* repeat other blog-items with updated classnames */}
        </div>

        <div className="admin-blog-pagination">
          <button className="admin-blog-page-btn">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="admin-blog-page-btn active">1</button>
          <button className="admin-blog-page-btn">2</button>
          <button className="admin-blog-page-btn">3</button>
          <button className="admin-blog-page-btn">...</button>
          <button className="admin-blog-page-btn">8</button>
          <button className="admin-blog-page-btn">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminBlog;
