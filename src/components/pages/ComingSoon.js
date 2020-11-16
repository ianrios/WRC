import React from "react";
import { Link } from 'react-router-dom'

export default function ComingSoon() {
	return (
		<div className="row">
			<div className="col-10 offset-1">
				<h1 className="header-sub-page">Coming Soon</h1>

				<p className='questrial'>For feature requests, please email us or send us a message on discord.</p>
				<p className='questrial'>Visit our <Link to="contact">contact page</Link> for more information.</p>
			</div>
		</div>
	)
}
