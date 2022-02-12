import React from 'react'
import { Link } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent';
import Question from './icons/Question';

export default function Footer(props) {
	return (
		<footer className="container py-5" style={{marginTop:'100vh'}}>
			<CookieConsent>
				This website uses cookies to enhance the user experience.{" "}
				<span style={{ fontSize: "10px" }}>
					If you would rather not give google analytics your data, visit us on social media instead!
    			</span>
			</CookieConsent>
			<div className="row">
				<div className="col-12 col-md">
					<small className="d-block mb-3 text-muted">
						<Question
							className="mb-1"
							height={"24px"}
							width={"24px"}
							fillColor={"white"}
						/>
					</small>
					<small className="d-block mb-3 text-muted">
						© 2021 WHY? Record Company (WRC)
					</small>
				</div>
				<div className="col-6 col-md">
					<h5>Site Index</h5>
					<ul className="list-unstyled text-small">
						<li><Link className="text-muted" to="/home">Home</Link></li>
						<li><Link className="text-muted" to="/artists">Artists</Link></li>
						<li><Link className="text-muted" to="/releases">Releases</Link></li>
						<li><Link className="text-muted" to="/collections">Collections</Link></li>
						<li><Link className="text-muted" to="/contests">Contests</Link></li>
						<li><Link className="text-muted" to="/store">Store</Link></li>
						{/* <li><Link className="text-muted" to="/coming-soon">Software</Link></li> */}
					</ul>
				</div>
				<div className="col-6 col-md">
					<h5>Resources</h5>
					<ul className="list-unstyled text-small">
						<li>
							<a className="text-muted" target="_blank"
								rel="noopener noreferrer" href="https://firebase.google.com/policies/analytics">
								Privacy Policy
							</a>
						</li>
						<li>
							<a className="text-muted" target="_blank"
								rel="noopener noreferrer" href="https://firebase.google.com/terms">
								Terms of Use
							</a>
						</li>
						<li><Link className="text-muted" to="/cookie-policy">Cookie Policy</Link></li>
						<li><Link className="text-muted" to="/hard-reload">Cache Clear</Link></li>
						<li><Link className="text-muted" to="/errors">Errors</Link></li>
					</ul>
				</div>
				<div className="col-6 col-md">
					<h5>About</h5>
					<ul className="list-unstyled text-small">
						<li><Link className="text-muted" to="/contact">Contact</Link></li>
						<li><Link className="text-muted" to="/nexus">Nexus</Link></li>
						<li><Link className="text-muted" to="/coming-soon">Coming Soon</Link></li>
						{/* <li><Link className="text-muted" to="/coming-soon">Team</Link></li> */}
						{/* <li><Link className="text-muted" to="/coming-soon">Services</Link></li> */}
					</ul>
				</div>
				<div className="col-6 col-md">
					<img
						src="/whiteLogoSmall.png"
						className="img-fluid"
						alt="logo"
						onClick={() => props.setViewMain(!props.viewMain)}
					/>
				</div>
			</div>
		</footer>
	)
}
