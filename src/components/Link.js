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

function chooseIcon({ iconHover, iconText, icon, to, pathname }) {
	const lowTo = to.toLowerCase();
	const className = `nav-icon ${pathname === lowTo && "nav-icon-active"}`
	if (iconHover && icon) {
		switch (icon) {
			case "Artists":
				return <Fingerprint
					className={className}
					height={"35px"}
					width={"35px"}
				/>
			case "Releases":
				return <Dot
					className={className}
					height={"35px"}
					width={"35px"}
				/>
			case "Collections":
				return <Honeycomb
					className={className}
					height={"35px"}
					width={"35px"}
				/>
			case "Store":
				return <Cube
					className={className}
					height={"35px"}
					width={"35px"}
				/>
			case "Nexus":
				return <Blockchain
					className={className}
					height={"35px"}
					width={"35px"}
				/>
			case "Contests":
				return <Star
					className={className}
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
	const { pathname } = useLocation();
	const lowTo = props.to.toLowerCase();
	return (
		<Link
			className="link-icon-navbar"
			id={props.id}
			style={{
				paddingTop: '20px',
				textDecoration: 'none',
				fontSize: props.size,
			}}
			to={lowTo}
		>
			<span className={`nav-link 
				${props.isText && "text-nav-icon"} 
				${pathname === lowTo && "nav-link-active"}
				${props.qMark && "em2"}`}
			>
				{props.iconHover ? chooseIcon({ ...props, pathname }) : text}
			</span>
		</Link>
	)
}
