import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishAPI, timeUtils, textUtils } from '../utils/api';
import '../styles/WishFeed.css';

const WishFeed = () => {
  const navigate = useNavigate();
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      setLoading(true);
      const fetchedWishes = await wishAPI.getAllWishes();
      setWishes(fetchedWishes);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePresentationMode = () => {
    navigate('/wishes/view');
  };

  const handleImageClick = (imageData, wishId, imageIndex) => {
    setExpandedImage({
      src: imageData,
      wishId,
      imageIndex
    });
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading beautiful wishes</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error">{error}</div>
          <button onClick={fetchWishes} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="wish-feed-container fade-in">
        {/* Header */}
        <div className="feed-header">
          <h2 className="feed-title">
            <span className="title-icon">🌸</span>
            All Wedding Wishes
            <span className="title-icon">🌸</span>
          </h2>
          
          {wishes.length > 0 && (
            <button 
              className="presentation-btn"
              onClick={handlePresentationMode}
            >
              <span className="btn-icon">🎞️</span>
              Presentation Mode
            </button>
          )}
        </div>

        {/* Wishes Feed */}
        {wishes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💝</div>
            <div className="empty-title">No wishes yet</div>
            <div className="empty-message">
              Be the first to share a beautiful wedding wish!
            </div>
            <button 
              className="create-first-wish-btn"
              onClick={() => navigate('/create')}
            >
              ✨ Create First Wish
            </button>
          </div>
        ) : (
          <div className="wishes-list">
            {wishes.map((wish, index) => (
              <div 
                key={wish._id} 
                className="wish-card slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Wish Header */}
                <div className="wish-header">
                  <div className="wish-avatar">👤</div>
                  <div className="wish-meta">
                    <div className={`wish-name ${textUtils.hasBengaliText(wish.name) ? 'bengali-text' : ''}`}>
                      {wish.name}
                    </div>
                    <div className="wish-time">
                      {timeUtils.formatRelativeTime(wish.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Wish Message */}
                <div className={`wish-message ${textUtils.hasBengaliText(wish.message) ? 'bengali-text' : ''}`}>
                  {wish.message}
                </div>

                {/* Wish Images */}
                {wish.images && wish.images.length > 0 && (
                  <div className="wish-images">
                    <div className={`images-grid ${wish.images.length === 1 ? 'single-image' : 'multiple-images'}`}>
                      {wish.images.map((image, imageIndex) => (
                        <div 
                          key={imageIndex}
                          className="wish-image-container"
                          onClick={() => handleImageClick(image.data, wish._id, imageIndex)}
                        >
                          <img 
                            src={image.data} 
                            alt={`Wedding ${imageIndex + 1}`}
                            className="wish-image"
                            loading="lazy"
                          />
                          <div className="image-overlay">
                            <span className="expand-icon">🔍</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {expandedImage && (
          <div className="image-modal fade-in" onClick={closeExpandedImage}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={closeExpandedImage}>
                ×
              </button>
              <img 
                src={expandedImage.src} 
                alt="Expanded wedding"
                className="expanded-image"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishFeed;
