import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Seo from '../Seo'
import contestData from '../../constants/contestData.json'

export default function ContestPage() {

    const locationObj = useLocation();
    const location = locationObj.pathname.split("/")[2];
    const currContest = contestData.find(i => i.local_path.toLowerCase() === location.toLowerCase());
    const foundContest = currContest === undefined ? false : true;

    const headData = {
        title: "Contests - WRC",
        shortSiteTitle: `Competition Page - WRC`,
        siteTitle: "WHY? Record Company",
        url: "contests",
        description: "WHY? Record Company Contests",
        keywords: "why, record, company, music, edm, techno, idm, experimental, label, release, competition"
    }

    const mappedPTag = (props, className) => {
        return (
            props.map((item, idx) => {


                let use = item;
                if (item.search("__b__") !== -1) {
                    let arr = item.split("__b__")
                    use = [arr[0], <b>{arr[1]}</b>, arr[2]]
                }
                if (item.search("__i__") !== -1) {
                    let arr = item.split("__i__")
                    use = [arr[0], <i>{arr[1]}</i>, arr[2]]
                }
                if (item.search("__email__") !== -1) {
                    let arr = item.split("__email__")
                    use = [arr[0], <a href="mailto: info@whyrecord.com?subject=Nov%20WRC%20Competition">info@whyrecord.com</a>, arr[1]]
                }
                return (
                    <p
                        key={idx}
                        className={`questrial text-left ${className}`}
                    >
                        {use}
                    </p>
                )
            })
        )
    }

    return (
        <>
            <div className="row main-header">
                <div className="col">
                    <h1 className="header-sub-page">
                        {foundContest
                            ? currContest.name
                            : <>
                                could not locate contest page
								<p>see <Link to="/contact">contact page</Link> for more information, or go back to the<Link to={"/contests"}> Main Contests Page</Link></p>
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
                                            {mappedPTag(currContest.rules)}
                                        </div>
                                        <hr />
                                        <div className="text-left text-border">
                                            <h3>Recommendations:</h3>
                                            {mappedPTag(currContest.recommendations)}
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
