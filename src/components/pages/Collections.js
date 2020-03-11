import React from 'react'
import releaseData from "../../constants/releaseData.json";

export default function Collections() {
	let releaseTypes = {}
	releaseData.map(i => !(i.release_type in releaseTypes) ? releaseTypes[i.release_type] = i : null)
	const mappedReleaseTypes = Object.keys(releaseTypes)
		.sort()
		.map(i => {
			return (
				<div className="col-4 col-md-3 text-center artist-page-album-art-container" key={i} >

					<div
						className="help-cursor artist-page-album-art-link"
					>
						<img alt={releaseTypes[i].name} src={releaseTypes[i].album_art} className="img-fluid artist-page-album-art" />
						<span className="artist-page-album-art-text colored-link white-text">
							{i}
						</span>
					</div>
				</div>
			)
		})

	return (
		<div>
			<h1 className="header-sub-page">Collections</h1>
			<div className="row">
				{mappedReleaseTypes}
			</div>
		</div>
	)
}
