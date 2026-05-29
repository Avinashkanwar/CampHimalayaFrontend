import { Route, Navigate } from 'react-router-dom'
import Layout from './Layout'

// Placeholder screens for future authenticated pages
function BookingScreen() {
  return (
    <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl font-bold text-slate-800 mb-4">My Bookings</h1>
      <p className="text-slate-500 text-lg">Your upcoming camping adventures will appear here.</p>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl font-bold text-slate-800 mb-4">My Profile</h1>
      <p className="text-slate-500 text-lg">Manage your account settings and preferences.</p>
    </div>
  )
}

/**
 * Auth guard wrapper — redirects unauthenticated users to home.
 */
function PrivateGuard({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

/**
 * Private routes — require authentication.
 * Returns Route elements to be nested inside <Routes> in App.jsx.
 */
export default function PrivateRoutes({ isAuthenticated }) {
  return (
    <Route
      element={
        <PrivateGuard isAuthenticated={isAuthenticated}>
          <Layout />
        </PrivateGuard>
      }
    >
      <Route path="/bookings" element={<BookingScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Route>
  )
}
