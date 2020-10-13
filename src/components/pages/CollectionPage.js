import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Seo from "../Seo"
import releaseData from "../../constants/releaseData.json";
import mixData from "../../constants/mixData.json";
import playlistData from "../../constants/playlistData.json";
import collectionData from "../../constants/collectionData.json";
import "./CollectionPage.scss"

export default function CollectionPage() {
	const locationObj = useLocation();
	const location = locationObj.pathname.split("/")[2];
	const currCollection = collectionData.find(i => i.local_path.toLowerCase() === location.toLowerCase());
	const foundCollection = currCollection === undefined ? false : true;

	let allData = [...releaseData, ...mixData, ...playlistData]

	const newestRelease = {}

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

	const mappedImgCol = (props) => {
		return props.map((c, i) => {
			return (
				<div className="col-4 col-md-3 text-center artist-page-album-art-container" key={i} >
					<Link to={`/release/${c.local_path}`} className="artist-page-album-art-link">
						<img alt={c.name} src={c.album_art} className="img-fluid artist-page-album-art" />
						<span className="artist-page-album-art-text colored-link white-text">
							{c.label_number}
						</span>
					</Link>
				</div>
			)
		})
	}

	const mappedPTag = (props, className) => {
		return (
			props.map((item, idx) => {
				return (
					<p
						key={idx}
						className={`questrial ${className}`}
					>
						{item}
					</p>
				)
			})
		)
	}

	return (
		<>
			<div className="row main-header">
				<div className="col">
					<h1 className="header-sub-page">{foundCollection ? currCollection.title : <>could not locate collection page<p>see <Link to="/contact">contact page</Link> for more information, or go back to the<Link to={"/releases"}> Main Collections Page</Link></p></>}</h1>
				</div>
			</div>
			{
				foundCollection ?
					<>
						<Seo data={headData} />
						<div className="row">
							<div className="col-10 offset-1">
								<div className="row">
									<div className="col text-center">
										{mappedPTag(currCollection.paragraphs)}
									</div>
								</div>
								<div className="row artist-page-releases">
									{mappedImgCol(allData.filter((a, b) => a.release_type === currCollection.short_title))}
								</div>
							</div>
						</div>
					</>
					: null
			}
		</>
	)
}
