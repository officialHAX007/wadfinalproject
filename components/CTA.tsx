
import Link from 'next/link'

export default function CTA(){
  return (
    <section className="container my-16">
      <div className="card bg-gradient-to-r from-gray-900 to-black text-white text-center">
        <h3 className="text-2xl font-bold">Ready to start selling?</h3>
        <p className="mt-2 opacity-90">Upload your products and launch your storefront in minutes.</p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/products/new" className="btn btn-primary">Add Product</Link>
          <Link href="/products" className="btn btn-outline border-white text-white">Browse Products</Link>
        </div>
      </div>
    </section>
  )
}
