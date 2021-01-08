import React from 'react'
import { TwitchEmbed } from 'react-twitch-embed';


function LivePage() {
    return (
        <div className="row center-contact">
            <div className="col-12">
                <h1 className="header-sub-page">Livestreams</h1>
                <div className="questrial">
                    <TwitchEmbed
                        channel="lom564"
                        id="lom564"
                        theme="dark"
                        width="100%"
                        onVideoPause={() => console.log(':(')}
                    />
                </div>
            </div>
        </div>
    )
}

export default LivePage
