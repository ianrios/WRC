import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Q from "./Q";
import Seo from "./Seo";
// import Navbar from './Navbar';
import Sidebar from "./Sidebar";
import Routes from "./Routes";
import TopLogo from "./TopLogo";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import "./App.scss";

function Wrapper() {
  const [viewMain, setViewMain] = useState(true);
  const { pathname } = useLocation();
  const pathArr = pathname.split("/");
  useEffect(() => {
    if (
      pathArr[1] === "live" ||
      pathArr[1] === "merch" ||
      pathArr[1] === "thanks" ||
      pathArr[1] === "artists" ||
      pathArr[1] === "products" ||
      pathArr[1] === "collections" ||
      pathArr[1] === "contact" ||
      pathArr[1] === "contests" ||
      pathArr[1] === "releases" ||
      pathArr[1] === "errors" ||
      pathArr[1] === "hard-reload" ||
      pathArr[1] === "nexus" ||
      pathArr[1] === "discord" ||
      pathArr[1] === "welcome" ||
      (pathArr.length > 2 &&
        (pathArr[1] === "artist" ||
          pathArr[1] === "collection" ||
          pathArr[1] === "contest" ||
          pathArr[1] === "product" ||
          pathArr[1] === "release"))
    ) {
      setViewMain(false);
    }
  }, [pathArr]);
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
    imgSrc: "meta.jpg",
    description: "WHY? Record Company Homepage",
    keywords:
      "why, record, company, music, edm, techno, idm, experimental, label",
  };

  // const [sidebarOpen, setSidebarOpen] = useState(false)
  // let sidebarStatus = sidebarOpen ? 'open' : 'closed';
  // const toggleSidebar = () => {
  // 	setSidebarOpen(prevSidebar => !prevSidebar)
  // }
  return (
    <div className="App">
      <Seo data={headData} />
      {viewMain ? (
        <div className="body-grid">
          <div
            className="main-image"
            style={{
              backgroundImage: `url("/images/textures/${
                Math.floor(Math.random() * 7) + 1
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
          {/* <Navbar /> */}
          <Sidebar />
          <div className="container">
            <TopLogo />
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
