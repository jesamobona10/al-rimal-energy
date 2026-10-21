import Link from 'next/link'
import { P, ST } from '../lib/data'
import { Block } from '../components/Blocks'

const HOME = [
  { k: 'stats', i: ST },
  { k: 'cards', h: 'What we do', i: P.operations.b[0].i },
  { k: 'text', h: 'Producing responsibly', b: ['We are cutting flaring, investing in carbon capture and building the hydrogen supply chain, with safety as the first measure of every project.'], a: ['sustainability', 'Our commitments'] },
  { k: 'cards', h: 'Latest news', i: P.news.b[0].i },
  { k: 'cta', h: 'Build your career with us.', a: ['careers', 'See open roles'] },
]
const Ic = ({ children }) => <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="wrap hero-copy">
          <h1>Energy for the Kingdom, and for the decades ahead.</h1>
          <p>Al-Rimal Energy explores, refines and ships the oil and petrochemicals that power industry across three continents.</p>
          <Link className="btn" href="/contact">Request a quote</Link>
        </div>
        <div className="wrap feat">
          <div><Ic><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" /></Ic><span>Crude and refined products</span></div>
          <div><Ic><rect x="2" y="7" width="11" height="8" /><path d="M13 10h4l3 3v2h-7" /><circle cx="6" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></Ic><span>Pipeline and tanker logistics</span></div>
          <div><Ic><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></Ic><span>Export terminals on three coasts</span></div>
          <div><Ic><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /></Ic><span>Round-the-clock safety monitoring</span></div>
        </div>
      </div>
      {HOME.map((b, i) => <Block key={i} b={b} />)}
    </>
  )
}
