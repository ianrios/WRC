import React from 'react';

export default function Hamburger({ height, width, fillColor }) {
	return (
		<svg
			height={height}
			width={width}
			viewBox="-34 0 512 512"
			fill={fillColor}
		>
			<path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/>
		</svg>
	)
}