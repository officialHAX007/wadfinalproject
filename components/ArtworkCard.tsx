
import Link from 'next/link'
import { Artwork } from '@prisma/client'

export default function ArtworkCard({ a }:{ a: Artwork & { artist?: { name: string }}}){
  return (
    <div className="card flex flex-col gap-3">
      <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        {a.image ? <img src={a.image} alt={a.title} className="h-full w-full object-cover rounded-xl" /> : <span>No Image</span>}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{a.title}</h3>
          <p className="text-sm text-gray-600">{a.artist?.name || ''}</p>
        </div>
        <div className="text-right">
          <div className="font-semibold">${Number(a.price).toFixed(2)}</div>
          <div className="badge">{a.isAvailable ? 'Available' : 'Sold'}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Link href={`/artworks/${a.id}`} className="btn btn-outline">View</Link>
        <form action={`/api/cart/add`} method="post" className="ml-auto">
          <input type="hidden" name="artworkId" value={a.id} />
          <button className="btn btn-primary" disabled={!a.isAvailable}>Add to Cart</button>
        </form>
      </div>
    </div>
  )
}
