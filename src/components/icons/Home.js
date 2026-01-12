import React from 'react';

// Creative home icon - abstract compass/star representing "starting point"
export default function Home({ height, width, fillColor, className }) {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fillColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Four-pointed star/compass - represents "center" or "home base" */}
      <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
    </svg>
  );
}
