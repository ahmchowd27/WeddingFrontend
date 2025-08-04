import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api',
  timeout: 30000, 
});

export const wishAPI = {
  getAllWishes: async () => {
    try {
      const response = await api.get('/wishes');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 
        'Failed to fetch wishes. Please try again.'
      );
    }
  },

  createWish: async (wishData) => {
    try {
      const formData = new FormData();
      formData.append('name', wishData.name);
      formData.append('message', wishData.message);
      
  
      if (wishData.images && wishData.images.length > 0) {
        wishData.images.forEach((image, index) => {
          formData.append('images', image);
        });
      }

      const response = await api.post('/wishes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 
        'Failed to create wish. Please try again.'
      );
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Server is not responding');
    }
  }
};

// Utility functions for image handling
export const imageUtils = {
  // Validate image file
  validateImage: (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image size must be less than 10MB'
      };
    }

    return { valid: true };
  },

  // Create image preview URL
  createPreviewURL: (file) => {
    return URL.createObjectURL(file);
  },

  // Clean up preview URL
  revokePreviewURL: (url) => {
    URL.revokeObjectURL(url);
  }
};

// Format time utilities
export const timeUtils = {
  // Format timestamp to relative time
  formatRelativeTime: (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};

// Text utilities
export const textUtils = {
  // Check if text contains Bengali characters
  hasBengaliText: (text) => {
    const bengaliRegex = /[\u0980-\u09FF]/;
    return bengaliRegex.test(text);
  },

  // Truncate text with ellipsis
  truncateText: (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
};

export default api;
