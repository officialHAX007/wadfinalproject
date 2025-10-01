
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ArtworkView({ params }:{ params: { id: string }}){
  const a = await prisma.artwork.findUnique({ where: { id: params.id }, include: { artist: true } })
  if(!a) return notFound()
  return (
    <div className="container-narrow">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
          {a.image ? <img src={a.image} alt={a.title} className="h-full w-full object-cover rounded-2xl" /> : <span>No Image</span>}
        </div>
        <div className="card">
          <h1 className="text-2xl font-bold">{a.title}</h1>
          <p className="text-gray-600">{a.artist?.name}</p>
          <div className="text-3xl font-semibold my-3">${Number(a.price).toFixed(2)}</div>
          <form method="post" action="/api/cart/add" className="flex gap-2">
            <input type="hidden" name="artworkId" value={a.id} />
            <button className="btn btn-primary" disabled={!a.isAvailable}>Add to Cart</button>
            <button formaction="/api/wishlist/toggle" className="btn btn-outline">Wishlist</button>
          </form>
          <p className="mt-4">{a.description}</p>
        </div>
      </div>
    </div>
  )
}
