import React from 'react';
import { Link } from "react-router-dom";
import releaseData from "../../constants/releaseData.json";
import setData from "../../constants/setData.json";
import recData from "../../constants/recData.json";
import './Releases.scss';

const sortedReleases = [...releaseData, ...setData, ...recData].sort((a, b) => (a.release_date > b.release_date) ? -1 : ((a.release_date < b.release_date) ? 1 : 0))

export default function Releases() {
	const ReleasesGrid = sortedReleases.map((item, index) => {
		const color = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1))) + Math.ceil(1);

		return (
			<div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 release-grid-item">
				<Link to={`/release/${item.local_path}`} className="text-on-image">
					<img
						className={`img-fluid release-image-color-${color}`}
						src={item.album_art}
						alt={item.name} />
					<span className="centered-text">{item.name}</span>
				</Link>
			</div>
		)
	});

	return (
		<>
			<h1 className="header-sub-page">Releases</h1>
			<div className="container-fluid">
				<div className="row release-grid">
					{ReleasesGrid}
				</div>
			</div>
		</>
	)
}
