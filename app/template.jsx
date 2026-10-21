// A template remounts on every navigation, so the CSS entrance animation replays per page.
export default function Template({ children }) {
  return <div className="page">{children}</div>
}
