import React, { useState, useEffect, useMemo } from 'react'
import { TwitchEmbed } from 'react-twitch-embed';


function LivePage() {
    const [weekday, setWeekday] = useState(new Date().getDay())
    useEffect(() => setInterval(() => setWeekday(new Date().getDay(), 1000)), [])
    // TODO: add this to sidebar
    
    const scheduledTwitchUser = useMemo(() => {
        
        const twitchUsers = ["lom564", "lom564", "quantopix", "lom564", "lom564", "unostwo", "unostwo"]
        return twitchUsers[weekday]}, [weekday])
    const hardcodedTwitch = "quantopix"
    const currentTwitchUser = false ? hardcodedTwitch : scheduledTwitchUser
    return (
        <div className="row center-contact">
            <div className="col-12">
                <h1 className="header-sub-page">Livestreams</h1>
                <div className="questrial">
                    <TwitchEmbed
                        channel={currentTwitchUser}
                        id={currentTwitchUser}
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
