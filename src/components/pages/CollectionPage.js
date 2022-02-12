import React from 'react'
import { useParams, Link } from 'react-router-dom';
import Seo from "../Seo"
import releaseData from "../../constants/releaseData.json";
import independentReleaseData from "../../constants/independentReleaseData.json";
import recData from "../../constants/recData.json";
import mixData from "../../constants/mixData.json";
import playlistData from "../../constants/playlistData.json";
import contestData from "../../constants/contestData.json";
import collectionData from "../../constants/collectionData.json";
import { mappedPTag } from '../../utilities/maps';

export default function CollectionPage() {
  const { name } = useParams();
  const currCollection = collectionData.find(i => i.local_path.toLowerCase() === name.toLowerCase());
  const foundCollection = currCollection !== undefined;

  let allData = [
    ...releaseData,
    ...independentReleaseData,
    ...recData,
    ...mixData,
    ...playlistData,
    ...contestData
  ]

  const filteredData = allData.filter(a => a.release_type === currCollection.short_title);

  const newestRelease = filteredData[0]

  const headData = foundCollection && newestRelease ? {
    title: currCollection.title + " - WRC",
    shortSiteTitle: `${currCollection.title} Release Page - WRC`,
    siteTitle: "WHY? Record Company",
    url: name,
    imgSrc: newestRelease.album_art,
    description: currCollection.paragraphs.length > 0 ? currCollection.paragraphs[0] : null,
    keywords: "why, record, company, music, edm, techno, idm, experimental, label, release, " + currCollection.title
  } : {
      title: "Collection Page - WRC",
      shortSiteTitle: `Collection page not found - WRC`,
      siteTitle: "WHY? Record Company",
      url: name,
      imgSrc: "error.jpg",
      description: "",
      keywords: "why, record, company, page not found"
    }

  const mappedImgCol = (props) => {

    return props.map((c, i) => {
      return (
        <div className="col-4 col-md-3 text-center artist-page-album-art-container" key={i} >
          <Link to={`/release/${c.local_path}`} className="artist-page-album-art-link">
            <img alt={c.name} src={c.album_art} className="img-fluid artist-page-album-art" />
            <span className="artist-page-album-art-text colored-link white-text">
              {c.label_number}
            </span>
          </Link>
        </div>
      )
    })
  }

  return (
    <>
      <div className="row main-header">
        <div className="col">
          <h1 className="header-sub-page">
            {foundCollection
              ? currCollection.title :
              <>
                <p>could not locate collection page</p>
                <p>visit our<Link to="/errors">errors page</Link> for more information, or go back to the<Link to={"/collections"}> Main Collections Page</Link></p>
              </>
            }
          </h1>
        </div>
      </div>
      {
        foundCollection &&
        <>
          <Seo data={headData} />
          <div className="row">
            <div className="col-10 offset-1">
              <div className="row">
                <div className="col text-center">
                  {mappedPTag(currCollection.paragraphs)}
                </div>
              </div>
              <div className="row artist-page-releases">
                {mappedImgCol(filteredData)}
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}
