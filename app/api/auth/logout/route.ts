import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/", req.url))
  res.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // delete
  })
  return res
}
