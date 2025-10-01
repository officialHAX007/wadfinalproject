
import { prisma } from '@/lib/prisma'
import ConfirmButton from '@/components/ConfirmButton'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditArtwork({ params }:{ params: { id: string }}){
  const a = await prisma.artwork.findUnique({ where: { id: params.id } })
  if(!a) return notFound()
  return (
    <div className="container-narrow">
      <div className="card max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Artwork</h2>
        <form className="grid gap-3" method="post" action={`/api/artworks/${a.id}`}>
          <input className="input" name="title" defaultValue={a.title} />
          <textarea className="input" name="description" defaultValue={a.description||''} />
          <input className="input" name="image" defaultValue={a.image||''} />
          <input className="input" name="price" type="number" step="0.01" defaultValue={String(a.price)} />
          <input className="input" name="tags" defaultValue={(a.tags||[]).join(', ')} />
          <label className="inline-flex items-center gap-2"><input type="checkbox" name="isAvailable" defaultChecked={a.isAvailable} /> Available</label>
          <div className="flex gap-2">
            <button className="btn btn-primary">Save</button>
            <ConfirmButton onConfirm={()=>{
              fetch(`/api/artworks/${a.id}`, { method: 'DELETE' }).then(()=>location.href='/artworks')
            }}>Delete</ConfirmButton>
            <Link href="/artworks" className="btn btn-outline">Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
