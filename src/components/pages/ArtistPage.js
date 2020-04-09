import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import Seo from "../Seo"
import releaseData from "../../constants/releaseData.json";
import artistData from "../../constants/artistData.json";
import "./ArtistPage.scss";

export default function ArtistPage() {
	const locationObj = useLocation();
	const locationPath = locationObj.pathname
	const location = locationPath.split("/")[2];
	const currArtist = artistData.find(i => i.local_path.toLowerCase() === location.toLowerCase());
	const foundArtist = currArtist === undefined ? false : true;

	const mappedPTag = (props, className) => {
		return (
			props.map((item, idx) => {
				return (
					<p
						key={idx}
						className={`questrial text-left ${className}`}
					>
						{item}
					</p>
				)
			})
		)
	}

	const mappedImgCol = (props) => {
		return props.map((a, i) => {
			return (
				<div className="col-4 col-md-3 text-center artist-page-album-art-container" key={i} >
					<Link to={`/release/${a.local_path}`} className="artist-page-album-art-link">
						<img alt={a.name} src={a.album_art} className="img-fluid artist-page-album-art" />
						<span className="artist-page-album-art-text colored-link white-text">
							{a.label_number}
						</span>
					</Link>
				</div>
			)
		})
	}
	const mappedATag = (props) => {
		const keys = Object.keys(props);
		return (
			keys.map((item, idx) => {
				return (
					<React.Fragment
						key={idx}
					>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={props[item]}>
							{item}
						</a>
						{
							idx < keys.length - 1 ? " - " : null
						}
					</React.Fragment>

				)
			})
		)
	}
	const [photoI, setPhotoI] = useState(0)
	const headData = {
		title: currArtist.name + " - WRC",
		shortSiteTitle: `${currArtist.name} Artist Page - WRC`,
		siteTitle: "WHY? Record Company",
		url: location.pathname,
		imgSrc: currArtist.photos[0],
		description: currArtist.quote,
		keywords: "why, record, company, music, edm, techno, idm, experimental, label, artist, " + currArtist.name
	}
	return (
		<React.Fragment>
			<div className="row main-header">
				<div className="col">
					<h1 className="header-sub-page">
						{foundArtist
							? currArtist.name
							: <>
								could not locate artist page
								<p>see <Link to="/contact">contact page</Link> for more information, or go back to the<Link to={"/artists"}> Main Artists Page</Link></p>
							</>
						}
					</h1>
				</div>
			</div>
			{
				foundArtist ?
					<React.Fragment>
						<Seo data={headData} />
						<div className="row">
							<div className="col-10 offset-1">
								<div className="row main-body">
									<div className="col-6">
										<img
											onClick={() => setPhotoI(photoI + 1)}
											className="artist-page-image img-fluid help-cursor"
											alt={currArtist.name}
											src={currArtist.photos[photoI % currArtist.photos.length]}
										/>
									</div>
									<div className="col-6">
										<p>
											{currArtist.quote}
										</p>
										{currArtist.body_paragraphs.length > 0 ?
											<div className="text-border d-none d-lg-block">
												{mappedPTag(currArtist.body_paragraphs, "artist-bio-paragraphs")}
											</div>
											: null
										}
										<div className="row">
											<div className="col-md-6">
												Social Platforms
										<div>
													{mappedATag(currArtist.social_platforms)}
												</div>
											</div>
											{Object.keys(currArtist.music_platforms).length > 0 ?
												<div className="col-md-6">
													Music Platforms
										<div>
														{mappedATag(currArtist.music_platforms)}
													</div>
												</div>
												: null
											}
										</div>
										<div className="row">
											<div className="col">
												<h5 className="h5-location-artist-page">
													{currArtist.location.city}, {currArtist.location.country}
												</h5>
											</div>
										</div>
										<div className="row">
											<div className="col">
												{currArtist.email
													? <a
														className="email-link"
														href={`mailto:${currArtist.email}?Subject=Hello%20${currArtist.name}`}
													>
														{currArtist.email}
													</a>
													: null
												}
											</div>
										</div>
									</div>
								</div>
								<div className="row d-block d-lg-none mt-5">
									<div className="col">
										{currArtist.body_paragraphs.length > 0 ?
											<div className="text-border">
												{mappedPTag(currArtist.body_paragraphs, "artist-bio-paragraphs")}
											</div>
											: null
										}
									</div>
								</div>
								<div className="row">
									<div className="col">
										<h1 className="header-second-row">
											Release Appearances
								</h1>
									</div>
								</div>
								<div className="row artist-page-releases">
									{mappedImgCol(releaseData.filter(i => {
										for (let j of i.primary_artist_ids) {
											if (j === currArtist.id) {
												return i
											}
										}
										for (let j of i.secondary_artist_ids) {
											if (j === currArtist.id) {
												return i
											}
										}
										for (let j of i.remix_artist_ids) {
											if (j === currArtist.id) {
												return i
											}
										}
										return null
									}))}

								</div>
							</div>
						</div>
					</React.Fragment>
					:
					null
			}
		</React.Fragment>

	)
}
