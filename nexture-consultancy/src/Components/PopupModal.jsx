import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../../config";
import "./PopupModal.css";

const PopupModal = () => {
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Use the same asset URL logic as blogs
  const getAssetUrl = (assetPath) => {
    if (!assetPath || typeof assetPath !== 'string') return '';
    if (/^https?:\/\//i.test(assetPath)) return assetPath;
    const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
    return `${base_url}${normalized}`;
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopupImage();
  }, []);

  const fetchPopupImage = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/api/popup-image`);
      if (res.data.success && res.data.data && res.data.data.imageUrl) {
        // Use getAssetUrl for consistent image pathing
        setImageUrl(getAssetUrl(res.data.data.imageUrl));
        setShow(true);
      }
    } catch (err) {
      // No popup image or error
    }
    setLoading(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  if (!show || loading) return null;

  return (
    <div className="popup-modal-overlay">
      <div className="popup-modal-content">
        <button className="popup-modal-close" onClick={handleClose} aria-label="Close popup">&times;</button>
        {imageUrl && (
          <img src={imageUrl} alt="Popup" className="popup-modal-image" />
        )}
      </div>
    </div>
  );
};

export default PopupModal;
