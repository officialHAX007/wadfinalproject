
export const dynamic = 'force-static'

export default function LoginPage(){
  return (
    <div className="container-narrow">
      <div className="card max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form method="post" action="/api/auth/login" className="grid gap-3">
          <label className="grid gap-1">
            <span className="label">Email</span>
            <input name="email" type="email" required className="input" />
          </label>
          <label className="grid gap-1">
            <span className="label">Password</span>
            <input name="password" type="password" required className="input" />
          </label>
          <button className="btn btn-primary">Login</button>
        </form>
        <div className="text-sm mt-3">
          No account? <a className="underline" href="/auth/register">Register</a>
        </div>
      </div>
    </div>
  )
}
