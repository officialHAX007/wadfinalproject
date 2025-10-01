import { NextRequest, NextResponse } from "next/server"
import { getPrismaSafe } from "@/lib/prisma-safe"

type CartLine = { artworkId: string; title?: string; price?: number; image?: string; quantity: number }

function parseCartCookie(req: NextRequest): CartLine[] {
  const raw = req.cookies.get("cart")?.value
  if (!raw) return []
  try { return JSON.parse(raw) as CartLine[] } catch { return [] }
}

function setCartCookie(res: NextResponse, cart: CartLine[]) {
  res.cookies.set("cart", JSON.stringify(cart), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function POST(req: NextRequest) {
  try {
    const prisma = getPrismaSafe()
    const form = await req.formData()
    const artworkId = String(form.get("artworkId") || "")
    const action = String(form.get("action") || "remove") // "decrement" | "remove"

    if (!artworkId) {
      return NextResponse.json({ error: "Missing artworkId" }, { status: 400 })
    }

    // ---------- MOCK MODE (cookie cart) ----------
    if (!prisma) {
      const cart = parseCartCookie(req)
      const idx = cart.findIndex((l) => l.artworkId === artworkId)
      if (idx !== -1) {
        if (action === "decrement" && cart[idx].quantity > 1) {
          cart[idx].quantity -= 1
        } else {
          cart.splice(idx, 1)
        }
      }
      const res = NextResponse.redirect(new URL("/cart", req.url))
      setCartCookie(res, cart)
      return res
    }

    // ---------- DB MODE ----------
    const buyer = await prisma.buyer.findFirst()
    if (!buyer) return NextResponse.redirect(new URL("/cart", req.url))

    const order = await prisma.order.findFirst({
      where: { buyerId: buyer.id, status: "PENDING" },
      include: { items: true },
    })
    if (!order) return NextResponse.redirect(new URL("/cart", req.url))

    const item = order.items.find((it) => it.artworkId === artworkId)
    if (item) {
      if (action === "decrement" && item.quantity > 1) {
        await prisma.orderItem.update({ where: { id: item.id }, data: { quantity: { decrement: 1 } } })
      } else {
        await prisma.orderItem.delete({ where: { id: item.id } })
      }
    }

    const fresh = await prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    })
    const total = (fresh?.items || []).reduce(
      (sum, it) => sum + Number(it.unitPrice) * it.quantity,
      0
    )
    await prisma.order.update({ where: { id: order.id }, data: { total } })

    return NextResponse.redirect(new URL("/cart", req.url))
  } catch (err: any) {
    console.error("CART REMOVE ERROR:", err)
    return NextResponse.json(
      { error: "Remove from cart failed", detail: String(err?.message || err) },
      { status: 500 }
    )
  }
}
