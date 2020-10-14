import React from "react";
import "./Contact.scss";
import { Link } from "react-router-dom";

export default function Contact() {
	return (
		<div className="row center-contact">
			<div className="col-10">
				<h1 className="header-sub-page">Contact</h1>
				<div className="questrial">
					<p >
						If the website does not load a page that should exist,
						first <Link to="/hard-reload">try this button</Link>,
						next, try closing all tabs,
						then, try a <a target="_blank" rel="noopener noreferrer" href="https://refreshyourcache.com/en/cache/">hard reload</a>,
						and finally, opening a new incognito tab.
						If none of that works, shoot us a message.
					</p>
					<p>You can send us an email at</p>
					<p>
						<a href={`mailto:admin@whyrecord.com`}>admin@whyrecord.com</a>
					</p>
					<p>or visit us on social media</p>
					<p>
						<a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/whyrecord">twitter</a>{" - "}
						<a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/whyrecordcompany">instagram</a>{" - "}
						<a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/WHYRecordCompany">facebook</a>
					</p>
					<p>If you would like to release on WRC, please fill out <a href="https://forms.gle/pDcYS2Kmd5rvDJVw8" target="_blank" rel="noopener noreferrer">this form</a> to submit a demo.</p>
				</div>
			</div>
		</div>
	)
}
