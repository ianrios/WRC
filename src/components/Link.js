import React from "react";
import "./Link.scss";
import { Link, useLocation } from "react-router-dom";
import Dot from "./icons/Dot";
import Cube from "./icons/Cube";
import AtSign from "./icons/AtSign";
import Question from "./icons/Question";
import Star from "./icons/Star";
import Honeycomb from "./icons/Honeycomb";
import Blockchain from "./icons/Blockchain";
import Fingerprint from "./icons/Fingerprint";
import Multiply from "./icons/Multiply";
import Hamburger from "./icons/Hamburger";
import Play from "./icons/Play";
import Merch from "./icons/Merch";

export function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function chooseIcon({
  iconHover,
  iconText,
  icon,
  to,
  pathname,
  color = "",
}) {
  const lowTo = to.toLowerCase();
  const className = `nav-icon ${pathname === lowTo && "nav-icon-active"}`;
  if (iconHover && icon) {
    switch (icon) {
      case "Artists":
        return (
          <Fingerprint
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Releases":
        return (
          <Dot
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Collections":
        return (
          <Honeycomb
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Merch":
        return (
          <Merch
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );

      case "Products":
        return (
          <Cube
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Nexus":
        return (
          <Blockchain
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Contests":
        return (
          <Star
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Home":
        return (
          <Question
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Contact":
        return (
          <AtSign
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Menu":
        return (
          <Hamburger
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Close":
        return (
          <Multiply
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Live":
        return (
          <Play
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );

      default:
        console.error("couldn't find an icon for", icon);
        return null;
    }
  } else {
    return iconText;
  }
}

export default function LinkWrapper(props) {
  const text = titleCase(props.text);
  const { pathname } = useLocation();
  const lowTo = props.to.toLowerCase();
  return (
    <Link
      className="link-icon-navbar"
      id={props.id}
      style={{
        paddingTop: "20px",
        textDecoration: "none",
        fontSize: props.size,
      }}
      to={lowTo}
    >
      <span
        className={`nav-link 
				${props.isText && "text-nav-icon"} 
				${pathname === lowTo && "nav-link-active"}
				${props.qMark && "em2"}`}
      >
        {props.iconHover ? chooseIcon({ ...props, pathname }) : text}
      </span>
    </Link>
  );
}
