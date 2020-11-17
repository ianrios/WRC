import React from "react";
import Link from './Link';
import './Navbar.scss';

export default function Navbar(props) {
	const Links = {
		"Home": ["?", false],
		"Artists": ["Fingerprint", true],
		"Releases": ["Dot", true],
		"Collections": ["Honeycomb", true],
		"Contests": ["Star", true],
		// "Store": ["Cube", true],
		// "Nexus": ["Blockchain", true],
		"Contact": ["@", false],
	}
	const linkKeys = Object.keys(Links)

	const mappedLinks = linkKeys.map((item, idx) => {
		return (
			<Link
				key={idx}
				linksObj={Links}
				iconHover={true}
				icon={Links[item][1] && item}
				iconText={!Links[item][1] && Links[item][0] }
				size={"25px"}
				to={`/${item}`}
				id={idx}
				text={item}
				qMark={idx === 0}
				isText={!Links[item][1]}
				lastItem={idx === (linkKeys.length - 1)}
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
