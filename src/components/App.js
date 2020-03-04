import React, { useState, useEffect } from 'react';
import {
	BrowserRouter,
	useLocation
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Q from './Q';
import Navbar from './Navbar';
import Route from './Routes';
import Logo from "./Logo";
import ScrollToTop from "./ScrollToTop";
import './App.scss';


function Wrapper() {
	const [viewMain, setViewMain] = useState(true);
	const location = useLocation();
	const pathArr = location.pathname.split("/");
	useEffect(() => {
		if (
			(pathArr[1] === "hard-reload") ||
			(pathArr[1] === "series") ||
			(pathArr.length > 2 && (
				pathArr[1] === "artist" ||
				pathArr[1] === "release"))
		) {
			setViewMain(false)
		}
	}, [pathArr]);
	const appTitle = "WHY? Record Company".split("").map((i, k) => i === "?" ? <Q size={2} key={k} /> : <span key={k} >{i}</span>)

	return (
		<div className="App">
			<Helmet
				encodeSpecialCharacters={true}
			>
				<title>WHY? Record Company</title>
				<meta property="og:image" content="meta.jpg" />
				<meta property="og:title" content="WHY? Record Company" />
				<meta name="keywords" property="og:keywords"
					content="why, record, company, music, edm, techno, idm, experimental, label" />
				<meta name="description" content="WHY? Record Company Homepage" />
			</Helmet>
			{viewMain ?
				<div className="body-grid">
					<div className="main-image" style={{
						backgroundImage: `url("/images/textures/${Math.floor(Math.random() * 8) + 1}.jpg")`
					}} onClick={() => setViewMain(!viewMain)}>
						<div className='image-overlay-text app-title'>
							{appTitle}
						</div>
					</div>
					<div className="enter-text">
						<span className="questrial colored-link white-text" onClick={() => setViewMain(!viewMain)}>
							enter
						</span>
					</div>
				</div>
				:
				<div className="body-main">
					<Navbar />
					<div className="container">
						<Route />
						<Logo viewMain={viewMain} setViewMain={setViewMain} />
					</div>
				</div>
			}
		</div>
	)
}

export default function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Wrapper />
		</BrowserRouter>
	)
}