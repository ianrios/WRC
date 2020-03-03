import React from 'react'
import {
	Switch,
	Route,
} from "react-router-dom";
import Artists from './pages/Artists';
import Releases from './pages/Releases';
import Services from './pages/Services';
import Store from './pages/Merchandise';
import Atlas from './pages/Atlas';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Series from './pages/Series';
import ReleasePage from "./pages/ReleasePage";
import ArtistPage from "./pages/ArtistPage";
import ReloadPage from "./pages/Reload";

export default function Routes() {

	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/artists">
				<Artists />
			</Route>
			<Route path="/releases">
				<Releases />
			</Route>
			<Route path="/services">
				<Services />
			</Route>
			<Route path="/store">
				<Store />
			</Route>
			<Route path="/contact">
				<Contact />
			</Route>
			<Route path="/atlas">
				<Atlas />
			</Route>
			<Route path="/series">
				<Series />
			</Route>
			<Route path="/artist/*">
				<ArtistPage />
			</Route>
			<Route path="/release/*">
				<ReleasePage />
			</Route>
			<Route path="/hard-reload">
				<ReloadPage />
			</Route>
			<Route path="*">
				<Home />
			</Route>
		</Switch>
	)
}
