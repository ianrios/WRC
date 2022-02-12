import React from 'react'
import Seo from '../Seo';

export default function Landing() {
    const copyText = () => {
        navigator.clipboard.writeText("https://whyrecord.com/discord")
    }

    const headData = {
        title: "WRC Landing Page",
        shortSiteTitle: `WRC Landing Page`,
        siteTitle: "WHY? Record Company",
        url: "/landing",
        description: "WHY? Record Company Landing Page",
        keywords: "why, record, company, music, edm, techno, idm, experimental, label, release"
    }



    return (
        <>
            <div className="row main-header">
                <div className="col">
                    <h1 className="header-sub-page questrial">Welcome</h1>
                </div>
            </div>



            <>
                <Seo data={headData} />
                <div className="row">
                    <div className="col-10 offset-1">
                        <div className="row main-body questrial text-white text-center">
                            <div className="col-12">
                                <h2>Upcoming Releases</h2>
                                <div className="text-border row">
                                    
                                </div>
                            </div>
                            <div className="col-12">
                                <h2>Newest Releases</h2>
                                <div className="text-border row">
                                    
                                </div>
                            </div>
                            <div className="col-12">
                                <h2>Newest Mix</h2>
                                <div className="text-border row">
                                    
                                </div>
                            </div>
                            <div className="col-12">
                                <h2>Newest Products</h2>
                                <div className="text-border row">
                                    
                                </div>
                            </div>
                            <div className="col-12">
                                <h2>Streaming Platforms</h2>
                                <div className="text-border row">

                                </div>
                            </div>
                            <div className="col-12">
                                <h2>Social Media</h2>
                                <div className="text-border row">

                                </div>
                            </div>
                            <div className="col-12">
                                <h2>Discord Link</h2>
                                <div className="text-border row">
                                    <div className="col-sm-12 col-md-6">
                                        <span className="btn btn-light" onClick={copyText}>
                                            Copy Discord Invite Link
                                        </span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 ">

                                        <a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://whyrecord.com/discord">whyrecord.com/discord</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}
