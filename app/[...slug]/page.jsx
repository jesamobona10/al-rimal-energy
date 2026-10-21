import { notFound } from 'next/navigation'
import { P, idOf, ids, href } from '../../lib/data'
import { Inner } from '../../components/Blocks'

export const dynamicParams = false

export function generateStaticParams() {
  return ids.map((id) => ({ slug: href(id).slice(1).split('/') }))
}
export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = P[idOf(slug)]
  return p ? { title: p.t, description: p.intro } : {}
}
export default async function Page({ params }) {
  const { slug } = await params
  const id = idOf(slug)
  if (!P[id] || id === 'home') notFound()
  return <Inner id={id} />
}
