import { useState, useEffect, useMemo } from "react";
import { TwitchEmbed } from "react-twitch-embed";
import { Seo } from "../Seo";

export function LivePage() {
  const headData = {
    title: "Live - WRC",
    siteTitle: "WHY? Record Company",
    url: "/live",
    imgSrc: "/images/WRC.jpg",
    description: "Watch live streams from WHY? Record Company artists",
    keywords: "why, record, company, live, stream, twitch, music",
  };
  const [weekday, setWeekday] = useState(new Date().getDay());
  useEffect(() => setInterval(() => setWeekday(new Date().getDay(), 1000)), []);
  // TODO: add this to sidebar

  const scheduledTwitchUser = useMemo(() => {
    const twitchUsers = [
      "lom564",
      "lom564",
      "lom564",
      "lom564",
      "lom564",
      "lom564",
      "lom564",
    ];
    return twitchUsers[weekday];
  }, [weekday]);
  const hardcodedTwitch = "quantopix";
  const currentTwitchUser = false ? hardcodedTwitch : scheduledTwitchUser;
  return (
    <>
      <Seo data={headData} />
      <div className="row center-contact">
        <div className="col-12">
          <h1 className="header-sub-page">Livestreams</h1>
          <div className="questrial">
            <TwitchEmbed
              channel={currentTwitchUser}
              id={currentTwitchUser}
              theme="dark"
              width="100%"
              onVideoPause={() => console.log(":(")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
