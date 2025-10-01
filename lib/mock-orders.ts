// lib/mock-orders.ts
export type OrderItem = {
  title: string
  price: number
  quantity: number
  image?: string
}

export type Order = {
  id: string
  buyerEmail?: string | null
  items: OrderItem[]
  total: number
  address: string
  city: string
  postalCode: string
  phone: string
  payment: "card" | "paypal" | "cod"
  status: "PENDING" | "PAID" | "SHIPPED"
  createdAt: string
}

// Use a global store so Next.js HMR / route isolation doesn't reset data.
type GlobalStore = { orders: Order[] }
const g = globalThis as unknown as { __ordersStore?: GlobalStore }
if (!g.__ordersStore) g.__ordersStore = { orders: [] }
const store = g.__ordersStore!

export function addOrder(o: Order) {
  store.orders.unshift(o)
}

export function getAllOrders(): Order[] {
  return store.orders
}
