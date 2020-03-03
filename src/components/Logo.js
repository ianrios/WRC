import React from 'react'

export default function Logo(props) {
	return (
		<div className="row main-footer">
			<div className="col">
				<img
					src="/WRCLabel.png"
					className="logo float-right"
					alt="logo"
					onClick={() => props.setViewMain(!props.viewMain)}
				/>
			</div>
		</div>
	)
}
