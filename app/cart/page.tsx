// app/cart/page.tsx
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

type CartLine = {
  artworkId: string
  title: string
  price: number
  image?: string
  quantity: number
}

function readCookieCart(): CartLine[] {
  const raw = cookies().get("cart")?.value
  if (!raw) return []
  try {
    return JSON.parse(raw) as CartLine[]
  } catch {
    return []
  }
}

export default function CartPage() {
  // ⬅️ default export is a React component that returns JSX
  const items = readCookieCart()
  const total = items.reduce((s, c) => s + c.price * c.quantity, 0)

  return (
    <div className="container-narrow py-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <div className="card p-6 text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((c) => (
              <div key={c.artworkId} className="flex items-center justify-between card p-4">
                <div className="flex items-center gap-4">
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-16 w-16 rounded object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-gray-500">
                      ${c.price.toFixed(2)} × {c.quantity}
                    </div>
                  </div>
                </div>
                <div className="font-semibold">
                  ${(c.price * c.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center p-4 border-t">
              <span className="font-semibold text-lg">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout */}
          <div className="card p-6 space-y-4 h-fit">
            <h3 className="text-xl font-semibold mb-4">Checkout</h3>

            <form action="/api/orders" method="post" className="space-y-4">
              <div>
                <label className="block text-sm mb-1 font-medium">Full Name</label>
                <input name="fullName" type="text" required className="input w-full" />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">Address</label>
                <input name="address" type="text" required className="input w-full" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 font-medium">City</label>
                  <input name="city" type="text" required className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm mb-1 font-medium">Postal Code</label>
                  <input name="postalCode" type="text" required className="input w-full" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">Phone</label>
                <input name="phone" type="tel" required className="input w-full" />
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="card" required /> Credit / Debit Card
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="paypal" /> PayPal
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="cod" /> Cash on Delivery
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
