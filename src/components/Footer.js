import React from 'react'

export default function Footer() {
	return (
		<footer className="container py-5">
			<div className="row">
				<div className="col-12 col-md">
					<img src="/favicon.ico" width="24" height="24" className="d-block mb-2" />
					<small className="d-block mb-3 text-muted">© 2017-2018</small>
				</div>
				<div className="col-6 col-md">
					<h5>Features</h5>
					<ul className="list-unstyled text-small">
						<li><a className="text-muted" href="https://www.whyrecord.com">Cool stuff</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Random feature</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Team feature</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Stuff for developers</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Another one</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Last time</a></li>
					</ul>
				</div>
				<div className="col-6 col-md">
					<h5>Resources</h5>
					<ul className="list-unstyled text-small">
						<li><a className="text-muted" href="https://www.whyrecord.com">Resource</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Resource name</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Another resource</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Final resource</a></li>
					</ul>
				</div>
				<div className="col-6 col-md">
					<h5>Resources</h5>
					<ul className="list-unstyled text-small">
						<li><a className="text-muted" href="https://www.whyrecord.com">Business</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Education</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Government</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Gaming</a></li>
					</ul>
				</div>
				<div className="col-6 col-md">
					<h5>About</h5>
					<ul className="list-unstyled text-small">
						<li><a className="text-muted" href="https://www.whyrecord.com">Team</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Locations</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Privacy</a></li>
						<li><a className="text-muted" href="https://www.whyrecord.com">Terms</a></li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
