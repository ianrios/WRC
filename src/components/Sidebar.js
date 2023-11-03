import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  chooseIcon,
  // titleCase
} from "./Link";
import "./Link.scss";

function Sidebar() {
  const location = useLocation();
  const history = useHistory();

  const Links = {
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
  };
  const linkKeys = Object.keys(Links);

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const navigate = (to) => {
    if (location.pathname !== to) {
      history.push(to);
      toggle();
    }
  };
  const navItems = linkKeys.map((item, idx) => {
    const to = `/${item}`.toLowerCase();
    console.log({ item });
    return (
      <li
        key={idx}
        className={`
                list-group-item
                nav-link 
                white-text
                text-left
				${!Links[item][1] && "text-nav-icon"} 
				${location.pathname.toLowerCase() === to && "nav-link-active"}
                `}
        style={{ color: "white", opacity: 1, backgroundColor: "black" }}
        onClick={() => navigate(to)}
      >
        <span
          style={{
            width: "150px",
            paddingLeft: idx === 0 ? "10px" : "",
            marginRight: idx !== 0 ? "10px" : "",
          }}
        >
          {chooseIcon({
            iconHover: true,
            iconText: !Links[item][1] && Links[item][0],
            icon: Links[item][1] && item,
            to: `/${item}`.toLowerCase(),
            pathname: location.pathname,
          })}
        </span>
        <span
          className={`questrial h3 ${
            location.pathname.toLowerCase() === `/${item}`.toLowerCase() &&
            "nav-link-active"
          }`}
        >
          {item.toLowerCase()}
        </span>
      </li>
    );
  });
  return (
    <ul
      className="list-group fixed-top"
      style={{
        width: open ? "225px" : "70px",
        height: open && "100vh",
        backgroundColor: open && "black",
      }}
    >
      <li
        onClick={toggle}
        style={{
          color: "white",
          opacity: 1,
          backgroundColor: "transparent",
          border: "2px solid black",
          borderRadius: "4px",
          height: "60px",
          width: "76px",
          paddingTop: "8px",
        }}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
      </li>
      {open && navItems}
    </ul>
  );
}

export default Sidebar;
