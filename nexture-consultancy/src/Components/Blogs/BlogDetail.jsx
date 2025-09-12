import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import base_url from '../../../config';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${base_url}/api/blogs/${id}`);
        setBlog(response.data);
        setError(null);
        
        // Fetch related blogs based on tags
        if (response.data.tags && response.data.tags.length > 0) {
          fetchRelatedBlogs(response.data.tags, response.data._id);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const fetchRelatedBlogs = async (tags, currentBlogId) => {
    try {
      const response = await axios.get(`${base_url}/api/blogs`);
      // Filter blogs that share at least one tag with current blog and exclude current blog
      const filtered = response.data
        .filter(blog => 
          blog._id !== currentBlogId && 
          blog.tags.some(tag => tags.includes(tag))
        )
        .slice(0, 3); // Limit to 3 related blogs
      
      setRelatedBlogs(filtered);
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="blog-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-error">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/blog" className="back-to-blogs-btn">Back to Blogs</Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-error">
        <h2>Blog Not Found</h2>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="back-to-blogs-btn">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-header">
        <div className="blog-detail-header-content">
          <Link to="/blog" className="back-link">
            <span className="back-arrow">←</span> Back to Blogs
          </Link>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <div className="blog-author-date">
              <span className="blog-author">
                <span className="author-icon">👤</span> Nexture Education
              </span>
              <span className="blog-date">
                <span className="date-icon">📅</span> {formatDate(blog.createdAt)}
              </span>
            </div>
            <div className="blog-tags">
              {blog.tags && blog.tags.map((tag, index) => (
                <span key={index} className="blog-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="blog-detail-content">
        <div className="blog-detail-main">
          {blog.images && blog.images.length > 0 && (
            <div className="blog-detail-image">
              <img src={`${base_url}/${blog.images[0]}`} alt={blog.title} />
            </div>
          )}
          
          <div className="blog-detail-text">
            {/* Split content by paragraphs and render each paragraph */}
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="blog-detail-share">
            <h3>Share this article</h3>
            <div className="share-buttons">
              <button className="share-button facebook">
                <span className="share-icon">📘</span> Facebook
              </button>
              <button className="share-button twitter">
                <span className="share-icon">🐦</span> Twitter
              </button>
              <button className="share-button linkedin">
                <span className="share-icon">💼</span> LinkedIn
              </button>
            </div>
          </div>
        </div>
        
        {relatedBlogs.length > 0 && (
          <div className="related-blogs">
            <h2>Related Articles</h2>
            <div className="related-blogs-grid">
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  to={`/blog/${relatedBlog._id}`} 
                  key={relatedBlog._id} 
                  className="related-blog-card"
                >
                  <div className="related-blog-image">
                    {relatedBlog.images && relatedBlog.images[0] ? (
                      <img src={`${base_url}/${relatedBlog.images[0]}`} alt={relatedBlog.title} />
                    ) : (
                      <div className="image-placeholder">
                        <span className="placeholder-icon">🖼️</span>
                      </div>
                    )}
                  </div>
                  <div className="related-blog-content">
                    <h3>{relatedBlog.title}</h3>
                    <p className="related-blog-date">{formatDate(relatedBlog.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
