import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  chooseIcon,
  // titleCase
} from "./Link";
import { isAdminAuthenticated } from "../utils/featureFlags";
import "./Link.scss";

function Sidebar() {
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
  const toggle = () => {
    setOpen(!open);
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
    return (
      <li
        key={idx}
        className={`
                list-group-item
                nav-link
                white-text
				${!Links[item][1] && "text-nav-icon"}
				${location.pathname.toLowerCase() === to && "nav-link-active"}
                `}
        onClick={() => navigate(to)}
      >
        <span className="nav-icon">
          {chooseIcon({
            iconHover: true,
            iconText: !Links[item][1] && Links[item][0],
            icon: Links[item][1] && item,
            to: `/${item}`.toLowerCase(),
            pathname: location.pathname,
          })}
        </span>
        <span className={`questrial h3`}>
          {item.toLowerCase()}
        </span>
      </li>
    );
  });
  return (
    <>
      <button
        onClick={toggle}
        className="sidebar-hamburger"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        )}
      </button>
      <nav
        className={`sidebar-overlay ${open ? "sidebar-overlay-open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            close();
          }
        }}
      >
        <ul className="sidebar-nav">{navItems}</ul>
      </nav>
    </>
  );
}

export default Sidebar;
