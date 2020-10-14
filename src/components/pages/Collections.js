import React from 'react'
import { Link } from "react-router-dom"
import releaseData from "../../constants/releaseData.json";
import mixData from "../../constants/mixData.json";
import playlistData from "../../constants/playlistData.json";
import collectionData from "../../constants/collectionData.json"
import "./Collections.scss"

export default function Collections() {
	let allData = [...releaseData, ...mixData, ...playlistData]
	let releaseTypes = {}
	allData.map(i => !(i.release_type in releaseTypes) ? releaseTypes[i.release_type] = i : null)
	Object.keys(releaseTypes).map(i => releaseTypes[i]["collection"] = collectionData.find(j => j.short_title === i))
	const mappedReleaseTypes = Object.keys(releaseTypes)
		.sort((a, b) => {
			if (a === "Independent") return 1
			if (b === "Independent") return -1
			return a < b
		})
		.map(i => {
			return (
				<Link
					className={`col-md-6 col-lg-4 col-xl-3 col-sm-12 text-center artist-page-album-art-container`}
					key={i}
					to={`/collection/${releaseTypes[i].collection.local_path}`}
				>
					<div className={`help-cursor artist-page-album-art-link ${-1 === i ? "description-large" : null}`}>
						<img alt={releaseTypes[i].name} src={releaseTypes[i].album_art} className="img-fluid artist-page-album-art" />
						<span className="artist-page-album-art-text colored-link white-text">
							{i}
						</span>
					</div>
				</Link>
			)
		})
	return (
		<div>
			<h1 className="header-sub-page">Collections</h1>
			<div className="row">
				<div className="col-10 offset-1">
					<div className="row">
						{mappedReleaseTypes}
						<Link
							className={`col-md-6 col-lg-4 col-xl-3 col-sm-12 text-center artist-page-album-art-container`}
							to={`/competitions`}
						>
							<div className={`help-cursor artist-page-album-art-link`}>
								<img alt={"competitions"} src={"/images/releases/WRC.jpg"} className="img-fluid artist-page-album-art" />
								<span className="artist-page-album-art-text colored-link white-text">
									Competitions
								</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
