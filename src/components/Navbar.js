import React from "react";
import Link from './Link';
import './Navbar.scss';

export default function Navbar(props) {
	const Links = {
		"Home": ["?", false],
		"Artists": ["Fingerprint", true],
		"Releases": ["Dot", true],
		"Collections": ["Honeycomb", true],
		// "Store": ["Cube", true],
		// "Atlas": ["Blockchain", true],
		"Contact": ["@", false],
	}
	const mappedLinks = Object.keys(Links).map((item, idx) => {
		return (
			<Link
				key={idx}
				linksObj={Links}
				iconHover={true}
				icon={Links[item][1] ? item : false}
				iconText={!Links[item][1] ? Links[item][0] : null}
				size={"25px"}
				to={`/${item}`}
				id={idx}
				text={item}
				qMark={idx === 0 ? true : false}
				isText={!Links[item][1]}
				lastItem={idx === (Object.keys(Links).length - 1)}
			/>
		)
	})
	return (
		<div className="navbar position-fixed">
			<div className="links">
				{mappedLinks}
			</div>
		</div>
	)
}
