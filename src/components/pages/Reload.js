import React from 'react';
import { Link } from "react-router-dom";

export default function Reload() {

	return (
		<div>
			<h1 className="header-sub-page">Click The Button</h1>
			<button type="button" class="btn btn-secondary mb-3" onClick={() => {
				window.location.reload(true);
			}}>Hard Reload Button</button>
			<h2>
				<Link to={"/"}>Back Home</Link>
			</h2>
		</div>
	)
}
