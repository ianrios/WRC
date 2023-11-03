import React from "react";
// import { Link } from 'react-router-dom'
import _ from "lodash";
import {
  GrFacebook,
  GrSpotify,
  GrYoutube,
  GrTwitter,
  GrInstagram,
  GrGithub,
  GrAmazon,
  GrSoundcloud,
  GrGooglePlay,
  GrDocumentZip,
} from "react-icons/gr";
import {
  SiApplemusic,
  SiTwitch,
  SiDiscord,
  SiBandcamp,
  SiDeezer,
  SiTidal,
  SiDropbox,
  SiGumroad,
  SiPandora,
  SiMixcloud,
  SiGoogledrive,
} from "react-icons/si";
import { CgPlayList } from "react-icons/cg";
import { BiPurchaseTagAlt, BiMagnet } from "react-icons/bi";

export const mappedPTag = (arr, className) => {
  return arr.map((item, idx) => {
    let use = item.search("__BREAK__")
      ? item.split("__BREAK__").map((i, j) => (
        <React.Fragment key={j}>
          {i} <br />
        </React.Fragment>
      ))
      : item;
    if (item.search("__b__") !== -1) {
      let arr = item.split("__b__");
      use = [arr[0], <b key={"b"}>{arr[1]}</b>, arr[2]];
    }
    if (item.search("__i__") !== -1) {
      let arr = item.split("__i__");
      use = [arr[0], <i key={"i"}>{arr[1]}</i>, arr[2]];
    }
    if (item.search("__email__") !== -1) {
      let arr = item.split("__email__");
      use = [
        arr[0],
        <a
          key={"a"}
          href="mailto: info@whyrecord.com?subject=Nov%20WRC%20Competition"
        >
          info@whyrecord.com
        </a>,
        arr[1],
      ];
    }
    if (item.search("discord") !== -1) {
      let arr = item.split("discord");
      use = [
        arr[0],
        <a key={"a"} href="https://discord.gg/ZHe4A5k">
          discord
        </a>,
        arr[1],
      ];
    }
    return (
      <p key={idx} className={`questrial ${className}`}>
        {use}
      </p>
    );
  });
};

export const mappedObjArr = (arr, className) => (
  <dl className="row">
    {arr.map((o) =>
      _.map(o, (i, k) => (
        <React.Fragment key={k}>
          <dt className="col-sm-3">
            {(k === "Info" || k === "Resources" || k === "Sample") && k}
          </dt>
          <dd className="col-sm-9">
            {k === "Info" || k === "Resources" || k === "Sample" ? (
              i
            ) : (
              <a href={i} target="_blank" rel="noopener noreferrer">
                {k}
              </a>
            )}
          </dd>
        </React.Fragment>
      ))
    )}
  </dl>
);

export const mappedATag = (props) => {
  const keys = Object.keys(props);
  return keys.map(
    (item, idx) =>
      props[item].length > 0 && (
        <React.Fragment key={idx}>
          <a target="_blank" rel="noopener noreferrer" href={props[item]}>
            {item}
          </a>
          {idx < keys.length - 1 && " - "}
        </React.Fragment>
      )
  );
};

export const mappedD3ArtistTags = (props) => {
  const keys = Object.keys(props);
  const mappedData = keys.map((item, idx) => (
    <span key={idx}>
      {item}
      {idx < keys.length - 1 ? ", " : ""}
    </span>
  ));
  return mappedData;
};

export const mappedIcon = (iconShorthand) => {
  // https://react-icons.github.io/react-icons
  switch (iconShorthand) {
    case "fb":
      return <GrFacebook />;
    case "yt":
      return <GrYoutube />;
    case "sp":
      return <GrSpotify />;
    case "pl":
      return <CgPlayList />;
    case "tw":
      return <GrTwitter />;
    case "ig":
      return <GrInstagram />;
    case "gh":
      return <GrGithub />;
    case "az":
      return <GrAmazon />;
    case "sc":
      return <GrSoundcloud />;
    case "gp":
      return <GrGooglePlay />;
    case "zip":
      return <GrDocumentZip />;
    case "ap":
      return <SiApplemusic />;
    case "tc":
      return <SiTwitch />;
    case "ds":
      return <SiDiscord />;
    case "bc":
      return <SiBandcamp />;
    case "td":
      return <SiTidal />;
    case "dz":
      return <SiDeezer />;
    case "pd":
      return <SiPandora />;
    case "db":
      return <SiDropbox />;
    case "dr":
      return <SiGoogledrive />;
    case "gr":
      return <SiGumroad />;
    case "mc":
      return <SiMixcloud />;
    case "sl":
      return <BiPurchaseTagAlt />;
    case "to":
      return <BiMagnet />;
    case "tn":
      return (
        <img
          src="/images/icons/tindie-logo@2x.png"
          className="image-icon"
          alt="tindie"
        />
      );
    case "au":
      return (
        <img
          src="/images/icons/audius.png"
          className="image-icon"
          alt="audius"
        />
      );
    default:
      return;
  }
};

export const styledIconLink = (link, icon) => {
  return (
    <a
      href={link}
      className="icon-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

export const mappedLinks = (props) => {
  const keys = Object.keys(props);

  return keys.map((item, idx) => {
    const icon = mappedIcon(item);
    return (
      props[item].length > 0 && (
        <React.Fragment key={idx}>
          {styledIconLink(props[item], icon)}
          {idx < keys.length - 1 && " - "}
        </React.Fragment>
      )
    );
  });
};
