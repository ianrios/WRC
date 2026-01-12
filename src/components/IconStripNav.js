import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { chooseIcon } from "./Link";
import { isAdminAuthenticated } from "../utils/featureFlags";
import "./IconStripNav.scss";

function IconStripNav() {
  const location = useLocation();
  const history = useHistory();

const baseLinks = {
    Home: ["Question", true],
    Artists: ["Fingerprint", true],
    Releases: ["Dot", true],
    Collections: ["Honeycomb", true],
    Contests: ["Star", true],
    Merch: ["Merch", true],
    Products: ["Cube", true],
    Live: ["Live", true],
    Nexus: ["Blockchain", true],
    Contact: ["AtSign", true],
    Information: ["Info", true],
  };

  const Links = isAdminAuthenticated()
    ? { ...baseLinks, Admin: ["Gear", true] }
    : baseLinks;
  const linkKeys = Object.keys(Links);

  const [open, setOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("wrc-nav-visited");
    if (!hasVisited) {
      setShowPulse(true);
      localStorage.setItem("wrc-nav-visited", "true");
      // Stop pulsing after 5 seconds
      setTimeout(() => setShowPulse(false), 5000);
    }
  }, []);

  const toggle = () => {
    setOpen(!open);
    setShowPulse(false);
  };

  const close = () => {
    setOpen(false);
  };

  const navigate = (to) => {
    if (location.pathname !== to) {
      history.push(to);
      close();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const navItems = linkKeys.map((item, idx) => {
    const to = `/${item}`.toLowerCase();
    const isActive = location.pathname === to;

    return (
      <li
        key={idx}
        className={`icon-strip-item ${isActive ? "active" : ""} ${
          hoveredIcon === item ? "hovered" : ""
        }`}
        onMouseEnter={() => setHoveredIcon(item)}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={() => navigate(to)}
      >
        <div className="icon-container">
          {chooseIcon({
            iconHover: true,
            icon: item,
            to: to,
            pathname: location.pathname,
          })}
        </div>
        <span className="icon-label">{item}</span>
      </li>
    );
  });

  return (
    <>
      <button
        className={`icon-strip-trigger ${open ? "open" : ""} ${
          showPulse ? "pulse" : ""
        }`}
        onClick={toggle}
        aria-label="Navigation Menu"
      >
        <div className="icon-strip-preview">
          {linkKeys.slice(0, 3).map((item, idx) => {
            const to = `/${item}`.toLowerCase();
            return (
              <div key={idx} className="preview-icon">
                {chooseIcon({
                  iconHover: true,
                  icon: item,
                  to: to,
                  pathname: location.pathname,
                })}
              </div>
            );
          })}
        </div>
      </button>

      <nav
        className={`icon-strip-overlay ${open ? "icon-strip-overlay-open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            close();
          }
        }}
      >
        <div className="icon-strip-container">
          <ul className="icon-strip-nav">{navItems}</ul>
        </div>
      </nav>
    </>
  );
}

export default IconStripNav;
