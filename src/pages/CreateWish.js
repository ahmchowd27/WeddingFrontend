import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishAPI, imageUtils, textUtils } from '../utils/api';
import '../styles/CreateWish.css';

const CreateWish = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear previous messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 2) {
      setError('You can only upload a maximum of 2 images');
      return;
    }

    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      const validation = imageUtils.validateImage(file);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
      
      validFiles.push(file);
      newPreviews.push({
        file,
        url: imageUtils.createPreviewURL(file)
      });
    }

    setImages(prev => [...prev, ...validFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setError('');
  };

  const removeImage = (index) => {
    // Revoke the preview URL to free memory
    imageUtils.revokePreviewURL(imagePreviews[index].url);
    
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!formData.message.trim()) {
      setError('Please enter a wedding wish message');
      return;
    }

    if (formData.name.length > 100) {
      setError('Name must be 100 characters or less');
      return;
    }

    if (formData.message.length > 1000) {
      setError('Message must be 1000 characters or less');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const wishData = {
        name: formData.name.trim(),
        message: formData.message.trim(),
        images: images
      };

      await wishAPI.createWish(wishData);
      
      setSuccess('🎉 Your beautiful wish has been shared successfully!');
      
      // Reset form
      setFormData({ name: '', message: '' });
      setImages([]);
      
      // Clean up image previews
      imagePreviews.forEach(preview => {
        imageUtils.revokePreviewURL(preview.url);
      });
      setImagePreviews([]);

      // Redirect to wishes page after a delay
      setTimeout(() => {
        navigate('/wishes');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.message.trim();

  return (
    <div className="page-container">
      <div className="create-wish-container fade-in">
        <div className="create-wish-header">
          <div className="bengali-greeting bengali-text">শুভ বিবাহ!</div>
          <div className="english-subtitle">Share Your Beautiful Wishes</div>
        </div>

        <form className="wish-form" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Your Name / আপনার নাম
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${textUtils.hasBengaliText(formData.name) ? 'bengali-text' : ''}`}
              placeholder="Enter your name / আপনার নাম লিখুন..."
              maxLength={100}
              disabled={isSubmitting}
            />
            <div className="character-count">
              {formData.name.length}/100
            </div>
          </div>

          {/* Message Input */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Wedding Wish / শুভেচ্ছা বার্তা
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-textarea ${textUtils.hasBengaliText(formData.message) ? 'bengali-text' : ''}`}
              placeholder="Write your beautiful wish here / আপনার শুভেচ্ছা লিখুন..."
              rows={4}
              maxLength={1000}
              disabled={isSubmitting}
            />
            <div className="character-count">
              {formData.message.length}/1000
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">
              📸 Add Wedding Photos (Max 2, 10MB each)
            </label>
            
            <div className="image-upload-section">
              <div className="image-upload-grid">
                {/* Existing Image Previews */}
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview.url} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {/* Upload Slots */}
                {images.length < 2 && (
                  <label className="image-upload-slot">
                    <input
                      type="file"
                      accept="image/*"
                      multiple={images.length === 0}
                      onChange={handleImageSelect}
                      disabled={isSubmitting}
                      style={{ display: 'none' }}
                    />
                    <div className="upload-content">
                      <div className="upload-icon">📷</div>
                      <div className="upload-text">Click to Add</div>
                      <div className="upload-bengali bengali-text">ছবি যোগ করুন</div>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error fade-in">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="success fade-in">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isFormValid ? 'active' : ''}`}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Sharing your wish...
              </>
            ) : (
              '✨ Submit Wish ✨'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWish;
