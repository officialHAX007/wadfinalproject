
export const dynamic = 'force-static'

export default function RegisterPage(){
  return (
    <div className="container-narrow">
      <div className="card max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form method="post" action="/api/auth/register" className="grid gap-3">
          <label className="grid gap-1">
            <span className="label">Email</span>
            <input name="email" type="email" required className="input" />
          </label>
          <label className="grid gap-1">
            <span className="label">Password</span>
            <input name="password" type="password" required className="input" />
          </label>
          <label className="grid gap-1">
            <span className="label">Role</span>
            <select name="role" className="input">
              <option value="BUYER">Buyer</option>
              <option value="ARTIST">Artist</option>
            </select>
          </label>
          <button className="btn btn-primary">Create account</button>
        </form>
      </div>
    </div>
  )
}
