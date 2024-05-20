import React from 'react'
import { useParams, Link, Redirect } from 'react-router-dom';
import Seo from "../Seo"
import releaseData from "../../constants/releaseData.json";
import independentReleaseData from "../../constants/independentReleaseData.json";
import recData from "../../constants/recData.json";
import setData from "../../constants/setData.json";
import playlistData from "../../constants/playlistData.json";
import artistData from "../../constants/artistData.json";
import "./ReleasePage.scss"
import { mappedPTag, mappedLinks } from '../../utilities/maps'

export default function ReleasePage() {

  const { name } = useParams();

  const currRelease = [...releaseData, ...setData, ...playlistData, ...recData, ...independentReleaseData].find(i => i.local_path.toLowerCase() === name.toLowerCase());
  const foundRelease = currRelease === undefined ? false : true;
  if (!foundRelease) {
    if (name.includes("WHYCOMP")) {
      return (
        <Redirect to={`/contest/${name}`} />
      )
    }
  }

  const headData = foundRelease ? {
    title: currRelease.name + " - WRC",
    shortSiteTitle: `${currRelease.name} Release Page - WRC`,
    siteTitle: "WHY? Record Company",
    url: name,
    imgSrc: currRelease.album_art,
    description: currRelease.release_bio.length > 0 ? currRelease.release_bio[0] : "",
    keywords: "why, record, company, music, edm, techno, idm, experimental, label, release, " + currRelease.name
  } : {
    title: "Error Page not found - WRC",
    shortSiteTitle: `Collection page not found - WRC`,
    siteTitle: "WHY? Record Company",
    url: name,
    imgSrc: "error.jpg",
    description: "",
    keywords: "why, record, company, page not found"
  }

  // TODO: add a next release / previous release button
  return (
    <>
      <div className="row main-header">
        <div className="col">
          <h1 className="header-sub-page">
            {
              foundRelease ? currRelease.name :
                <>
                  <p>could not locate release page</p>
                  <p>visit our <Link to="/errors">error page</Link> for more information, or go back to the<Link to={"/releases"}> Main Releases Page</Link></p>
                </>
            }
          </h1>
        </div>
      </div>
      {
        foundRelease ?
          <>
            <Seo data={headData} />
            <div className="row">
              <div className="col-10 offset-1">
                <div className="row main-body">
                  <div className="col-6">
                    <img className="img-fluid" src={currRelease.album_art} alt={`${currRelease.name} Album Art`} />
                  </div>
                  <div className="col-6">
                    <h4 className="release-page-h4">Primary Artist{currRelease.primary_artist_ids.length > 1 ? "s" : ""}</h4>
                    <div className="release-page-text-container primary-artist-release">
                      {
                        currRelease.primary_artist_ids.map(
                          (i, j) => {
                            const currArtist = artistData.find(a => a.id === i);
                            return (
                              <React.Fragment key={j}>
                                <Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
                                  {currArtist.name}
                                </Link>
                                <span className="white-text">
                                  {`${j < currRelease.primary_artist_ids.length - 1 ? ", " : ""}`}
                                </span>
                              </React.Fragment>
                            )
                          }
                        )
                      }
                    </div>
                    {currRelease.secondary_artist_ids.length > 0 ?
                      <>
                        <h4 className="release-page-h4">
                          {`Additional Artist${currRelease.secondary_artist_ids.length > 1 ? "s" : ""}`}
                        </h4>
                        <div className="release-page-text-container">
                          {
                            currRelease.secondary_artist_ids.map(
                              (i, j) => {
                                const currArtist = artistData.find(a => a.id === i);
                                return (
                                  <React.Fragment key={j}>
                                    <Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
                                      {currArtist.name}
                                    </Link>
                                    <span className="white-text">
                                      {`${j < currRelease.secondary_artist_ids.length - 1 ? ", " : ""}`}
                                    </span>
                                  </React.Fragment>
                                )
                              }
                            )
                          }
                        </div>
                      </>
                      : null
                    }
                    {currRelease.remix_artist_ids.length > 0 ?
                      <>
                        <h4 className="release-page-h4">
                          {`Remixer${currRelease.remix_artist_ids.length > 1 ? "s" : ""}`}
                        </h4>
                        <div className="release-page-text-container">
                          {
                            currRelease.remix_artist_ids.map(
                              (i, j) => {
                                const currArtist = artistData.find(a => a.id === i);
                                return (
                                  <React.Fragment key={j}>
                                    <Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
                                      {currArtist.name}
                                    </Link>
                                    <span className="white-text">
                                      {`${j < currRelease.remix_artist_ids.length - 1 ? ", " : ""}`}
                                    </span>
                                  </React.Fragment>
                                )
                              }
                            )
                          }
                        </div>
                      </>
                      : null
                    }
                    <p>
                      {currRelease.short_description}
                    </p>
                    <div className="text-border d-none d-lg-block">
                      {mappedPTag(currRelease.release_bio, "release-bio-paragraphs text-left")}

                      {currRelease.local_path.includes("WHYCOMP") && <Link to={`/contest/${currRelease.local_path}`}>Competition Details</Link>}
                    </div>
                    <p>Primary Genre:  {currRelease.genre}</p>
                    <p>Release Date: {currRelease.release_date.split("T")[0]}</p>
                    <div className="row">
                      <div className="col">
                        Music Platforms
                        <div>
                          {mappedLinks(currRelease.links)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row d-block d-lg-none mt-3">
                  <div className="col">
                    <div className="text-border">
                      {mappedPTag(currRelease.release_bio, "release-bio-paragraphs text-left")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          null
      }
    </>
  )
}
