import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="banner"><div className="wrap">
      <h1>Page not found</h1>
      <p>The page you asked for does not exist. <Link href="/" style={{ textDecoration: 'underline' }}>Return home</Link>.</p>
    </div></div>
  )
}
