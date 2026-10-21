import Link from 'next/link'
import { NAV, P, href } from '../lib/data'

const OPS = ['ops-upstream', 'ops-downstream', 'ops-petrochemicals', 'ops-trading']

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div><b style={{ color: '#F2F3F1', fontSize: '1.1rem' }}>Al-Rimal Energy</b><p style={{ maxWidth: '34ch' }}>Energy for the Kingdom, and for the decades ahead.</p></div>
          <div><h4>Company</h4><ul>{NAV.map(([id, t]) => <li key={id}><Link href={'/' + id}>{t}</Link></li>)}</ul></div>
          <div><h4>Operations</h4><ul>{OPS.map((k) => <li key={k}><Link href={href(k)}>{P[k].t}</Link></li>)}</ul></div>
          <div><h4>Get in touch</h4><ul><li><Link href="/contact">Contact us</Link></li><li><Link href="/careers">Careers</Link></li><li><Link href="/investors">Investor relations</Link></li></ul></div>
        </div>
        <div className="fb">© 2026 Al-Rimal Energy. Concept website; company name and figures are illustrative.</div>
      </div>
    </footer>
  )
}
