import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllFeatureFlags,
  setFeatureFlag,
  FEATURE_FLAG_DESCRIPTIONS,
} from "../../utils/featureFlags";
import "./Admin.scss";

// TODO: actually use a hashed string here so that i dont commit the password to the repo
const ADMIN_PASSWORD_HASH = "wrc2026admin";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [flags, setFlags] = useState({});

  useEffect(() => {
    const authToken = sessionStorage.getItem("admin_auth");
    if (authToken === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      loadFlags();
    }
  }, []);

  const loadFlags = () => {
    setFlags(getAllFeatureFlags());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD_HASH) {
      sessionStorage.setItem("admin_auth", ADMIN_PASSWORD_HASH);
      setIsAuthenticated(true);
      setError("");
      loadFlags();
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleToggleFlag = (flagName) => {
    const newValue = !flags[flagName];
    setFeatureFlag(flagName, newValue);
    setFlags({
      ...flags,
      [flagName]: newValue,
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <h1>Admin Access</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="admin-input"
              autoFocus
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="admin-logout">
          Logout
        </button>
      </div>

      <div className="admin-section">
        <h2>Feature Flags</h2>
        <p className="admin-description">
          Toggle features on/off for testing. Changes persist in your browser.
        </p>
        <div className="admin-flags">
          {Object.keys(flags).map((flagName) => (
            <div key={flagName} className="admin-flag-item">
              <div className="admin-flag-info">
                <h3>{FEATURE_FLAG_DESCRIPTIONS[flagName]}</h3>
                <code>{flagName}</code>
              </div>
              <button
                className={`admin-toggle ${flags[flagName] ? "active" : ""}`}
                onClick={() => handleToggleFlag(flagName)}
              >
                <span className="toggle-slider"></span>
                <span className="toggle-label">
                  {flags[flagName] ? "ON" : "OFF"}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h2>Tools</h2>
        <div className="admin-links">
          <Link to="/experiments" className="admin-link">
            Experiments Page
          </Link>
        </div>
      </div>
    </div>
  );
}
