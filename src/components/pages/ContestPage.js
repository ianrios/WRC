import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Seo from '../Seo'
import contestData from '../../constants/contestData.json'
import { mappedPTag } from '../../utilities/maps'

export default function ContestPage() {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const currContest = contestData.find(i => i.local_path.toLowerCase() === path.toLowerCase());
    const foundContest = currContest === undefined ? false : true;

    const headData = {
        title: "Contests - WRC",
        shortSiteTitle: `Competition Page - WRC`,
        siteTitle: "WHY? Record Company",
        url: location.pathname,
        description: "WHY? Record Company Contests",
        keywords: "why, record, company, music, edm, techno, idm, experimental, label, release, competition"
    }

    return (
        <>
            <div className="row main-header">
                <div className="col">
                    <h1 className="header-sub-page">
                        {foundContest
                            ? currContest.name :
                            <>
                                <p>could not locate contest page</p>
                                <p>visit our <Link to="/errors">error page</Link> for more information, or go back to the<Link to={"/contests"}> Main Contests Page</Link></p>
                            </>
                        }
                    </h1>
                </div>
            </div>
            {
                foundContest ?
                    <>

                        <Seo data={headData} />
                        <div className="row">
                            <div className="col-10 offset-1">
                                <div className="row">
                                    <div className="col text-center questrial">
                                        <h2>{currContest.description}</h2>
                                        <h4>{currContest.h4}</h4>
                                        <hr />
                                        <div className="text-left text-border">
                                            <h3>Rules:</h3>
                                            {mappedPTag(currContest.rules, "text-left")}
                                        </div>
                                        <hr />
                                        <div className="text-left text-border">
                                            <h3>Recommendations:</h3>
                                            {mappedPTag(currContest.recommendations, "text-left")}
                                        </div>
                                        <h5>{currContest.disclosure}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }
        </>
    )
}
