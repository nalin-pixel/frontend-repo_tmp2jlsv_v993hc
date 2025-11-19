import { useState } from 'react'

export function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const data = new URLSearchParams()
      data.append('username', email)
      data.append('password', password)
      data.append('grant_type', 'password')
      const res = await fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const json = await res.json()
      localStorage.setItem('token', json.access_token)
      const profileRes = await fetch(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${json.access_token}` },
      })
      const profile = await profileRes.json()
      onLogin?.(profile)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2" placeholder="you@school.edu" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full border rounded px-3 py-2" placeholder="••••••••" />
      </div>
      <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 font-medium">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export function RegisterForm({ onRegister }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [grade, setGrade] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const params = new URLSearchParams({ name, email, password, role })
      if (role === 'student') params.append('grade', grade)
      const res = await fetch(`${baseUrl}/auth/register?${params.toString()}`, { method: 'POST' })
      if (!res.ok) throw new Error('Registration failed')
      const json = await res.json()
      localStorage.setItem('token', json.access_token)
      const profileRes = await fetch(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${json.access_token}` },
      })
      const profile = await profileRes.json()
      onRegister?.(profile)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2" placeholder="you@school.edu" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full border rounded px-3 py-2" placeholder="Create a strong password" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        {role === 'student' && (
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Grade/Class</label>
            <input value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g., Grade 10" />
          </div>
        )}
      </div>
      <button disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white rounded py-2 font-medium">
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}
