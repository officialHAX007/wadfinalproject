export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-indigo-500/20 to-cyan-500/20" />
        <div className="container relative py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
            Sell Digital Illustrations with <span className="bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">Style</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600">
            A modern marketplace experience — fast, responsive, and beautiful. Upload artwork, manage products, and take orders.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="/products" className="btn btn-primary">Explore Products</a>
            <a href="/login" className="btn btn-outline">Login</a>
          </div>
        </div>
      </section>

      {/* ===== BIG CTA (replaces the 6-card section) ===== */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-gray-900 to-black text-white px-6 sm:px-10 py-12 sm:py-16 shadow-xl">
            {/* glow */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/30 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-center">
                Ready to start selling?
              </h2>
              <p className="mt-3 text-center text-gray-300 text-lg">
                Upload your products and launch your storefront in minutes.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/products/new" className="btn btn-primary text-base px-6 py-3">
                  Add Product
                </a>
                <a href="/products" className="btn btn-outline text-base px-6 py-3">
                  Browse Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
