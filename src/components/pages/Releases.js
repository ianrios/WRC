import React, { useState } from 'react';
import { Link } from "react-router-dom";
import releaseData from "../../constants/releaseData.json";
import artistData from "../../constants/artistData.json";
import './Releases.scss';

export default function Releases() {
	const [filterArtists, setFilterArtists] = useState(0);

	// streamline this selection picker, can use an object instead
	// const typeSwitch = (prop) => {
	// 	switch (prop) {
	// 		case "All":
	// 			return "all-label";
	// 		case "WRC":
	// 			return "wrc-label";
	// 		case "Blue Label":
	// 			return "blue-label";
	// 		case "CYCLE":
	// 			return "cycle-label";
	// 		case "MIX":
	// 			return "mix-label";
	// 		case "RECORDINGS":
	// 			return "sample-label";
	// 		case "Other":
	// 			return "other-label";
	// 		default:
	// 			return null;
	// 	}
	// }
	// const releaseFilter = [
	// 	"WRC",
	// 	"Blue Label",
	// 	"CYCLE",
	// 	"MIX",
	// 	"RECORDINGS",
	// 	"Playlists",
	// 	"Independent",
	// 	"All"
	// ].map((item, idx) => {
	// 	return (
	// 		<p
	// 			key={idx}
	// 			className={`filter-sidebar ${typeSwitch(item)} ${idx === filterArtists ? "active-link" : null}`}
	// 			onClick={() => setFilterArtists(idx)}
	// 		>
	// 			{item}
	// 		</p>
	// 	)
	// });
	let artistsObj = {};
	const ReleaseMap = releaseData
		.sort((a, b) => (a.release_date > b.release_date) ? -1 : ((a.release_date < b.release_date) ? 1 : 0))
		.filter(i => {
			if (filterArtists === 7) {
				return i
			}
			else if (filterArtists === 0) {
				return i.label_number.slice(0, 3) === "WHY"
			}
			else if (filterArtists === 1) {
				return "blue_label_number" in i
			}
			else if (filterArtists === 2) {
				return "cycle_label_number" in i
			}
			else if (filterArtists === 3) {
				return "mix_label_number" in i
			}
			else if (filterArtists === 4) {
				return "recordings_label_number" in i
			}
			else if (filterArtists === 5) {
				return "playlist_label_number" in i
			}
			else if (filterArtists === 6) {
				return i.label_number.slice(0, 3) !== "WHY"
			}
			return null;
		})
		.map((item, idx) => {
			const firstArtist = item.primary_artist_ids[0];
			const currArtists = item.primary_artist_ids.map((i, j) => {
				const currArtist = artistData.find(a => a.id === i);
				return (
					<React.Fragment>
						<Link to={`/artist/${currArtist.local_path}`}>
							{currArtist.name}
						</Link>
						<span className="white-text">
							{`${j < item.primary_artist_ids.length - 1 ? ", " : ""}`}
						</span>
					</React.Fragment>)
			});
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
					<div className="col" />
					<div className="col-lg-6 col-md-8 col-sm-10 mx-auto text-on-image">
						<div className="text-center">
							<Link to={`/release/${item.local_path}`} >
								<img
									className={`img-fluid release-image-color-${color}`}
									src={item.album_art}
									alt={item.name} />
								<span className="centered-text">{item.name}</span>
							</Link>
						</div>
					</div>
					<div className="col" />
				</div>
			)
		});
	// const filteredArtists = Object.keys(artistsObj)
	// 	.sort((a, b) => artistsObj[b] - artistsObj[a])
	// 	.map((item, idx) => {
	// 		return (
	// 			<p
	// 				key={idx}
	// 				className="filtered-artists"
	// 			>
	// 				<Link
	// 					className="link-filtered-artists"

	// 				>
	// 					{item} - {artistsObj[item]}
	// 				</Link>
	// 			</p>
	// 		)
	// 	});
	return (
		<React.Fragment>
			<h1 className="header-sub-page">Releases</h1>
			{ReleaseMap}
		</React.Fragment>
	)
}
