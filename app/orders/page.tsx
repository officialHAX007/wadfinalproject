import { getAllOrders } from "@/lib/mock-orders"

export const dynamic = "force-dynamic"

export default function OrdersPage() {
  const orders = getAllOrders()

  return (
    <div className="container py-8">
      <h2 className="text-3xl font-bold mb-6">Orders</h2>

      {orders.length === 0 ? (
        <div className="card p-6 text-center text-gray-500">No orders yet.</div>
      ) : (
        <div className="space-y-5">
          {orders.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">Order #{o.id}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                    {o.buyerEmail ? ` • ${o.buyerEmail}` : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">${o.total.toFixed(2)}</div>
                  <div
                    className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      o.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : o.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {o.status}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {o.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {it.image && (
                        <img
                          src={it.image}
                          alt={it.title}
                          className="h-10 w-10 rounded object-cover"
                        />
                      )}
                      <div className="text-sm">
                        <div className="font-medium">{it.title}</div>
                        <div className="text-gray-500">
                          ${it.price.toFixed(2)} × {it.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      ${(it.price * it.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <div><span className="font-medium">Ship to:</span> {o.address}, {o.city} {o.postalCode}</div>
                <div><span className="font-medium">Phone:</span> {o.phone}</div>
                <div><span className="font-medium">Payment:</span> {o.payment.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
