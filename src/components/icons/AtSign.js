import React from 'react';

export default function AtSign({ height, width, fillColor }) {
    return (
        <svg
            height={height}
            width={width}
            viewBox="0 0 512 512"
            fill={fillColor}
        >
            <text font-size="500" y="360" font-family="Times New Roman">@</text>
        </svg>
    )
}