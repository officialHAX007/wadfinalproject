"use client"
import { useState } from "react"

export default function RegisterPage() {
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm card">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create account</h1>

        <form
          action="/api/auth/register"
          method="post"
          onSubmit={() => setSubmitting(true)}
          className="grid gap-4"
        >
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" type="text" required className="input w-full" placeholder="Your name" />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input name="email" type="email" required className="input w-full" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input name="password" type="password" required className="input w-full" placeholder="At least 8 characters" />
          </div>

          <div>
            <label className="block text-sm mb-1">Sign up as</label>
            <select name="role" defaultValue="buyer" className="input w-full">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? "Creating…" : "Sign up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="underline">Log in</a>
          </p>
        </form>
      </div>
    </div>
  )
}
