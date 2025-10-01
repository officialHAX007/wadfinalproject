import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { addMockProduct } from "@/lib/mock-products"

// +++ NEW: read cookie to ensure seller +++
function getRoleFromCookie(req: NextRequest): "buyer" | "seller" | null {
  try {
    const raw = req.cookies.get("session")?.value
    if (!raw) return null
    const s = JSON.parse(raw)
    return s?.role === "seller" ? "seller" : s?.role === "buyer" ? "buyer" : null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  // Require seller
  const role = getRoleFromCookie(req)
  if (role !== "seller") {
    return NextResponse.redirect(new URL("/login?reason=seller_only", req.url))
  }

  try {
    const form = await req.formData()
    const title = String(form.get("title") || "").trim()
    const description = String(form.get("description") || "").trim()
    const priceRaw = String(form.get("price") || "").trim()
    const price = Number(priceRaw)
    const tagsRaw = String(form.get("tags") || "").trim()
    const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : []
    const isAvailable = String(form.get("available") || "") !== ""
    const file = form.get("image")

    if (!title || !priceRaw || Number.isNaN(price) || !file || !(file instanceof File)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 })
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadsDir, { recursive: true })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const safeName = file.name.replace(/\s+/g, "_").replace(/[^\w.\-]/g, "")
    const fileName = `${Date.now()}_${safeName || "upload"}`
    await fs.writeFile(path.join(uploadsDir, fileName), buffer)
    const publicUrl = `/uploads/${fileName}`

    addMockProduct({
      id: `p_${Date.now()}`,
      title,
      description,
      price,
      image: publicUrl,
      isAvailable,
      tags,
    })

    return NextResponse.redirect(new URL("/products", req.url))
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
