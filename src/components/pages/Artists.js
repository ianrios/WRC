import React from 'react'
import { Link } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import artistData from "../../constants/artistData.json";
import './Artists.scss';

const filteredData = artistData.filter(item => item.show_on_artist_page)


function rowRenderer({
	key, // Unique key within array of rows
	index, // Index of row within collection
	isScrolling, // The List is currently being scrolled
	isVisible, // This row is visible within the List (eg it is not an overscanned row)
	style, // Style object to be applied to row (to position it)
}) {

	const item = filteredData[index]

	return (
		<div key={key} className="row artist-image-row" style={style}>
			<div className="col-lg-6 col-md-8 col-sm-10 mx-auto text-on-image text-center">
				<Link
					to={`/artist/${item.local_path}`}
				>
					<img className="img-fluid" src={item.photos[0]} alt={item.name} />
					<span className="centered-text">{item.name}</span>
				</Link>
			</div>
		</div>
	)
}

export default function Artists() {
	const ArtistsMap = <AutoSizer>
    {({height, width}) => (<List
		width={width}
		height={height}
		rowCount={filteredData.length}
		rowHeight={700}
		rowRenderer={rowRenderer}
	/> )}
	</AutoSizer>

	return (
		<>
		{/* <div style={{marginBotom:"650px"}}> */}
			<h1 className="header-sub-page">Artists</h1>
			{ArtistsMap}
		{/* </div> */}
		</>
		)
}
