'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { NAV } from '../lib/data'

export function Header() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => { document.body.classList.toggle('nav-open', open) }, [open])
  const cur = (id) => (path === '/' + id || path.startsWith('/' + id + '/') ? 'page' : undefined)
  return (
    <header>
      <div className="wrap">
        <Link className="logo" href="/" aria-label="Al-Rimal Energy home">
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2c1 6 8 9 8 17a8 8 0 0 1-16 0c0-4 2-6 4-8 0 3 1 4 2 4 1-5-1-8 2-13z" fill="#E0900A" /></svg>
          Al-Rimal Energy
        </Link>
        <button className="burger" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>Menu</button>
        <nav id="nav" aria-label="Main">
          {NAV.map(([id, t]) => <Link key={id} href={'/' + id} aria-current={cur(id)}>{t}</Link>)}
          <Link className="q" href="/contact" aria-current={cur('contact')}>Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export function Reveal({ as: T = 'div', className = '', children, ...p }) {
  const r = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const e = r.current
    if (!e) return
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(e)
    return () => io.disconnect()
  }, [])
  return <T ref={r} className={'rv ' + (on ? 'in ' : '') + className} {...p}>{children}</T>
}

export function Num({ n, d = 0, p = '', s = '' }) {
  const r = useRef(null)
  const [v, setV] = useState(n)
  useEffect(() => {
    if (!n || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setV(0)
    let raf
    const io = new IntersectionObserver(([x]) => {
      if (!x.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t) => {
        const q = Math.min((t - t0) / 1400, 1)
        setV(n * (1 - Math.pow(1 - q, 3)))
        if (q < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(r.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [n])
  return <b ref={r}>{p}{v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}{s ? (s === '%' ? '' : ' ') + s : ''}</b>
}

export function Acc({ items }) {
  const u = useId()
  const [open, setOpen] = useState({})
  return (
    <div className="acc">
      {items.map(([q, a], i) => {
        const o = !!open[i]
        return (
          <div key={i} className={'acc-i' + (o ? ' open' : '')}>
            <h3 style={{ margin: 0 }}>
              <button className="acc-b" id={u + 'b' + i} aria-expanded={o} aria-controls={u + 'p' + i} onClick={() => setOpen({ ...open, [i]: !o })}>{q}</button>
            </h3>
            <div className="acc-p" id={u + 'p' + i} role="region" aria-labelledby={u + 'b' + i} inert={!o}><div><p>{a}</p></div></div>
          </div>
        )
      })}
    </div>
  )
}

export function ContactForm() {
  const [ok, setOk] = useState(false)
  return (
    <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); setOk(true) }}>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Message<textarea name="msg" required /></label>
      <button className="btn am" type="submit">Send message</button>
      {ok && <p id="ok" role="status" style={{ display: 'block' }}>Thanks, we will reply within two working days.</p>}
    </form>
  )
}
