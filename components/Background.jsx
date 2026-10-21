'use client'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Three.js is loaded on the client only; the photo underneath is the fallback
// for reduced-motion users, devices without WebGL, and the moment before the scene loads.
const Scene = dynamic(() => import('./Scene'), { ssr: false })

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Background() {
  const home = (usePathname() || '/').replace(basePath, '') === '/'
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let gl = false
    try { const c = document.createElement('canvas'); gl = !!(c.getContext('webgl2') || c.getContext('webgl')) } catch (e) {}
    setOk(!reduce && gl)
  }, [])
  return (
    <div className={'bgwrap' + (home ? '' : ' inner')} aria-hidden="true">
      <div className="bgimg" style={{ backgroundImage: `url(${basePath}/yard.jpg)` }} />
      {ok && <Scene />}
      <div className="shade" />
      <div className="dim" />
    </div>
  )
}
