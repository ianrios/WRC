import React from 'react'
import Seo from "../Seo"

export default function DiscordInvite() {
    // window.location.replace("https://discord.gg/ZHe4A5k")

    // let newTab = window.open('https://discord.gg/ZHe4A5k', '_blank');
   
    const headData = {
        title: "WRC Discord Invite",
        shortSiteTitle: `WRC Discord Invite`,
        siteTitle: "WHY? Record Company",
        url: "/landing",
        description: "WHY? Record Company Discord Invite",
        keywords: "why, record, company, music, edm, techno, idm, experimental, label, release"
    }

    const copyText = () => {
        navigator.clipboard.writeText("https://whyrecord.com/discord")
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
                                <h2>Discord Link</h2>
                                <div className="text-border row">
                                    <div className="col-sm-12 col-md-6">
                                        <span className="btn btn-light" onClick={copyText}>
                                            Copy Discord Invite Link
                                        </span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 ">
                                       pop-up blocked? Continue to <a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://discord.gg/ZHe4A5k">discord</a>
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
