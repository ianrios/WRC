import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Seo from "../Seo"
import releaseData from "../../constants/releaseData.json";
import artistData from "../../constants/artistData.json";
import "./ReleasePage.scss"

export default function ReleasePage() {
	const locationObj = useLocation();
	const location = locationObj.pathname.split("/")[2];
	const currRelease = releaseData.find(i => i.local_path.toLowerCase() === location.toLowerCase());
	const foundRelease = currRelease === undefined ? false : true;

	const mappedPTag = (props, className) => {
		return (
			props.map((item, idx) => {
				let string = item.search("__BREAK__")
					? item.split("__BREAK__").map((i, j) => <>{i} <br /></>)
					: item
				return (
					<p
						key={idx}
						className={`questrial text-left ${className}`}
					>
						{string}
					</p>
				)
			})
		)
	}

	const mappedATag = (props) => {
		const keys = Object.keys(props);
		return (
			keys.map((item, idx) => {
				return (
					props[item] ?
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
						: null

				)
			})
		)
	}
	const headData = {
		title: currRelease.name + " - WRC",
		shortSiteTitle: `${currRelease.name} Release Page - WRC`,
		siteTitle: "WHY? Record Company",
		url: location.pathname,
		imgSrc: currRelease.album_art,
		description: currRelease.release_bio.length > 0 ? currRelease.release_bio[0] : "",
		keywords: "why, record, company, music, edm, techno, idm, experimental, label, release, " + currRelease.name
	}
	return (
		<React.Fragment>
			<div className="row main-header">
				<div className="col">
					<h1 className="header-sub-page">{foundRelease ? currRelease.name : <>could not locate release page<p>see <Link to="/contact">contact page</Link> for more information, or go back to the<Link to={"/releases"}> Main Releases Page</Link></p></>}</h1>
				</div>
			</div>
			{
				foundRelease ?
					<React.Fragment>
						<Seo data={headData} />
						<div className="row">
							<div className="col-10 offset-1">
								<div className="row main-body">
									<div className="col-6">
										<img className="img-fluid" src={currRelease.album_art} alt={`${currRelease.name} Album Art`} />
									</div>
									<div className="col-6">
										<h4 className="release-page-h4">Primary Artist{currRelease.primary_artist_ids.length > 1 ? "s" : ""}</h4>
										<div className="release-page-text-container primary-artist-release">
											{
												currRelease.primary_artist_ids.map(
													(i, j) => {
														const currArtist = artistData.find(a => a.id === i);
														return (
															<React.Fragment key={j}>
																<Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
																	{currArtist.name}
																</Link>
																<span className="white-text">
																	{`${j < currRelease.primary_artist_ids.length - 1 ? ", " : ""}`}
																</span>
															</React.Fragment>
														)
													}
												)
											}
										</div>
										{currRelease.secondary_artist_ids.length > 0 ?
											<React.Fragment>
												<h4 className="release-page-h4">
													{`Additional Artist${currRelease.secondary_artist_ids.length > 1 ? "s" : ""}`}
												</h4>
												<div className="release-page-text-container">
													{
														currRelease.secondary_artist_ids.map(
															(i, j) => {
																const currArtist = artistData.find(a => a.id === i);
																return (
																	<React.Fragment key={j}>
																		<Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
																			{currArtist.name}
																		</Link>
																		<span className="white-text">
																			{`${j < currRelease.secondary_artist_ids.length - 1 ? ", " : ""}`}
																		</span>
																	</React.Fragment>
																)
															}
														)
													}
												</div>
											</React.Fragment>
											: null
										}


										{currRelease.remix_artist_ids.length > 0 ?
											<React.Fragment>
												<h4 className="release-page-h4">
													{`Remixer${currRelease.remix_artist_ids.length > 1 ? "s" : ""}`}
												</h4>
												<div className="release-page-text-container">
													{
														currRelease.remix_artist_ids.map(
															(i, j) => {
																const currArtist = artistData.find(a => a.id === i);
																return (
																	<React.Fragment key={j}>
																		<Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
																			{currArtist.name}
																		</Link>
																		<span className="white-text">
																			{`${j < currRelease.remix_artist_ids.length - 1 ? ", " : ""}`}
																		</span>
																	</React.Fragment>
																)
															}
														)
													}
												</div>
											</React.Fragment>
											: null
										}

										<p>
											{currRelease.short_description}
										</p>
										<div className="text-border d-none d-lg-block">
											{mappedPTag(currRelease.release_bio, "release-bio-paragraphs")}
										</div>
										<p>
											Primary Genre:  {currRelease.genre}
										</p>
										<p>
											Release Date: {currRelease.release_date.split("T")[0]}

										</p>
										<div className="row">
											<div className="col">
												Music Platforms
												<div>
													{mappedATag(currRelease.links)}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row d-block d-lg-none mt-3">
									<div className="col">
										<div className="text-border">
											{mappedPTag(currRelease.release_bio, "release-bio-paragraphs")}
										</div>
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
					:
					null
			}
		</React.Fragment >
	)
}
