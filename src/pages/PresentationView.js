import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishAPI, textUtils } from '../utils/api';
import '../styles/PresentationView.css';

const PresentationView = () => {
  const navigate = useNavigate();
  const [wishes, setWishes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(100);

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

  const goToNext = useCallback(() => {
    if (wishes.length > 0) {
      setCurrentSlide(prev => (prev + 1) % wishes.length);
      setProgress(100);
    }
  }, [wishes.length]);

  const goToPrevious = useCallback(() => {
    if (wishes.length > 0) {
      setCurrentSlide(prev => (prev - 1 + wishes.length) % wishes.length);
      setProgress(100);
    }
  }, [wishes.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setProgress(100);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleExit = useCallback(() => {
    navigate('/wishes');
  }, [navigate]);

  useEffect(() => {
    fetchWishes();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && wishes.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % wishes.length);
        setProgress(100); // Reset progress when slide changes
      }, 60000); // 60 seconds per slide
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, wishes.length, currentSlide]);

  // Progress bar animation
  useEffect(() => {
    let progressInterval;
    if (isPlaying && wishes.length > 0) {
      setProgress(100);
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            return 100;
          }
          return prev - (100 / 600); // 600 updates over 60 seconds
        });
      }, 100); // Update every 100ms
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isPlaying, currentSlide, wishes.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'Escape':
          e.preventDefault();
          handleExit();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious, togglePlayPause, handleExit]);

  if (loading) {
    return (
      <div className="presentation-loading">
        <div className="loading-content">
          <div className="loading-spinner-large"></div>
          <div className="loading-text">Preparing presentation...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="presentation-error">
        <div className="error-content">
          <div className="error-icon">❌</div>
          <div className="error-title">Failed to load wishes</div>
          <div className="error-message">{error}</div>
          <div className="error-actions">
            <button onClick={fetchWishes} className="retry-presentation-btn">
              Try Again
            </button>
            <button onClick={handleExit} className="exit-presentation-btn">
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <div className="presentation-empty">
        <div className="empty-content">
          <div className="empty-icon">💝</div>
          <div className="empty-title">No wishes to display</div>
          <div className="empty-message">
            Create some beautiful wishes first!
          </div>
          <button onClick={handleExit} className="exit-presentation-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentWish = wishes[currentSlide];

  return (
    <div className="presentation-container">
      {/* Exit Button */}
      <button className="exit-btn" onClick={handleExit} title="Exit (ESC)">
        ×
      </button>

      {/* Controls */}
      <div className="presentation-controls">
        <button 
          className="control-btn" 
          onClick={goToPrevious}
          title="Previous (←)"
          disabled={wishes.length <= 1}
        >
          ‹
        </button>
        
        <button 
          className="control-btn play-pause-btn" 
          onClick={togglePlayPause}
          title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <button 
          className="control-btn" 
          onClick={goToNext}
          title="Next (→)"
          disabled={wishes.length <= 1}
        >
          ›
        </button>
      </div>

      {/* Main Slide */}
      <div className="slide-container">
        <div key={currentSlide} className="wish-slide fade-in">
          {/* Wish Avatar */}
          <div className="slide-avatar">👤</div>

          {/* Wish Name */}
          <div className={`slide-name ${textUtils.hasBengaliText(currentWish.name) ? 'bengali-text' : ''}`}>
            {currentWish.name}
          </div>

          {/* Wish Message */}
          <div className={`slide-message ${textUtils.hasBengaliText(currentWish.message) ? 'bengali-text' : ''}`}>
            {currentWish.message}
          </div>

          {/* Wish Images */}
          {currentWish.images && currentWish.images.length > 0 && (
            <div className="slide-images">
              <div className={`slide-images-grid ${currentWish.images.length === 1 ? 'single' : 'multiple'}`}>
                {currentWish.images.map((image, index) => (
                  <div key={index} className="slide-image-container">
                    <img 
                      src={image.data} 
                      alt={`Wedding ${index + 1}`}
                      className="slide-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="progress-indicators">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Slide Dots */}
        <div className="slide-dots">
          {wishes.map((_, index) => (
            <button
              key={index}
              className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="slide-counter">
          {currentSlide + 1} / {wishes.length}
        </div>
      </div>

      {/* Instructions */}
      <div className="presentation-instructions">
        <div className="instruction-item">← → Navigate</div>
        <div className="instruction-item">Space Play/Pause</div>
        <div className="instruction-item">ESC Exit</div>
      </div>
    </div>
  );
};

export default PresentationView;
