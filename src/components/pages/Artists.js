import React from "react";
import { Link } from "react-router-dom";
import artistData from "../../constants/artistData.json";
import Seo from "../Seo";
import "./Artists.scss";

const filteredData = artistData.filter((item) => item.show_on_artist_page);

export default function Artists() {
  const headData = {
    title: "Artists",
    shortSiteTitle: "WRC",
    siteTitle: "WHY? Record Company",
    url: "/artists",
    imgSrc: "/meta.jpg",
    description: "Browse all artists on WHY? Record Company",
    keywords: "why, record, company, music, artists, edm, techno, idm, experimental",
  };

  const ArtistsGrid = filteredData.map((item, index) => {
    return (
      <div key={index} className="col-lg-4 col-md-6 col-sm-12 artist-grid-item">
        <Link to={`/artist/${item.local_path}`} className="text-on-image">
          <img className="img-fluid" src={item.photos[0]} alt={item.name} />
          <span className="centered-text">{item.name}</span>
        </Link>
      </div>
    );
  });

  return (
    <>
      <Seo data={headData} />
      <h1 className="header-sub-page">Artists</h1>
      <div className="container-fluid">
        <div className="row artist-grid">
          {ArtistsGrid}
        </div>
      </div>
    </>
  );
}
