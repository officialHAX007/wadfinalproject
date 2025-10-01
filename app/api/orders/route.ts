import { NextRequest, NextResponse } from "next/server"
import { addOrder, OrderItem } from "@/lib/mock-orders"
import { getSession } from "@/lib/session"

export async function POST(req: NextRequest) {
  // Read cart from cookie
  const raw = req.cookies.get("cart")?.value || "[]"
  let cart: Array<{ title: string; price: number; quantity: number; image?: string }> = []
  try { cart = JSON.parse(raw) } catch {}

  if (!cart.length) {
    return NextResponse.redirect(new URL("/cart?err=empty", req.url))
  }

  const form = await req.formData()
  const fullName = String(form.get("fullName") || "").trim()
  const address = String(form.get("address") || "").trim()
  const city = String(form.get("city") || "").trim()
  const postalCode = String(form.get("postalCode") || "").trim()
  const phone = String(form.get("phone") || "").trim()
  const payment = (String(form.get("payment") || "cod") as "card" | "paypal" | "cod")

  if (!fullName || !address || !city || !postalCode || !phone) {
    return NextResponse.redirect(new URL("/cart?err=missing", req.url))
  }

  const items: OrderItem[] = cart.map((c) => ({
    title: c.title,
    price: Number(c.price),
    quantity: Number(c.quantity),
    image: c.image,
  }))
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0)

  const session = getSession()

  addOrder({
    id: "o_" + Date.now(),
    buyerEmail: session?.email ?? null,
    items,
    total: Number(total.toFixed(2)),
    address: `${fullName}, ${address}`,
    city,
    postalCode,
    phone,
    payment,
    status: payment === "cod" ? "PENDING" : "PAID",
    createdAt: new Date().toISOString(),
  })

  const res = NextResponse.redirect(new URL("/orders?placed=1", req.url))
  // Clear the cart
  res.cookies.set("cart", "[]", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 0 })
  return res
}
