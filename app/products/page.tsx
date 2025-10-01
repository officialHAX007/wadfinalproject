import { getAllMockProducts } from "@/lib/mock-products"

export const dynamic = "force-dynamic"

export default function ProductsPage() {
  const products = getAllMockProducts()

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="card flex flex-col gap-3">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">{p.title}</div>
              <div className="font-semibold">${p.price.toFixed(2)}</div>
            </div>
            <form action="/api/cart/add" method="post" className="mt-auto">
              <input type="hidden" name="artworkId" value={p.id} />
              <input type="hidden" name="title" value={p.title} />
              <input type="hidden" name="price" value={String(p.price)} />
              <input type="hidden" name="image" value={p.image} />
              <button className="btn btn-primary w-full">Add to Cart</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
