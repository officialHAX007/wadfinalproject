"use client"
import { useState } from "react"

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm card">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <form
          action="/api/auth/login"
          method="post"
          onSubmit={() => setSubmitting(true)}
          className="grid gap-4"
        >
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input name="email" type="email" required className="input w-full" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input name="password" type="password" required className="input w-full" placeholder="••••••••" />
          </div>

          {/* Demo convenience: allow role override on login */}
          <div>
            <label className="block text-sm mb-1">Login as</label>
            <select name="role" defaultValue="buyer" className="input w-full">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? "Logging in…" : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account? <a href="/register" className="underline">Create one</a>
          </p>
        </form>
      </div>
    </div>
  )
}
