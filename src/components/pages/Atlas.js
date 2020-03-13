import React from 'react'
import { Graph } from "react-d3-graph";
import data from "../../constants/d3.js"
import "./Atlas.scss"

export default function Atlas() {


	const myConfig = {
		nodeHighlightBehavior: true,
		node: {
			color: "#68a7ff",
			fontColor: "black",
			size: 120,
			highlightStrokeColor: "blue",
		},
		link: {
			color: "grey",
			highlightColor: "lightblue",
		},
	};

	const onClickGraph = function () {
		console.log(`Clicked the graph background`);
	};

	const onClickNode = function (nodeId) {
		console.log(`Clicked node ${nodeId}`);
	};

	const onDoubleClickNode = function (nodeId) {
		console.log(`Double clicked node ${nodeId}`);
	};

	const onRightClickNode = function (event, nodeId) {
		console.log(`Right clicked node ${nodeId}`);
	};

	const onMouseOverNode = function (nodeId) {
		console.log(`Mouse over node ${nodeId}`);
	};

	const onMouseOutNode = function (nodeId) {
		console.log(`Mouse out node ${nodeId}`);
	};

	const onClickLink = function (source, target) {
		console.log(`Clicked link between ${source} and ${target}`);
	};

	const onRightClickLink = function (event, source, target) {
		console.log(`Right clicked link between ${source} and ${target}`);
	};

	const onMouseOverLink = function (source, target) {
		console.log(`Mouse over in link between ${source} and ${target}`);
	};

	const onMouseOutLink = function (source, target) {
		console.log(`Mouse out link between ${source} and ${target}`);
	};

	const onNodePositionChange = function (nodeId, x, y) {
		console.log(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
	};
	return (
		<React.Fragment>
			<div className="row main-header">
				<div className="col">
					<h1 className="header-sub-page">Atlas</h1>
					<Graph
						id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
						data={data}
						config={myConfig}
						onClickNode={onClickNode}
						onDoubleClickNode={onDoubleClickNode}
						onRightClickNode={onRightClickNode}
						onClickGraph={onClickGraph}
						onClickLink={onClickLink}
						onRightClickLink={onRightClickLink}
						onMouseOverNode={onMouseOverNode}
						onMouseOutNode={onMouseOutNode}
						onMouseOverLink={onMouseOverLink}
						onMouseOutLink={onMouseOutLink}
						onNodePositionChange={onNodePositionChange}
					/>
				</div>
			</div>
		</React.Fragment>
	)
}
