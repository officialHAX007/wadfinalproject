import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

export default function NewProductGate() {
  const session = getSession()
  if (!session || session.role !== "seller") {
    redirect("/login?next=/products/new&reason=seller_only")
  }

  // --- your existing client form stays exactly as you have it ---
  // Make sure your form posts to /api/products with encType="multipart/form-data"
  return (
    <div className="container max-w-lg py-12">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form action="/api/products" method="post" encType="multipart/form-data" className="grid gap-4">
        <input name="title" placeholder="Title" className="input w-full" required />
        <textarea name="description" placeholder="Description" className="textarea w-full" required />
        <input type="file" name="image" className="file-input w-full" required />
        <input name="price" placeholder="Price" type="number" step="0.01" className="input w-full" required />
        <input name="tags" placeholder="Tags (comma separated)" className="input w-full" />
        <label className="flex items-center gap-2"><input type="checkbox" name="available" defaultChecked /> Available</label>

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary">Create</button>
          <a href="/products" className="btn btn-outline">Cancel</a>
        </div>
      </form>
    </div>
  )
}
