import React from "react";
import '../assets/HomePage.css';
import {Link, Routes, Route, Navigate} from 'react-router-dom';
import AlertsSummary from "./AlertsSummary";
import LiveVideoFeed from "./LiveVideoFeed";
import InteractiveMap from "./InteractiveMap";
import Settings from "./Settings";
import Support from "./Support";
import Dashboard from "./Dashboard";
import { useAuth } from '../hooks/AuthProvider';

function HomePage () {
  const auth = useAuth(); // Set's up the authenticator function
  const handleLogout = async (e) => {
    e.preventDefault();
    await auth.logOut();
    console.log("User logged out, redirecting to login page...");
  };

  return (
    <div className="homepage-container">
      <aside className="sidebar">
        <div className="sidebar-top">
        <div className="sidebar-logo">
          <i className="fas fa-drone fa-2x"></i>
          <span className="brand">AetherScan</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/homepage/dashboard">
                <i className="fas fa-home"></i> 
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/homepage/alerts-summary">
                <i className="fas fa-exclamation-circle"></i>
                <span>Alerts Summary</span>
              </Link>
            </li>
            <li>
              <Link to="/homepage/live-video-feed">
                <i className="fas fa-video"></i>
                <span>Live Video Feed</span>
              </Link>
            </li>
            <li>
              <Link to="/homepage/interactive-map">
                <i className="fas fa-map-marked-alt"></i>
                <span>Interactive Map</span>
              </Link>
            </li>
          </ul>
        </nav>
        </div>

        <div className="sidebar-footer">
          <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/homepage/support">
                <i className="fas fa-life-ring"></i>
                <span>Support</span>
              </Link>
            </li>
            <li>
              <Link to="/homepage/settings">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
          </nav>
        </div>

        <div className="sidebar-footer">
          <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/login" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Log out</span>
              </Link>
            </li>
          </ul>
          </nav>
        </div>
      </aside>

      <div className="main-content">

        <div className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="alerts-summary" element={<AlertsSummary />} />
            <Route path="live-video-feed" element={<LiveVideoFeed />} />
            <Route path="interactive-map" element={<InteractiveMap />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
