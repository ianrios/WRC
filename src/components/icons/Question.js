export function Question({ height, width, fillColor, className }) {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 24 24"
      fill={fillColor}
      className={className}
    >
      <path d="M12 4C9.79 4 8 5.79 8 8h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4zm-1 12v2h2v-2h-2z" />
    </svg>
  );
}
