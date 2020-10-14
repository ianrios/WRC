import React, { useState, useEffect } from 'react';
import {
	BrowserRouter,
	useLocation
} from "react-router-dom";
import Q from './Q';
import Seo from './Seo';
import Navbar from './Navbar';
import Route from './Routes';
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import './App.scss';


function Wrapper() {
	const [viewMain, setViewMain] = useState(true);
	const location = useLocation();
	const pathArr = location.pathname.split("/");
	useEffect(() => {
		if (
			pathArr[1] === "competitions" ||
			pathArr[1] === "collections" ||
			pathArr[1] === "hard-reload" ||
			pathArr[1] === "series" ||
			(pathArr.length > 2 && (
				pathArr[1] === "collection" ||
				pathArr[1] === "artist" ||
				pathArr[1] === "release"))
		) {
			setViewMain(false)
		}
	}, [pathArr]);
	const appTitle = "WHY? Record Company".split("").map((i, k) => i === "?" ? <Q size={2} key={k} /> : <span key={k} >{i}</span>)
	const headData = {
		title: "Home",
		shortSiteTitle: "WRC",
		siteTitle: "WHY? Record Company",
		url: location.pathname,
		imgSrc: "meta.jpg",
		description: "WHY? Record Company Homepage",
		keywords: "why, record, company, music, edm, techno, idm, experimental, label"
	}
	return (
		<div className="App">
			<Seo data={headData} />
			{viewMain ?
				<div className="body-grid">
					<div
						className="main-image" style={{
							backgroundImage: `url("/images/textures/${Math.floor(Math.random() * 7) + 1}.jpg")`
						}}
						onClick={() => setViewMain(!viewMain)}
					>
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
						<Footer viewMain={viewMain} setViewMain={setViewMain} />
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