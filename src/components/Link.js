import React from 'react';
import './Link.scss';
import {
	Link,
	useLocation
} from "react-router-dom";
import Dot from './icons/Dot';
import Cube from './icons/Cube';
import Star from './icons/Star';
import Honeycomb from './icons/Honeycomb';
import Blockchain from './icons/Blockchain';
import Fingerprint from './icons/Fingerprint';

function titleCase(str) {
	return str.toLowerCase().split(' ').map(function (word) {
		return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
}

function chooseIcon({ iconHover, iconText, icon, to, location }) {
	if (iconHover && icon) {
		switch (icon) {
			case "Artists":
				return <Fingerprint
					className={`nav-icon ${location.pathname === to.toLowerCase() ? "nav-icon-active" : ""}`}
					height={"35px"}
					width={"35px"}
				/>
			case "Releases":
				return <Dot
					className={`nav-icon ${location.pathname === to.toLowerCase() ? "nav-icon-active" : ""}`}
					height={"35px"}
					width={"35px"}
				/>
			case "Collections":
				return <Honeycomb
					className={`nav-icon ${location.pathname === to.toLowerCase() ? "nav-icon-active" : ""}`}
					height={"35px"}
					width={"35px"}
				/>
			case "Store":
				return <Cube
					className={`nav-icon ${location.pathname === to.toLowerCase() ? "nav-icon-active" : ""}`}
					height={"35px"}
					width={"35px"}
				/>
			case "Nexus":
				return <Blockchain
					className={`nav-icon ${location.pathname === to.toLowerCase() ? "nav-icon-active" : ""}`}
					height={"35px"}
					width={"35px"}
				/>
			case "Contests":
				return <Star
					className={`nav-icon ${location.pathname === to.toLowerCase() ? "nav-icon-active" : ""}`}
					height={"35px"}
					width={"35px"}
				/>
			default:
				return null
		}
	}
	else {
		return iconText
	}
}

export default function LinkWrapper(props) {
	const text = titleCase(props.text);
	const location = useLocation();
	return (
		<Link
			className="link-icon-navbar"
			id={props.id}
			style={{
				paddingTop: '20px',
				textDecoration: 'none',
				fontSize: props.size,
			}}
			to={props.to.toLowerCase()}
		>
			<span className={`nav-link 
				${props.isText && "text-nav-icon"} 
				${location.pathname === props.to.toLowerCase() && "nav-link-active"}
				${props.qMark && "em2"}`}
			>
				{props.iconHover ? chooseIcon({ ...props, location }) : text}
			</span>
		</Link>
	);
}
