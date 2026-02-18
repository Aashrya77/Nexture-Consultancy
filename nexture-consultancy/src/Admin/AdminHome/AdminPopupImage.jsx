import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../../../config";

const AdminPopupImage = () => {
  const [popupImage, setPopupImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPopupImage();
  }, []);

  const fetchPopupImage = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${base_url}/api/popup-image`);
      if (res.data.success && res.data.data) {
        setPopupImage(res.data.data.imageUrl);
      } else {
        setPopupImage(null);
      }
    } catch (err) {
      setPopupImage(null);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setSuccess("");
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      await axios.post(`${base_url}/api/popup-image/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Popup image uploaded successfully!");
      setSelectedFile(null);
      setPreview(null);
      fetchPopupImage();
    } catch (err) {
      setError("Failed to upload image. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-popup-image-section redesigned-popup-image-admin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '60vh', background: '#f4f6fb' }}>
      <div className="popup-card" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 6px 32px 0 rgba(80, 86, 170, 0.10)', padding: '2.5rem 2rem', maxWidth: 520, width: '100%', marginTop: 40 }}>
        <h2 className="popup-title" style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: 6, color: '#312e81', letterSpacing: -1 }}>Popup Image Controller</h2>
        <div style={{ width: 60, height: 4, background: '#a78bfa', borderRadius: 2, margin: '0 0 24px 0' }} />
        <p className="popup-desc" style={{ color: '#555', fontSize: 16, marginBottom: 28 }}>Upload or update the image that will be shown as a popup to visitors on their first visit.<br /> <span style={{ color: '#8b5cf6' }}>Recommended size: 600x400px (JPG/PNG).</span></p>
        <form className="popup-form" onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 18 }}>
          <label className="popup-label" style={{ fontWeight: 600, color: '#3730a3', fontSize: 15 }}>Select Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="popup-file-input"
              style={{ display: 'block', marginTop: 8 }}
            />
          </label>
          {preview && (
            <div className="popup-image-preview" style={{ margin: '10px 0', textAlign: 'center' }}>
              <img src={preview} alt="Preview" className="popup-preview-img" style={{ maxWidth: 320, maxHeight: 180, borderRadius: 8, boxShadow: '0 2px 16px 0 rgba(139,92,246,0.07)' }} />
            </div>
          )}
          <button type="submit" className="popup-upload-btn" disabled={loading || !selectedFile} style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 700, fontSize: 16, cursor: loading || !selectedFile ? 'not-allowed' : 'pointer', boxShadow: '0 1px 8px 0 rgba(139,92,246,0.08)', transition: 'background 0.2s' }}>
            {loading ? <span style={{ opacity: 0.7 }}>Uploading...</span> : 'Upload Image'}
          </button>
        </form>
        {success && <div className="popup-success-msg" style={{ color: '#16a34a', fontWeight: 600, marginBottom: 10 }}>{success}</div>}
        {error && <div className="popup-error-msg" style={{ color: '#dc2626', fontWeight: 600, marginBottom: 10 }}>{error}</div>}
        <hr style={{ border: 0, borderTop: '1.5px solid #e5e7eb', margin: '28px 0 18px 0' }} />
        <div className="popup-current-section">
          <h4 style={{ fontSize: 19, fontWeight: 700, color: '#3730a3', marginBottom: 12 }}>Current Popup Image</h4>
          <div style={{ textAlign: 'center' }}>
            {popupImage ? (
              <img src={`${base_url}/${popupImage}`} alt="Popup" className="popup-current-img" style={{ maxWidth: 420, maxHeight: 260, borderRadius: 10, boxShadow: '0 1px 8px 0 rgba(139,92,246,0.09)' }} />
            ) : (
              <span className="popup-no-img" style={{ color: '#78716c', fontStyle: 'italic' }}>No popup image set.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPopupImage;
