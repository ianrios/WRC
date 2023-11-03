import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import styled from "styled-components";
import releaseData from "../../constants/releaseData.json";

const BgStyledDiv = styled.div`
  @media only screen and (max-width: 991px) {
    background-image: ${(props) => `url("${props.source}")`};
    margin-top: 0px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: 15px;
  }
`;

export default function Home() {
  // TODO: put current count of songs
  // TODO: put current length of time

  const ran = Math.floor(Math.random() * 20) + 1;
  const source = "/images/landscapes/" + ran + ".jpg";
  return (
    <>
      <div className="row main-header">
        <div className="col">
          <h1 className="header-sub-page">WHY? Record Company</h1>
        </div>
      </div>
      <div className="row main-body">
        <div className="col-lg-6 image-wrapper d-none d-lg-block">
          <img className="home-image" alt="random" src={source} />
        </div>
        <BgStyledDiv
          className="col-lg-6 questrial text-left home-margin"
          source={source}
        >
          {/* TODO: generate these numbers from the release data */}
          <p className="main-page-p">
            WHY? Record Company (further stylized as WRC) is a home for audio,
            visual, and technological creatives. Housing over 300 songs and{" "}
            {releaseData.length} <Link to="/releases">releases</Link> that
            transcend genres, WRC is proud to foster musicians and help grow a
            fanbase over many years.
          </p>
          <p className="main-page-p">
            Founded in 2019 by Ian Rios and Dylan Smock, WRC is the culmination
            of their dream to independently own their music. Over the years,
            they have brought in many like-minded individuals to their growing
            artist roster, each of whom have found a welcoming home within the
            label's walls. Originally known as "PULSE Artist Collective", the
            name underwent a stylish upgrade to the modern WRC we know today.
          </p>
          <p className="main-page-p">
            With a focus on doing everything in-house - from writing, recording,
            producing, mixing, mastering, designing artwork and merch, planning
            promotion campaigns, distributing releases, creating our website,
            and more - we ensure that our <Link to="/artists">artists</Link> can
            create and showcase their work freely and without stress.
          </p>
          <p className="main-page-p">
            For more information about the label, website issues, or to get
            involved, <Link to="/contact">contact us</Link> by sending us an
            email or message on social media.
          </p>
        </BgStyledDiv>
      </div>
    </>
  );
}
