import React from 'react'
import { TwitchEmbed } from 'react-twitch-embed';


function LivePage() {
    const twitchUsers = ["lom564", "quantopix", 'euphorixeventsofficial']
    // TODO: add this to sidebar
    return (
        <div className="row center-contact">
            <div className="col-12">
                <h1 className="header-sub-page">Livestreams</h1>
                <div className="questrial">
                    <TwitchEmbed
                        channel={twitchUsers[2]}
                        id={twitchUsers[2]}
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
