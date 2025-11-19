import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/me`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const json = await res.json()
        setProfile(json)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (!profile) return <div className="p-6">Not signed in.</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome, {profile.name}</h1>
      <p className="text-slate-600 mb-6">Role: <span className="font-medium">{profile.role}</span></p>
      {profile.role === 'teacher' ? (
        <div className="bg-blue-50 border border-blue-200 rounded p-4">Teacher dashboard: create announcements, manage classes (coming soon)</div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded p-4">Student dashboard: view assignments, announcements (coming soon)</div>
      )}
    </div>
  )
}
