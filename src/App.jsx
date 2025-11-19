import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { LoginForm, RegisterForm } from './components/AuthForms'
import Dashboard from './components/Dashboard'

function Home() {
  return (
    <div>
      <Hero />
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[{
          title: 'Role-based access', desc: 'Separate dashboards for teachers and students'
        }, { title: 'Announcements', desc: 'Share updates with the whole school' }, { title: 'Courses', desc: 'Organize classes and enroll students' }].map((f, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border">
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-slate-600 mt-1">{f.desc}</p>
          </div>
        ))}
      </section>
      <section className="bg-slate-50 border-t">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-slate-600">Built for simplicity. Secure by design.</div>
      </section>
    </div>
  )
}

function Page({ title, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <div className="bg-white border rounded-xl p-6 shadow-sm">{children}</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route index element={<div className="min-h-screen bg-slate-50"><Navbar /><Home /></div>} />
      <Route path="/login" element={<Page title="Sign In"><LoginForm /></Page>} />
      <Route path="/register" element={<Page title="Create your account"><RegisterForm /></Page>} />
      <Route path="/dashboard" element={<div className="min-h-screen bg-slate-50"><Navbar /><Dashboard /></div>} />
      <Route path="*" element={<div className="p-6"><Link to="/">Go Home</Link></div>} />
    </Routes>
  )
}
