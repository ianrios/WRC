import React, { useState } from 'react'
import { Graph } from "react-d3-graph";
import _ from 'lodash'
import d3data from "../../constants/d3.js"
import { mappedD3ArtistTags as ALink } from '../../utilities/maps'
import "./Nexus.scss"

export default function Nexus() {

  const [name, setName] = useState('');
  const [clickLock, setClickLock] = useState(false);

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
    d3: {
      "gravity": -200
    },
    automaticRearrangeAfterDropNode: true

  };
  const onMouseOverNode = function (nodeId) {
    console.log(`Mouse over node ${nodeId}`);
    if (!clickLock) {
      setName(nodeId)
    }
  };

  const onMouseOutNode = function (nodeId) {
    console.log(`Mouse out node ${nodeId}`);
    if (!clickLock) {
      setName('')
    }
  };

  const onDoubleClickNode = function (nodeId) {
    console.log(`Double clicked node ${nodeId}`);
    setClickLock(!clickLock)
    setName(nodeId)
  };

  const onClickNode = function (nodeId) {
    console.log(`Clicked node ${nodeId}`);
    setName(nodeId)
  };

  const onClickGraph = function () {
    console.log(`Clicked the graph background`);
  };


  const onRightClickNode = function (event, nodeId) {
    console.log(`Right clicked node ${nodeId}`);
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

  const color = clickLock ? 'red' : 'blue';
  let collabsWith = {};
  let hasFeaturesBy = {};
  let isFeaturedBy = {};
  let remixed = {};
  let remixedBy = {};
  if (name) {
    _.map(d3data.linkObj, (value, key) => {
      const keyData = JSON.parse(key);
      if (keyData.source === name) {
        if ('sourceCollabedWith' in value) {
          if (keyData.target in collabsWith) {
            collabsWith[keyData.target]++
          } else {
            collabsWith[keyData.target] = 1
          }
        }
        if ('sourceRemixed' in value) {
          if (keyData.target in remixed) {
            remixed[keyData.target]++
          } else {
            remixed[keyData.target] = 1
          }
        }
        if ('sourceFeaturedOn' in value) {
          if (keyData.target in isFeaturedBy) {
            isFeaturedBy[keyData.target]++
          } else {
            isFeaturedBy[keyData.target] = 1
          }
        }
      }
      if (keyData.target === name) {
        if ('sourceCollabedWith' in value) {
          if (keyData.source in collabsWith) {
            collabsWith[keyData.source]++
          } else {
            collabsWith[keyData.source] = 1
          }
        }
        if ('sourceRemixed' in value) {
          if (keyData.source in remixedBy) {
            remixedBy[keyData.source]++
          } else {
            remixedBy[keyData.source] = 1
          }
        }
        if ('sourceFeaturedOn' in value) {
          if (keyData.source in hasFeaturesBy) {
            hasFeaturesBy[keyData.source]++
          } else {
            hasFeaturesBy[keyData.source] = 1
          }
        }
      }
    })
  }

  const mappedCW = ALink(collabsWith)
  const mappedFB = ALink(hasFeaturesBy)
  const mappedIF = ALink(isFeaturedBy)
  const mappedRM = ALink(remixed)
  const mappedRB = ALink(remixedBy)

  // console.log({
  //   mappedCW,
  //   mappedFB,
  //   mappedIF,
  //   mappedRM,
  //   mappedRB
  // })

  return (

    <div className="row main-header nexus-page">
      <div className="col nivo-wrapper">
        <h1 className="header-sub-page">Nexus of Artists</h1>
        <h5>All artists whose paths have crossed either via collaborations, remixes, or compilations</h5>
        <h5>Hover over or click a node to see brief info, or double click to <span className={color}>{clickLock ? 'unlock' : 'lock'}</span> the node</h5>
        <div className="row">
          <div className="col-md-9 col-sm-12">
            <Graph
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={d3data}
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
          <div className="col-md-3 col-sm-12 text-border node-info">
            node info
						{name ?
              <>
                <div className="row">
                  <div className="col questrial">
                    {name}
                  </div>
                </div>
                <hr style={{ borderColor: 'white' }} />
                <div className="row questrial email-link">
                  {_.size(collabsWith) > 0 && <div className="col-12">has collaborations with {ALink(collabsWith)}<hr /></div>}
                  {_.size(hasFeaturesBy) > 0 && <div className="col-12">has features by {ALink(hasFeaturesBy)}<hr /></div>}
                  {_.size(isFeaturedBy) > 0 && <div className="col-12">is featured by {ALink(isFeaturedBy)}<hr /></div>}
                  {_.size(remixed) > 0 && <div className="col-12">remixed {ALink(remixed)}<hr /></div>}
                  {_.size(remixedBy) > 0 && <div className="col-12">is remixed by {ALink(remixedBy)}<hr /></div>}
                </div>
              </>
              : <div className="questrial">Hover or click on a node to learn more</div>}
          </div>
        </div>
      </div>
    </div>
  )
}