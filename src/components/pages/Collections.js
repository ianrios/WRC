import React, { useState } from 'react'
import releaseData from "../../constants/releaseData.json";
import "./Collections.scss"
import collectionData from "../../constants/collectionData.json"

export default function Collections() {
	const [mason, setMason] = useState(-1)
	let releaseTypes = {}
	releaseData.map(i => !(i.release_type in releaseTypes) ? releaseTypes[i.release_type] = i : null)
	const mappedReleaseTypes = Object.keys(releaseTypes)
		.sort((a, b) => {
			if (a === "Independent") return 1
			if (b === "Independent") return -1
			return a < b
		})
		.map(i => {
			const collectionInfo = collectionData[i]
			return (
				<div
					className={`col-${mason === i ? "8" : "4"} col-md-${mason === i ? "6" : "3"} text-center artist-page-album-art-container`}
					key={i}
					onClick={() => setMason(i === mason ? -1 : i)}
				>
					<div className={`help-cursor artist-page-album-art-link ${mason === i ? "description-large" : null}`}>
						<img alt={releaseTypes[i].name} src={releaseTypes[i].album_art} className="img-fluid artist-page-album-art" />
						<span className="artist-page-album-art-text colored-link white-text">
							{i}
						</span>
					</div>
					<div className={`${mason === i ? "collection-info" : "info-hide"}`}>
						<h3>{collectionInfo.title}</h3>
						{collectionInfo.paragraphs.map(j=>{
							return(
								<p className="questrial">{j}</p>
							)
						})}
					</div>
				</div>
			)
		})
	return (
		<div>
			<h1 className="header-sub-page">Collections</h1>
			<div className="row">
				<div className="col-10 offset-1">
					<div className="row">
						{mappedReleaseTypes}
					</div>
				</div>
			</div>
		</div>
	)
}
