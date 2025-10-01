import ProductCard from "@/components/ProductCard"
// Replace this with your real products source if different:
import { products as mockProducts } from "@/lib/mock-products"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const items = mockProducts ?? []

  return (
    <div className="container py-8">
      <div className="mb-6">
        <div className="inline-block rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 p-[2px]">
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 px-5 py-2.5 backdrop-blur">
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          </div>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p: any) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={Number(p.price)}
            image={p.image}
          />
        ))}
      </div>
    </div>
  )
}
