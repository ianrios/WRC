import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ArtistProfile from "./ArtistProfile"
import ArtistLinktree from "./ArtistLinktree"
import "./ArtistPage.scss";

export default function ArtistPage() {

	let { path, 
		// url
	 } = useRouteMatch();	

	return (
		<>
			<Switch>
				<Route exact path={[`${path}/:artist_name/profile`, `${path}/:artist_name` ]}>
					<ArtistProfile />
				</Route>
				<Route path={`${path}/:artist_name/linktree`}>
					<ArtistLinktree />
				</Route>
			</Switch>
		</>
	)

}
