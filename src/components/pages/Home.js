import React from 'react';
import "./Home.scss"
import { Link } from "react-router-dom";
import styled from 'styled-components'
import releaseData from '../../constants/releaseData.json'

const BgStyledDiv = styled.div`
@media only screen and (max-width: 991px) {

		background-image: ${props => `url("${props.source}")`};
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
				<BgStyledDiv className="col-lg-6 questrial text-left home-margin" source={source}>
					{/* TODO: generate these numbers from the release data */}
					<p className="main-page-p">
						WHY? Record Company (further stylized as WRC) is a home for audio, visual, and technological creatives.
						Housing over 300 songs and {releaseData.length} <Link to="/releases">releases</Link> bound to no genre, WRC is proud to foster musicians and help grow a fanbase over many years.
					</p>
					<p className="main-page-p">
						Although founded in 2019, the idea for WHY? Record Company is not a new one; label owners Ian Rios and Dylan Smock had speculated on hosting their own music independently since 2016, and since then, have recruited many other like minded individuals in their ever growing artist roster. The first threads of the label were sewn in college; originally named "PULSE Artist Collective". However, being in college meant a specific sub par level of branding, hence the upgrade to the clean and modern WRC.
					</p>
					<p className="main-page-p">
						WRC was created for our music to have a home that we could call ours. Our number one goal is to bring music and art to our listeners and loyal fanbase, and be able to do so freely, quickly, and without stress.
						We do everything in house, from writing, recording, producing, mixing, mastering, designing artwork and merch, planning promotion campaigns, distributing releases, creating this website, and more. See <Link to="/artists">artists</Link> for detailed information on what a particular individual enjoys most.
					</p>
					<p className="main-page-p">
						For more information about the label, website issues, or to get involved, <Link to="/contact">contact us</Link> by sending us an email or message on social media.
					</p>
				</BgStyledDiv>
			</div>
		</>
	)
}
