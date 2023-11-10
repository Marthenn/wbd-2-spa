import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import SignIn from "./pages/SignIn"
import SignUpPremium from "./pages/SignUpPremium"
import AudioBooks from "./pages/AudioBooks"
import AudioBookDetails from "./pages/AudioBookDetails"
import Read from "./pages/Read"
import EditTranscriptList from "./pages/admin/EditTranscriptList"
import MembershipRequests from "./pages/admin/MembershipRequests"
import ProfileAdmin from "./pages/admin/ProfileAdmin"
import Profile from "./pages/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />
  },
  {
    path: "/SignUpPremium",
    element: <SignUpPremium />
  },
  {
    path: "/AudioBooks",
    element: <AudioBooks/>
  },
  {
    path: "/AudioBooks/:id/Details",
    element: <AudioBookDetails/>
  },
  {
    path: "/AudioBooks/:id/Read",
    element: <Read/>
  },
  {
    path: "/admin/EditTranscript",
    element: <EditTranscriptList/>
  },
  {
    path: "/admin/MembershipRequests",
    element: <MembershipRequests/>
  },
  {
    path: "/admin/Profile",
    element: <ProfileAdmin/>
  },
  {
    path: "/Profile",
    element: <Profile/>
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App;