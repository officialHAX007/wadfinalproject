
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default async function Artworks(){
  const items = await prisma.artwork.findMany({ include: { artist: true }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="container-narrow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Artworks</h2>
        <Link className="btn btn-primary" href="/artworks/new">New</Link>
      </div>
      <div className="grid gap-3">
        {items.map(a => (
          <div key={a.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-gray-600">{a.artist?.name}</div>
            </div>
            <div className="flex gap-2">
              <Link className="btn btn-outline" href={`/artworks/${a.id}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
