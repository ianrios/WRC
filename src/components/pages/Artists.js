import React from 'react'
import { Link } from 'react-router-dom';
import artistData from "../../constants/artistData.json";
import './Artists.scss';

export default function Artists() {
	const ArtistsMap = artistData.map((item, idx) => {
		return item.show_on_artist_page ?
			<div key={idx} className="row artist-image-row">
				<div className="col-lg-6 col-md-8 col-sm-10 mx-auto text-on-image text-center">
					<Link
						to={`/artist/${item.local_path}`}
					>
						<img className="img-fluid" src={item.photos[0]} alt={item.name} />
						<span className="centered-text">{item.name}</span>
					</Link>
				</div>
			</div>
			: null
	})
	return (
		<>
			<h1 className="header-sub-page">Artists</h1>
			{ArtistsMap}
		</>
	)
}
