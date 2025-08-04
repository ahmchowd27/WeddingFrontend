import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/create' && (location.pathname === '/' || location.pathname === '/create')) {
      return true;
    }
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Don't show navigation in presentation mode
  if (location.pathname === '/wishes/view') {
    return null;
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">WeddingWishCraft</h1>
          <div className="bengali-subtitle bengali-text">শুভ বিবাহ</div>
          <div className="english-subtitle">Bengali Wedding Wishes</div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <div className="nav-container">
          <button
            className={`nav-tab ${isActive('/create') ? 'active' : ''}`}
            onClick={() => handleNavigation('/create')}
          >
            <span className="nav-tab-icon">✏️</span>
            <span className="nav-tab-text">Create Wish</span>
          </button>
          <button
            className={`nav-tab ${isActive('/wishes') ? 'active' : ''}`}
            onClick={() => handleNavigation('/wishes')}
          >
            <span className="nav-tab-icon">📜</span>
            <span className="nav-tab-text">View Wishes</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
