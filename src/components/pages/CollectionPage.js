import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Seo from "../Seo"
import releaseData from "../../constants/releaseData.json";
import artistData from "../../constants/artistData.json";
import collectionData from "../../constants/collectionData.json";
import "./CollectionPage.scss"

export default function CollectionPage() {
	const locationObj = useLocation();
	const location = locationObj.pathname.split("/")[2];
	const currCollection = collectionData.find(i => i.local_path.toLowerCase() === location.toLowerCase());
	const foundCollection = currCollection === undefined ? false : true;

	const newestRelease = {}

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
						<React.Fragment key={idx}>
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

	const headData = foundCollection && newestRelease ? {
		title: currCollection.title + " - WRC",
		shortSiteTitle: `${currCollection.title} Release Page - WRC`,
		siteTitle: "WHY? Record Company",
		url: location.pathname,
		imgSrc: newestRelease.album_art,
		description: currCollection.paragraphs.length > 0 ? currCollection.paragraphs[0] : "",
		keywords: "why, record, company, music, edm, techno, idm, experimental, label, release, " + currCollection.title
	} : {
			title: "Error Page not found - WRC",
			shortSiteTitle: `Collection page not found - WRC`,
			siteTitle: "WHY? Record Company",
			url: location.pathname,
			imgSrc: "error.jpg",
			description: "",
			keywords: "why, record, company, page not found"
		}

	return (
		<>
			<div className="row main-header">
				<div className="col">
					<h1 className="header-sub-page">{foundCollection ? foundCollection.title : <>could not locate collection page<p>see <Link to="/contact">contact page</Link> for more information, or go back to the<Link to={"/releases"}> Main Collections Page</Link></p></>}</h1>
				</div>
			</div>
			{
				foundCollection ?
					<>
						<Seo data={headData} />
						<div className="row">
							<div className="col-10 offset-1">
								<div className="row main-body">
									<div className="col-6">
										<img className="img-fluid" src={newestRelease.album_art} alt={`${newestRelease.name} Album Art`} />
									</div>
									<div className="col-6">
										<h4 className="release-page-h4">Primary Artist{newestRelease.primary_artist_ids.length > 1 ? "s" : ""}</h4>
										<div className="release-page-text-container primary-artist-release">
											{
												newestRelease.primary_artist_ids.map(
													(i, j) => {
														const currArtist = artistData.find(a => a.id === i);
														return (
															<React.Fragment key={j}>
																<Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
																	{currArtist.name}
																</Link>
																<span className="white-text">
																	{`${j < newestRelease.primary_artist_ids.length - 1 ? ", " : ""}`}
																</span>
															</React.Fragment>
														)
													}
												)
											}
										</div>
										{newestRelease.secondary_artist_ids.length > 0 ?
											<>
												<h4 className="release-page-h4">
													{`Additional Artist${newestRelease.secondary_artist_ids.length > 1 ? "s" : ""}`}
												</h4>
												<div className="release-page-text-container">
													{
														newestRelease.secondary_artist_ids.map(
															(i, j) => {
																const currArtist = artistData.find(a => a.id === i);
																return (
																	<React.Fragment key={j}>
																		<Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
																			{currArtist.name}
																		</Link>
																		<span className="white-text">
																			{`${j < newestRelease.secondary_artist_ids.length - 1 ? ", " : ""}`}
																		</span>
																	</React.Fragment>
																)
															}
														)
													}
												</div>
											</>
											: null
										}


										{newestRelease.remix_artist_ids.length > 0 ?
											<>
												<h4 className="release-page-h4">
													{`Remixer${newestRelease.remix_artist_ids.length > 1 ? "s" : ""}`}
												</h4>
												<div className="release-page-text-container">
													{
														newestRelease.remix_artist_ids.map(
															(i, j) => {
																const currArtist = artistData.find(a => a.id === i);
																return (
																	<React.Fragment key={j}>
																		<Link to={`/artist/${currArtist.local_path}`} className="smaller-font-temp">
																			{currArtist.name}
																		</Link>
																		<span className="white-text">
																			{`${j < newestRelease.remix_artist_ids.length - 1 ? ", " : ""}`}
																		</span>
																	</React.Fragment>
																)
															}
														)
													}
												</div>
											</>
											: null
										}

										<p>
											{newestRelease.short_description}
										</p>
										<div className="text-border d-none d-lg-block">
											{mappedPTag(newestRelease.release_bio, "release-bio-paragraphs")}
										</div>
										<p>
											Primary Genre:  {newestRelease.genre}
										</p>
										<p>
											Release Date: {newestRelease.release_date.split("T")[0]}

										</p>
										<div className="row">
											<div className="col">
												Music Platforms
												<div>
													{mappedATag(newestRelease.links)}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row d-block d-lg-none mt-3">
									<div className="col">
										<div className="text-border">
											{mappedPTag(newestRelease.release_bio, "release-bio-paragraphs")}
										</div>
									</div>
								</div>
							</div>
						</div >
					</>
					:
					null
			}
		</ >
	)
}
