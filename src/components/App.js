import { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Q from "./Q";
import Seo from "./Seo";
import ForceNav from "./ForceNav";
import Routes from "./Routes";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import "./App.scss";

function Wrapper() {
  const [viewMain, setViewMain] = useState(true);
  const { pathname } = useLocation();
  const pathArr = pathname.split("/");

  useEffect(() => {
    const bypassPaths = [
      "live", "merch", "thanks", "artists", "products", "collections",
      "contact", "contests", "releases", "errors", "hard-reload", "nexus",
      "discord", "welcome", "experiments", "admin", "information",
      "cookie-policy", "coming-soon", "services", "software"
    ];
    const nestedPaths = ["artist", "releases", "collection", "contest", "product", "release"];

    const isNestedRoute = pathArr.length > 2 && nestedPaths.includes(pathArr[1]);
    if (bypassPaths.includes(pathArr[1]) || isNestedRoute) {
      setViewMain(false);
    }
  }, [pathArr]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && viewMain) {
        setViewMain(false);
      }
    };

    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  }, [viewMain]);
  const siteTitle = "WHY? Record Company";
  const appTitle = siteTitle
    .split("")
    .map((i, k) =>
      i === "?" ? <Q s={2} key={k} /> : <span key={k}>{i}</span>
    );
  const headData = {
    title: "Home",
    shortSiteTitle: "WRC",
    siteTitle,
    url: pathname,
    imgSrc: "/meta.jpg",
    description: "WHY? Record Company Homepage",
    keywords:
      "why, record, company, music, edm, techno, idm, experimental, label",
  };

  return (
    <div className="App">
      {pathname === "/" && <Seo data={headData} />}
      {viewMain ? (
        <div className="body-grid">
          <div
            className="main-image"
            style={{
              backgroundImage: `url("/images/textures/${Math.floor(Math.random() * 7) + 1
                }.jpg")`,
            }}
            onClick={() => setViewMain(!viewMain)}
          >
            <div className="image-overlay-text app-title">{appTitle}</div>
          </div>
          <div className="enter-text">
            <span
              className="questrial colored-link white-text"
              onClick={() => setViewMain(!viewMain)}
            >
              enter
            </span>
          </div>
        </div>
      ) : (
        <div className="body-main">
          <ForceNav />
          <div className="container">
            <Routes />
            <Footer viewMain={viewMain} setViewMain={setViewMain} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Wrapper />
    </BrowserRouter>
  );
}
