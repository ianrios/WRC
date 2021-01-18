import React from 'react';

export default function Dot({ height, width, fillColor }) {
	return (
		<svg
			height={height}
			width={width}
			viewBox="0 0 341.333 341.333"
			fill={fillColor}
		>
			<path d="M170.667,0C76.41,0,0,76.41,0,170.667s76.41,170.667,170.667,170.667s170.667-76.41,170.667-170.667S264.923,0,170.667,0zM170.667,298.667c-70.692,0-128-57.308-128-128s57.308-128,128-128s128,57.308,128,128S241.359,298.667,170.667,298.667z" />
		</svg>
	)
}