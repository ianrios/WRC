import React from "react";
import { Link } from "react-router-dom";
import releaseData from "../../constants/releaseData.json";
import independentReleaseData from "../../constants/independentReleaseData.json";
import recData from "../../constants/recData.json";
import setData from "../../constants/setData.json";
import playlistData from "../../constants/playlistData.json";
// import futureReleases from "../../constants/futureReleases.json";
import collectionData from "../../constants/collectionData.json";
import contestData from "../../constants/contestData.json";
import "./Collections.scss";

export default function Collections() {
  let allData = [
    ...releaseData,
    ...independentReleaseData,
    ...recData,
    ...setData,
    ...playlistData,
    ...contestData,
    // futureReleases[0]
  ];
  let releaseTypes = {};

  allData.map((i) =>
    !(i.release_type in releaseTypes)
      ? (releaseTypes[i.release_type] = i)
      : null
  );
  Object.keys(releaseTypes).map(
    (i) =>
    (releaseTypes[i]["collection"] = collectionData.find(
      (j) => j.short_title === i
    ))
  );
  const mappedReleaseTypes = Object.keys(releaseTypes)
    .sort((a, b) => {
      if (a === "WRC") return -1;
      if (a === "Independent") return 1;
      if (b === "Independent") return -1;
      return a < b;
    })
    .map((i, index) => {
      return (
        <div
          className="col-lg-4 col-md-6 col-sm-12 collection-grid-item"
          key={i}
        >
          <Link
            to={`/collection/${releaseTypes[i].collection.local_path}`}
            className="text-on-image"
          >
            <img
              alt={releaseTypes[i].name}
              src={releaseTypes[i].album_art}
              className="img-fluid"
            />
            <span className="centered-text">{i}</span>
          </Link>
        </div>
      );
    });
  return (
    <>
      <h1 className="header-sub-page">Collections</h1>
      <div className="container-fluid">
        <div className="row collection-grid">
          {mappedReleaseTypes}
        </div>
      </div>
    </>
  );
}
