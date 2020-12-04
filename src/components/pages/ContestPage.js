import React from 'react'
import { useParams, Link } from 'react-router-dom';
import Seo from '../Seo'
import contestData from '../../constants/contestData.json'
import { mappedPTag, mappedObjArr } from '../../utilities/maps'

export default function ContestPage() {

    const { name } = useParams();

    const currContest = contestData.find(i => i.local_path.toLowerCase() === name.toLowerCase());
    const foundContest = currContest === undefined ? false : true;

    const headData = {
        title: "Contests - WRC",
        shortSiteTitle: `Competition Page - WRC`,
        siteTitle: "WHY? Record Company",
        url: name,
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
                                        {currContest.releasePage && <Link to={`/release/${currContest.local_path}`}>Visit Release Page</Link>}
                                        <hr />
                                        <div className="text-left text-border">
                                            <h3>Rules:</h3>
                                            {mappedPTag(currContest.rules, "text-left")}
                                        </div>
                                        {currContest.resources.length &&
                                            <>
                                                <hr />
                                                <div className="text-left text-border">
                                                    <h3>Resources:</h3>
                                                    {mappedObjArr(currContest.resources, "text-left")}
                                                </div>
                                            </>
                                        }
                                        <hr />
                                        <div className="text-left text-border">
                                            <h3>Recommendations:</h3>
                                            {mappedPTag(currContest.recommendations, "text-left")}
                                        </div>
                                        <hr />
                                        <h5>Full Disclosure:</h5>
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