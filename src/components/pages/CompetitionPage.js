import React from 'react'
import Seo from "../Seo"

export default function CompetitionPage() {

    const headData = {
        title: "Competitions - WRC",
        shortSiteTitle: `Competition Page - WRC`,
        siteTitle: "WHY? Record Company",
        url: "competitions",
        description: "WHY? Record Company Competitions",
        keywords: "why, record, company, music, edm, techno, idm, experimental, label, release, competition"
    }

    return (
        <>
            <div className="row main-header">
                <div className="col">
                    <h1 className="header-sub-page">Competitions / Compilations</h1>
                </div>
            </div>
            <Seo data={headData} />
            <div className="row">
                <div className="col-10 offset-1">
                    <div className="row">
                        <div className="col text-center questrial">
                            <h2>Rain Themed Ambient Competition</h2>
                            <h4>Winning songs will be released on "WHYCOMP001 - Rain", set to release in December</h4>
                            <hr />
                            <div className="text-left text-border">
                                <h3>Rules:</h3>
                                <p>1. Deadline: November 1st, 2020</p>
                                <p>2. If you use samples, they must be royalty free</p>
                                <p>3. Theme: <b>Rain</b> (you should create a song that embodies "rain"; perhaps this means you use rain recordings, synthesize the sound of rain, use rain as an inspiration for your song structure / lyrics, create a rain soundscape using only sounds that are not rain, etc.)</p>
                                <p>4. You cannot use "Rain" in your song title, as it is the album name</p>
                                <p>5. No beats (drums can be used, but that kind of defeats the purpose of 'ambient', so use them creatively if you decide to use them at all)</p>
                                <p>6. Submit your final song mixed and mastered to <a href="mailto: info@whyrecord.com?subject=Nov%20WRC%20Competition">info@whyrecord.com</a> as a downloadable 44.1Khz wav file titled <b><i>"artist_name - song_name.wav"</i></b></p>

                            </div>
                            <hr />
                            <div className="text-left text-border">
                                <h3>Recommendations:</h3>
                                <p>Ambient / Drone / "peaceful noises" / Field Recordings / Sound Scapes / etc. are most likely to be selected for the album</p>
                                <p>Collabs are good ways to make new friends and make cool sounds</p>
                            </div>
                            <h5>Full Disclosure: Members of WRC will be participating in the competition, as well as judging the songs submitted. Our goal is to include as many songs as possible, so we will probably not turn away a song unless it does not follow the rules or fit the criteria for the album.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
