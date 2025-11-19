import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="w-full bg-white/70 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-blue-600 rounded text-white font-bold grid place-items-center">S</span>
          <span className="font-semibold text-slate-800">Schola</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Register</Link>
        </div>
      </div>
    </nav>
  )
}
