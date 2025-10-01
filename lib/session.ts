import { cookies } from "next/headers"

export type Session = {
  email: string
  name?: string
  role: "buyer" | "seller"
}

export function getSession(): Session | null {
  try {
    const raw = cookies().get("session")?.value
    if (!raw) return null
    const s = JSON.parse(raw)
    if (!s?.email || (s.role !== "buyer" && s.role !== "seller")) return null
    return { email: s.email, name: s.name, role: s.role }
  } catch {
    return null
  }
}
