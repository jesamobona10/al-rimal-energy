import Link from 'next/link'
import { Acc, ContactForm, Num, Reveal } from './ui'
import { P, href } from '../lib/data'

const S = ({ children }) => <section className="blk"><div className="wrap">{children}</div></section>
const H2 = ({ h }) => (h ? <Reveal as="h2">{h}</Reveal> : null)

export function Block({ b }) {
  switch (b.k) {
    case 'text':
      return <S><H2 h={b.h} />{b.b.map((x, i) => <Reveal as="p" key={i}>{x}</Reveal>)}{b.a && <Reveal><Link className="btn am" href={href(b.a[0])}>{b.a[1]}</Link></Reveal>}</S>
    case 'stats':
      return <S><div className="stats">{b.i.map((s, i) => <Reveal key={i} className="stat"><Num n={s[0]} d={s[1]} p={s[3]} s={s[4]} /><span>{s[2]}</span></Reveal>)}</div></S>
    case 'cards':
      return <S><H2 h={b.h} /><Reveal className="cards">{b.i.map((c) => <Link key={c[0]} className="card" href={href(c[0])}><h3>{c[1]}</h3><p>{c[2]}</p></Link>)}</Reveal></S>
    case 'acc':
      return <S><H2 h={b.h} /><Reveal><Acc items={b.i} /></Reveal></S>
    case 'tl':
      return <S><H2 h={b.h} /><Reveal as="ul" className="tl">{b.i.map((x) => <li key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></li>)}</Reveal></S>
    case 'cta':
      return <S><Reveal className="cta"><h2>{b.h}</h2><Link className="btn am" href={href(b.a[0])}>{b.a[1]}</Link></Reveal></S>
    case 'form':
      return <S><Reveal><ContactForm /></Reveal></S>
    default:
      return null
  }
}

export function Crumbs({ id }) {
  const chain = []
  for (let x = id; x; x = P[x].p) chain.unshift(x)
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {chain.map((k, i) => i === chain.length - 1
          ? <li key={k} aria-current="page">{P[k].t}</li>
          : <li key={k}><Link href={href(k)}>{P[k].t}</Link></li>)}
      </ol>
    </nav>
  )
}

export function Inner({ id }) {
  const p = P[id]
  return (
    <>
      <div className="banner"><div className="wrap"><Crumbs id={id} /><h1>{p.t}</h1><p>{p.intro}</p></div></div>
      {p.b.map((b, i) => <Block key={i} b={b} />)}
    </>
  )
}
