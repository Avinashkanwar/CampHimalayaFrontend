import { Route } from 'react-router-dom'
import Layout from './Layout'
import ExploreLayout from './ExploreLayout'
import Home from '../screens/Home'
import CampDetailScreen from '../Compunents/Camp/CampDetailScreen'
import ExploreMapScreen from '../Compunents/Detail/ExploreMapScreen'
import BecomeHostScreen from '../screens/BecomeHostScreen'
import TermsScreen from '../screens/TermsScreen'

/**
 * Public routes — accessible to all users (no auth required).
 * Returns Route elements to be nested inside <Routes> in App.jsx.
 */
export default function PublicRoutes() {
  return (
    <>
      {/* Main layout routes (Navbar + Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/camp/:campId" element={<CampDetailScreen />} />
        <Route path="/become-host" element={<BecomeHostScreen />} />
        <Route path="/terms" element={<TermsScreen />} />
      </Route>

      {/* Full-screen layout routes (no Navbar/Footer — has its own header) */}
      <Route element={<ExploreLayout />}>
        <Route path="/explore" element={<ExploreMapScreen />} />
        <Route path="/explore/:category" element={<ExploreMapScreen />} />
      </Route>
    </>
  )
}
