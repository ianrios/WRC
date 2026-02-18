import { Link } from "react-router-dom";
import releaseData from "../../constants/releaseData.json";
import setData from "../../constants/setData.json";
import recData from "../../constants/recData.json";
import { Seo } from "../Seo";
import { getFeatureFlag } from "../../utils/featureFlags";
import { CrateView } from "./CrateView";
import "./Releases.scss";

const sortedReleases = [...releaseData, ...setData, ...recData].sort((a, b) =>
  a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0
);

export function Releases() {
  const crateViewEnabled = getFeatureFlag("crateView");

  const headData = {
    title: "Releases - WRC",
    shortSiteTitle: "WRC",
    siteTitle: "WHY? Record Company",
    url: "/releases",
    imgSrc: "/meta.jpg",
    description: "Browse all releases on WHY? Record Company",
    keywords:
      "why, record, company, music, releases, albums, edm, techno, idm, experimental",
  };

  if (crateViewEnabled) {
    return (
      <>
        <Seo data={headData} />
        <CrateView releases={sortedReleases} />
      </>
    );
  }

  const ReleasesGrid = sortedReleases.map((item, index) => {
    const color =
      Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1))) +
      Math.ceil(1);

    return (
      <div
        key={index}
        className="col-lg-3 col-md-4 col-sm-6 col-12 release-grid-item"
      >
        <Link to={`/release/${item.local_path}`} className="text-on-image">
          <img
            className={`img-fluid release-image-color-${color}`}
            src={item.album_art}
            alt={item.name}
          />
          <span className="centered-text">{item.name}</span>
        </Link>
      </div>
    );
  });

  return (
    <>
      <Seo data={headData} />
      <h1 className="header-sub-page">Releases</h1>
      <div className="container-fluid">
        <div className="row release-grid">{ReleasesGrid}</div>
      </div>
    </>
  );
}
