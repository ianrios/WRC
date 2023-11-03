import React from "react";

export default function Question({ height, width, fillColor }) {
  return (
    <svg height={height} width={width} viewBox="0 0 512 512" fill={fillColor}>
      <text fontSize="500" y="360" fontFamily="Times New Roman">
        ?
      </text>
    </svg>
  );
}
