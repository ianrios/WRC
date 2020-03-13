import React from 'react';
import { Link } from "react-router-dom";

export default function Reload() {

	return (
		<div className="row center-contact ">
			<div className="col-10">
				<h1 className="header-sub-page">Click The Button</h1>
				<p className="questrial">If this button does not fix the cache clearing bug with the service worker, try clearing your application data, doing a hard reload.</p>
				<p className="questrial">(<code>cmd+shift+r</code> on mac or <code>ctrl+shift+r</code> on windows)</p>
				<button type="button" class="btn btn-secondary mb-3" onClick={() => {
					window.location.reload(true);
				}}>Hard Reload Button</button>
				<h2>
					<Link to={"/"}>Back Home</Link>
				</h2>
			</div>
		</div>
	)
}
