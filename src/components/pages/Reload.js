import React, { useState } from 'react'

export default function Reload() {
	const [btn, setBtn] = useState(0);

	return (
		<div>
			<h1 className="header-sub-page">Reload the page</h1>
			<button type="button" class="btn btn-secondary" onClick={() => {
				window.location.reload(true);
			}}> click the button to fix any caching errors</button>

		</div>
	)
}
