import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_25%_10%,white,transparent_30%),radial-gradient(circle_at_75%_40%,white,transparent_30%)]" />
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Schola — Modern School Platform</h1>
        <p className="text-lg md:text-xl mt-4 text-blue-100 max-w-2xl">A simple portal for students and teachers to access classes, announcements, and resources. Secure login with role-based dashboards.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/register" className="px-5 py-3 bg-white text-blue-700 rounded-md font-semibold hover:bg-blue-50">Get Started</Link>
          <Link to="/login" className="px-5 py-3 bg-blue-500/40 border border-white/30 rounded-md font-semibold hover:bg-blue-500/60">Sign In</Link>
        </div>
      </div>
    </section>
  )
}
