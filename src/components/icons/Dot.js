import React from '../../../node_modules/react';

export default function Dot(props) {
	return (
		<svg
			height={props.height}
			width={props.width}
			style={{ fill: props.fillColor }}
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			enableBackground="new 0 0 341.333 341.333"
			y="0px" 
			viewBox="0 0 341.333 341.333"
		>
			<path d="M170.667,0C76.41,0,0,76.41,0,170.667s76.41,170.667,170.667,170.667s170.667-76.41,170.667-170.667S264.923,0,170.667,0zM170.667,298.667c-70.692,0-128-57.308-128-128s57.308-128,128-128s128,57.308,128,128S241.359,298.667,170.667,298.667z" />
		</svg>
	)
}