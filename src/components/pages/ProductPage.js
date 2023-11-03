import React from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../Seo";

import productData from "../../constants/productData.json";
import artistData from "../../constants/artistData.json";

import "./ProductPage.scss";
import { mappedPTag, mappedLinks } from "../../utilities/maps";

export default function ProductPage() {
  const { name } = useParams();

  const currProduct = productData.find(
    (i) => i.local_path.toLowerCase() === name.toLowerCase()
  );
  const foundProduct = currProduct === undefined ? false : true;

  const headData = foundProduct
    ? {
        title: currProduct.name + " - WRC",
        shortSiteTitle: `${currProduct.name} Product Page - WRC`,
        siteTitle: "WHY? Record Company",
        url: name,
        imgSrc: currProduct.product_image,
        description:
          currProduct.product_bio.length > 0 ? currProduct.product_bio[0] : "",
        keywords:
          "why, record, company, music, edm, techno, idm, experimental, label, product, " +
          currProduct.name,
      }
    : {
        title: "Error Page not found - WRC",
        shortSiteTitle: `Collection page not found - WRC`,
        siteTitle: "WHY? Record Company",
        url: name,
        imgSrc: "error.jpg",
        description: "",
        keywords: "why, record, company, page not found",
      };
  return (
    <>
      <div className="row main-header">
        <div className="col">
          <h1 className="header-sub-page">
            {foundProduct ? (
              currProduct.name
            ) : (
              <>
                <p>could not locate product page</p>
                <p>
                  visit our <Link to="/errors">error page</Link> for more
                  information, or go back to the
                  <Link to={"/products"}> Main Products Page</Link>
                </p>
              </>
            )}
          </h1>
        </div>
      </div>
      {foundProduct ? (
        <>
          <Seo data={headData} />
          <div className="row">
            <div className="col-10 offset-1">
              <div className="row main-body">
                <div className="col-6">
                  <img
                    className="img-fluid"
                    src={currProduct.product_image}
                    alt={`${currProduct.name} Product`}
                  />
                </div>
                <div className="col-6">
                  <h4 className="product-page-h4">
                    Creator
                    {currProduct.primary_artist_ids.length > 1 ? "s" : ""}
                  </h4>
                  <div className="product-page-text-container primary-artist-product">
                    {currProduct.primary_artist_ids.map((i, j) => {
                      const currArtist = artistData.find((a) => a.id === i);
                      return (
                        <React.Fragment key={j}>
                          <Link
                            to={`/artist/${currArtist.local_path}`}
                            className="smaller-font-temp"
                          >
                            {currArtist.name}
                          </Link>
                          <span className="white-text">
                            {`${
                              j < currProduct.primary_artist_ids.length - 1
                                ? ", "
                                : ""
                            }`}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <p>{currProduct.short_description}</p>
                  <div className="text-border d-none d-lg-block">
                    {mappedPTag(
                      currProduct.product_bio,
                      "product-bio-paragraphs text-left"
                    )}
                  </div>
                  <div className="row">
                    <div className="col">
                      Platforms
                      <div>{mappedLinks(currProduct.links)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-block d-lg-none mt-3">
                <div className="col">
                  <div className="text-border">
                    {mappedPTag(
                      currProduct.product_bio,
                      "product-bio-paragraphs text-left"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
