import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mappedPTag, mappedLinks } from "../../utilities/maps";
import Seo from "../Seo";

import productData from "../../constants/productData.json";
import setData from "../../constants/setData.json";
import recData from "../../constants/recData.json";
import releaseData from "../../constants/releaseData.json";
import independentReleaseData from "../../constants/independentReleaseData.json";
import artistData from "../../constants/artistData.json";

import { MdSaveAlt } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
// TODO: add upcoming projects list
// TODO: add
// TODO: add
// TODO: add
// TODO: add

export default function ArtistProfile({ epk = false }) {
  const { artist_name } = useParams();

  const currArtist = artistData.find(
    (i) => i.local_path.toLowerCase() === artist_name.toLowerCase()
  );
  const foundArtist = currArtist !== undefined;

  const sortedData = [
    ...releaseData,
    ...independentReleaseData,
    ...recData,
    ...setData,
  ].sort((a, b) =>
    a.release_date > b.release_date
      ? -1
      : a.release_date < b.release_date
        ? 1
        : 0
  );

  const artistReleases = sortedData.filter((r) => {
    for (let j of r.primary_artist_ids) {
      if (j === currArtist.id) {
        return r;
      }
    }
    for (let j of r.secondary_artist_ids) {
      if (j === currArtist.id) {
        return r;
      }
    }
    for (let j of r.remix_artist_ids) {
      if (j === currArtist.id) {
        return r;
      }
    }
    return null;
  });

  const artistProducts = productData.filter((p) => {
    for (let j of p.primary_artist_ids) {
      if (j === currArtist.id) {
        return p;
      }
    }
    return null;
  });

  const mappedImgCol = (props, url = "release") => {
    return props.map((a, i) => {
      return (
        <div
          className="col-4 col-md-3 text-center artist-page-album-art-container"
          key={i}
        >
          <Link
            to={`/${url}/${a.local_path}`}
            className="artist-page-album-art-link"
          >
            <img
              alt={a.name}
              src={url === "release" ? a.album_art : a.product_image}
              className="img-fluid"
            />
            <span className=" colored-link white-text">
              {url === "release" ? a.label_number : a.name}
            </span>
          </Link>
        </div>
      );
    });
  };

  const [seeMoreBio, setSeeMoreBio] = useState(false)
  useEffect(() => {
    if (!epk) {
      setSeeMoreBio(true)
    }
  }, [epk])

  const [photoI, setPhotoI] = useState(0);
  const headData = foundArtist
    ? {
      title: currArtist.name + " - WRC",
      shortSiteTitle: `${currArtist.name} Artist Page - WRC`,
      siteTitle: "WHY? Record Company",
      url: artist_name,
      imgSrc: currArtist.photos[0],
      description: currArtist.quote,
      keywords:
        "why, record, company, music, edm, techno, idm, experimental, label, artist, " +
        currArtist.name,
    }
    : {
      title: "Error Page not found - WRC",
      shortSiteTitle: `Collection page not found - WRC`,
      siteTitle: "WHY? Record Company",
      url: artist_name,
      imgSrc: "error.jpg",
      description: "",
      keywords: "why, record, company, page not found",
    };
  return (
    <>
      <div className="row main-header">
        <div className="col">
          <h1 className="header-sub-page">
            {foundArtist ? (
              currArtist.name
            ) : (
              <>
                <p>could not locate artist page</p>
                <p>
                  visit our <Link to="/errors">error page</Link> for more
                  information, or go back to the
                  <Link to={"/artists"}> Main Artists Page</Link>
                </p>
              </>
            )}
          </h1>
        </div>
      </div>
      {foundArtist && (
        <>
          <Seo data={headData} />
          <div className="row">
            <div className="col-10 offset-1">
              <div className="row main-body">
                <div className="col-6">
                  {epk && <div className="row">

                    {currArtist.photos.map((img, i) => <div className="col-12 questrial border flex space-between mb-2 pointer code-text" key={i} onClick={() => setPhotoI(i)}>
                      {img.split('/images/artists/')}
                      <a href={img} download className="no-style-link">
                        <MdSaveAlt />
                      </a>
                    </div>)}

                  </div>}
                  <div className="row">
                    <img
                      onClick={() => setPhotoI(photoI + 1)}
                      className="artist-page-image img-fluid help-cursor"
                      alt={currArtist.name}
                      src={currArtist.photos[photoI % currArtist.photos.length]}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <p>{currArtist.quote}</p>
                  {currArtist.epk && epk && <a href={currArtist.epk} target="_blank" rel="noopener noreferrer" className="flex border mb-3 center no-style-link">get music drive<span><FaDownload className="download-style" /></span></a>}

                  {currArtist.body_paragraphs.length > 0 &&

                    (!seeMoreBio ?
                      <div className="text-border d-none d-lg-block">
                        {mappedPTag(
                          [currArtist.body_paragraphs[0]],
                          "artist-bio-paragraphs mappedPTag"
                        )}
                        {epk &&
                          <div className="border flex center mb-2 help-cursor" onClick={() => setSeeMoreBio(!seeMoreBio)}>
                            {seeMoreBio ? "see less" : "see more"}
                          </div>}
                      </div>
                      :
                      <div className="text-border d-none d-lg-block">
                        {mappedPTag(
                          currArtist.body_paragraphs,
                          "artist-bio-paragraphs mappedPTag"
                        )}
                        {epk &&
                          <div className="border flex center mb-2 help-cursor" onClick={() => setSeeMoreBio(!seeMoreBio)}>
                            {seeMoreBio ? "see less" : "see more"}
                          </div>}
                      </div>
                    )

                  }


                  <div className="row">
                    {Object.keys(currArtist.social_platforms).length > 0 && (
                      <div
                        className={
                          Object.keys(currArtist.music_platforms).length > 0
                            ? "col-md-6"
                            : "col-md-12"
                        }
                      >
                        Social Platforms
                        <div>{mappedLinks(currArtist.social_platforms)}</div>
                      </div>
                    )}
                    {Object.keys(currArtist.music_platforms).length > 0 && (
                      <div
                        className={
                          Object.keys(currArtist.social_platforms).length > 0
                            ? "col-md-6"
                            : "col-md-12"
                        }
                      >
                        {artistReleases.length === 0 &&
                          artistProducts.length > 0
                          ? ""
                          : "Music "}
                        Platforms
                        <div>{mappedLinks(currArtist.music_platforms)}</div>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col">
                      <h5 className="h5-path-artist-page">
                        {currArtist.location.city},{" "}
                        {currArtist.location.country}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {currArtist.email && (
                        <a
                          className="email-link"
                          href={`mailto:${currArtist.email}?Subject=Hello%20${currArtist.name}`}
                        >
                          {currArtist.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-block d-lg-none mt-5">
                <div className="col">
                  {currArtist.body_paragraphs.length > 0 && (
                    <div className="text-border">
                      {mappedPTag(
                        currArtist.body_paragraphs,
                        "artist-bio-paragraphs"
                      )}
                    </div>
                  )}
                </div>
              </div>
              {artistReleases.length > 0 && (
                <div className="row">
                  <div className="col">
                    <h1 className="header-second-row">Release Appearances</h1>
                  </div>
                </div>
              )}
              <div className="row artist-page-releases">
                {mappedImgCol(artistReleases)}
              </div>
              {artistProducts.length > 0 && (
                <div className="row">
                  <div className="col">
                    <h1 className="header-second-row">Products</h1>
                  </div>
                </div>
              )}
              <div className="row artist-page-releases">
                {mappedImgCol(artistProducts, "product")}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
