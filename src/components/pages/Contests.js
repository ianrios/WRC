import { Link } from "react-router-dom";
import { Seo } from "../Seo";
import contestData from "../../constants/contestData.json";
import "./Contests.scss";

export function Contests() {
  const headData = {
    title: "Contests - WRC",
    siteTitle: "WHY? Record Company",
    url: "/contests",
    imgSrc: "/images/WRC.jpg",
    description:
      "Music production contests and remix competitions on WHY? Record Company",
    keywords:
      "why, record, company, music, contests, competition, remix, edm, techno, idm",
  };

  const ContestsGrid = contestData.map((item, index) => {
    return (
      <div
        key={index}
        className="col-lg-4 col-md-6 col-sm-12 contest-grid-item"
      >
        <Link to={`/contest/${item.local_path}`} className="text-on-image">
          <img className="img-fluid" src={item.album_art} alt={item.name} />
          <span className="centered-text">{item.name}</span>
        </Link>
      </div>
    );
  });
  return (
    <>
      <Seo data={headData} />
      <h1 className="header-sub-page">Contests</h1>
      <div className="container-fluid">
        <div className="row contest-grid">{ContestsGrid}</div>
      </div>
    </>
  );
}
