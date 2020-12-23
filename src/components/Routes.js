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
import Contests from "./pages/Contests";
import ContestPage from "./pages/ContestPage";
import Services from './pages/Services';
import Store from './pages/Merchandise';
import Nexus from './pages/Nexus';
import Errors from './pages/Errors';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ReloadPage from "./pages/Reload";
import CookiePolicy from "./pages/CookiePolicy";
import ComingSoon from "./pages/ComingSoon";
import Software from "./pages/Software";
import ThankYou from "./pages/ThankYou";

export default function Routes() {

	return (
		<Switch>
			{/* Site Index */}
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/artists">
				<Artists />
			</Route>
			<Route path="/artist/:name">
				<ArtistPage />
			</Route>
			<Route path="/releases">
				<Releases />
			</Route>
			<Route path="/release/:name">
				<ReleasePage />
			</Route>
			<Route path="/collections">
				<Collections />
			</Route>
			<Route path="/collection/:name">
				<CollectionPage />
			</Route>
			<Route path="/contests">
				<Contests />
			</Route>
			<Route path="/contest/:name">
				<ContestPage />
			</Route>
			{/* Resources */}
			<Route path="/cookie-policy">
				<CookiePolicy />
			</Route>
			<Route path="/hard-reload">
				<ReloadPage />
			</Route>
			<Route path="/errors">
				<Errors />
			</Route>
			{/* About */}
			<Route exact path="/contact">
				<Contact />
			</Route>
			<Route path="/nexus">
				<Nexus />
			</Route>
			<Route path="/coming-soon">
				<ComingSoon />
			</Route>
			<Route path="/services">
				<Services />
			</Route>
			<Route path="/store">
				<Store />
			</Route>
			<Route path="/software">
				<Software />
			</Route>
			<Route path="/thanks/:year">
				<ThankYou />
			</Route>
			<Route path="*">
				<Home />
			</Route>
		</Switch>
	)
}
