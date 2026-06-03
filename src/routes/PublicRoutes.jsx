import { Route } from 'react-router-dom'
import Layout from './Layout'
import ExploreLayout from './ExploreLayout'
import Home from '../screens/Home'
import CampDetailScreen from '../Compunents/Camp/CampDetailScreen'
import ExploreMapScreen from '../Compunents/Detail/ExploreMapScreen'
import BecomeHostScreen from '../screens/BecomeHostScreen'
import TentBookingScreen from '../screens/TentBookingScreen'
import TermsScreen from '../screens/TermsScreen'

/**
 * Public routes — accessible to all users (no auth required).
 * Returns Route elements to be nested inside <Routes> in App.jsx.
 */
export default function PublicRoutes() {
  return (
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsScreen />} />
      </Route>

      <Route element={<ExploreLayout />}>
        <Route path="/explore" element={<ExploreMapScreen />} />
        <Route path="/explore/:category" element={<ExploreMapScreen />} />
        <Route path="/become-host" element={<BecomeHostScreen />} />
        <Route path="/book-tent" element={<TentBookingScreen />} />
        <Route path="/camp/:campId" element={<CampDetailScreen />} />
      </Route>
    </>
  )
}
