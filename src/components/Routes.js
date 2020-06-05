import React from 'react'
import {
	Switch,
	Route,

} from "react-router-dom";
import Artists from './pages/Artists';
import ArtistPage from "./pages/ArtistPage";
import Collections from './pages/Collections';
import CollectionPage from "./pages/CollectionPage";
import Releases from './pages/Releases';
import ReleasePage from "./pages/ReleasePage";
import Services from './pages/Services';
import Store from './pages/Merchandise';
import Atlas from './pages/Atlas';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ReloadPage from "./pages/Reload";
import CookiePolicy from "./pages/CookiePolicy";
import ComingSoon from "./pages/ComingSoon";

export default function Routes() {

	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/artists">
				<Artists />
			</Route>
			<Route path="/artist/*">
				<ArtistPage />
			</Route>
			<Route path="/collections">
				<Collections />
			</Route>
			<Route path="/collection/*">
				<CollectionPage />
			</Route>
			<Route path="/releases">
				<Releases />
			</Route>
			<Route path="/release/*">
				<ReleasePage />
			</Route>
			<Route path="/services">
				<Services />
			</Route>
			<Route path="/store">
				<Store />
			</Route>
			<Route exact path="/contact">
				<Contact />
			</Route>
			<Route path="/atlas">
				<Atlas />
			</Route>
			<Route path="/hard-reload">
				<ReloadPage />
			</Route>
			<Route path="/cookie-policy">
				<CookiePolicy />
			</Route>
			<Route path="/coming-soon">
				<ComingSoon />
			</Route>
			<Route path="*">
				<Home />
			</Route>
		</Switch>
	)
}
