import { NavLink } from "react-router-dom";
import { Seo } from "../Seo";
import { isAdminAuthenticated } from "../../utils/featureFlags";
import "./Information.scss";

export function Information() {
  const isAdmin = isAdminAuthenticated();

  const headData = {
    title: "Information - WRC",
    siteTitle: "WHY? Record Company",
    url: "/information",
    imgSrc: "/images/WRC.jpg",
    description: "Site information and resources for WHY? Record Company",
    keywords: "why, record, company, information, site map, resources",
  };

  return (
    <>
      <Seo data={headData} />
      <div className="information-page">
        <h1 className="header-sub-page">Site Information</h1>

        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 info-section">
              <h3>Site Index</h3>
              <ul className="info-list">
                <li>
                  <NavLink to="/home">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/artists">Artists</NavLink>
                </li>
                <li>
                  <NavLink to="/releases">Releases</NavLink>
                </li>
                <li>
                  <NavLink to="/collections">Collections</NavLink>
                </li>
                <li>
                  <NavLink to="/contests">Contests</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/merch">Merch</NavLink>
                </li>
                <li>
                  <NavLink to="/live">Live</NavLink>
                </li>
              </ul>
            </div>

            <div className="col-md-4 col-sm-6 info-section">
              <h3>Resources</h3>
              <ul className="info-list">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://firebase.google.com/policies/analytics"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://firebase.google.com/terms"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <NavLink to="/cookie-policy">Cookie Policy</NavLink>
                </li>
                <li>
                  <NavLink to="/hard-reload">Cache Clear</NavLink>
                </li>
                <li>
                  <NavLink to="/errors">Errors</NavLink>
                </li>
              </ul>
            </div>

            <div className="col-md-4 col-sm-6 info-section">
              <h3>About</h3>
              <ul className="info-list">
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                  <NavLink to="/nexus">Nexus</NavLink>
                </li>
                <li>
                  <NavLink to="/information">Information</NavLink>
                </li>
                <li>
                  <NavLink to="/coming-soon">Coming Soon</NavLink>
                </li>
                {isAdmin && (
                  <>
                    <li>
                      <NavLink to="/admin">Admin</NavLink>
                    </li>
                    <li>
                      <NavLink to="/experiments">Experiments</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
