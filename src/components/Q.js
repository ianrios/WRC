import "./Q.scss";

export function Q(p) {
  return <span className={`q s-${p.s ? p.s : 1}`}>?</span>;
}
