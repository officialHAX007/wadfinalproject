import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const name = String(form.get("name") || "")
  const email = String(form.get("email") || "")
  const password = String(form.get("password") || "")
  const role = (String(form.get("role") || "buyer") === "seller" ? "seller" : "buyer") as "buyer" | "seller"

  if (!name || !email || !password) {
    return NextResponse.redirect(new URL("/register?error=missing", req.url))
  }

  // (No DB in demo; just set cookie)
  const res = NextResponse.redirect(new URL("/", req.url))
  res.cookies.set("session", JSON.stringify({ email, name, role }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
