import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import CreateWish from './pages/CreateWish';
import WishFeed from './pages/WishFeed';
import PresentationView from './pages/PresentationView';
import './styles/App.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        
        <main className="main-content">
          <Routes>
            {/* Default route redirects to create wish */}
            <Route path="/" element={<Navigate to="/create" replace />} />
            
            {/* Create Wish Page */}
            <Route 
              path="/create" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <CreateWish />
                </motion.div>
              } 
            />
            
            {/* Wish Feed Page */}
            <Route 
              path="/wishes" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <WishFeed />
                </motion.div>
              } 
            />
            
            {/* Presentation View for displaying wishes */}
            <Route 
              path="/wishes/view" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PresentationView />
                </motion.div>
              } 
            />
          </Routes>
        </main>
        
        {/* Beautiful background elements */}
        <div className="bg-elements">
          <div className="bg-mandala bg-mandala-1"></div>
          <div className="bg-mandala bg-mandala-2"></div>
          <div className="bg-flowers">
            <div className="flower flower-1">🌸</div>
            <div className="flower flower-2">🌺</div>
            <div className="flower flower-3">🌼</div>
            <div className="flower flower-4">🌻</div>
            <div className="flower flower-5">🌷</div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
