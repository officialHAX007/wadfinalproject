import Link from "next/link"
import { getSession } from "@/lib/session" // uses cookies()

export default function Nav() {
  // Server-side read of the cookie session (no client fetch needed)
  const session = getSession() // { email, name?, role: "buyer" | "seller" } | null
  const role = session?.role // "buyer" | "seller" | undefined

  return (
    <header className="border-b">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="font-semibold text-lg">
          Illustrations
        </Link>

        <nav className="flex gap-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/orders">Orders</Link>

          {/* Only show Add Product for sellers */}
          {role === "seller" && (
            <Link
              href="/products/new"
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Add Product
            </Link>
          )}

          {/* If logged out → Login; if logged in → Logout */}
          {!session ? (
            <Link href="/login" className="px-3 py-1 border rounded">
              Login
            </Link>
          ) : (
            <form action="/api/auth/logout" method="post">
              <button className="px-3 py-1 bg-black text-white rounded">
                Logout
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  )
}
