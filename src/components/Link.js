import "./Link.scss";
import { Dot } from "./icons/Dot";
import { Cube } from "./icons/Cube";
import { AtSign } from "./icons/AtSign";
import { Question } from "./icons/Question";
import { Star } from "./icons/Star";
import { Honeycomb } from "./icons/Honeycomb";
import { Blockchain } from "./icons/Blockchain";
import { Fingerprint } from "./icons/Fingerprint";
import { Multiply } from "./icons/Multiply";
import { Hamburger } from "./icons/Hamburger";
import { Play } from "./icons/Play";
import { Merch } from "./icons/Merch";
import { Gear } from "./icons/Gear";
import { Home } from "./icons/Home";

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
          <Home
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
      case "Admin":
        return (
          <Gear
            className={className}
            height={"35px"}
            width={"35px"}
            fillColor={color}
          />
        );
      case "Information":
      case "Info":
        return (
          <Question
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
