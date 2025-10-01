import { NextRequest, NextResponse } from "next/server"
import { getPrismaSafe } from "@/lib/prisma-safe"

type CartLine = {
  artworkId: string
  title?: string
  price?: number
  image?: string
  quantity: number
}

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
    const title = (form.get("title") || "") as string
    const price = form.get("price") ? Number(form.get("price")) : undefined
    const image = (form.get("image") || "") as string

    if (!artworkId) {
      return NextResponse.json({ error: "Missing artworkId" }, { status: 400 })
    }

    // ---------- MOCK MODE: cookie cart ----------
    if (!prisma) {
      const cart = parseCartCookie(req)
      const existing = cart.find((l) => l.artworkId === artworkId)
      if (existing) existing.quantity += 1
      else cart.push({ artworkId, title, price, image, quantity: 1 })

      const res = NextResponse.redirect(new URL("/cart", req.url))
      setCartCookie(res, cart)
      return res
    }

    // ---------- DB MODE ----------
    let buyer = await prisma.buyer.findFirst()
    if (!buyer) {
      buyer = await prisma.buyer.create({
        data: { name: "Demo Buyer", email: "demo@buyer.com" },
      })
    }

    let order = await prisma.order.findFirst({
      where: { buyerId: buyer.id, status: "PENDING" },
      include: { items: true },
    })
    if (!order) {
      order = await prisma.order.create({
        data: { buyerId: buyer.id, total: 0 },
        include: { items: true },
      })
    }

    const existing = order.items.find((it) => it.artworkId === artworkId)
    if (existing) {
      await prisma.orderItem.update({
        where: { id: existing.id },
        data: { quantity: { increment: 1 } },
      })
    } else {
      const artwork = await prisma.artwork.findUnique({ where: { id: artworkId } })
      if (!artwork) return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
      await prisma.orderItem.create({
        data: { orderId: order.id, artworkId, unitPrice: artwork.price, quantity: 1 },
      })
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
    console.error("ADD TO CART ERROR:", err)
    return NextResponse.json(
      { error: "Add to cart failed", detail: String(err?.message || err) },
      { status: 500 }
    )
  }
}
