
import { prisma } from '@/lib/prisma'
export default async function NewArtwork(){
  const artists = await prisma.artist.findMany({ orderBy: { name: 'asc' } })
  return (
    <div className="container-narrow">
      <div className="card max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Create Artwork</h2>
        <form className="grid gap-3" method="post" action="/api/artworks">
          <input className="input" name="title" placeholder="Title" required />
          <textarea className="input" name="description" placeholder="Description" />
          <input className="input" name="image" placeholder="Image URL" />
          <input className="input" name="price" placeholder="Price" type="number" step="0.01" required />
          <label className="grid gap-1">
            <span className="label">Artist</span>
            <select className="input" name="artistId" required>
              <option value="">Select artist</option>
              {artists.map(a => (<option key={a.id} value={a.id}>{a.name}</option>))}
            </select>
          </label>
          <input className="input" name="tags" placeholder="Tags (comma separated)" />
          <label className="inline-flex items-center gap-2"><input type="checkbox" name="isAvailable" defaultChecked /> Available</label>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  )
}
