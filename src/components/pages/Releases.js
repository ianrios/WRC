import React from 'react';
import { Link } from "react-router-dom";
import releaseData from "../../constants/releaseData.json";
import './Releases.scss';

export default function Releases() {
	let artistsObj = {};
	const ReleaseMap = releaseData
		.sort((a, b) => (a.release_date > b.release_date) ? -1 : ((a.release_date < b.release_date) ? 1 : 0))
		.filter(i => i.label_number.slice(0, 3) === "WHY")
		.map((item, idx) => {
			const firstArtist = item.primary_artist_ids[0];
			// console.log(item)
			const currArtistName = firstArtist.name;
			if (currArtistName in artistsObj) {
				artistsObj[currArtistName]++;
			}
			else {
				artistsObj[currArtistName] = 1;
			}
			const color = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1))) + Math.ceil(1);
			return (
				<div key={idx} className="row release-image-row text-center mb-last-child">
					<div className="col-lg-6 col-md-8 col-sm-10 mx-auto text-on-image text-center">
						<Link to={`/release/${item.local_path}`} >
							<img
								className={`img-fluid release-image-color-${color}`}
								src={item.album_art}
								alt={item.name} />
							{/* <span className="centered-text">{item.name}</span> */}
						</Link>
					</div>
				</div>
			)
		});
	return (
		<>
			<h1 className="header-sub-page">Releases</h1>
			{ReleaseMap}
		</>
	)
}
