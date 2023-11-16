import {
    createBrowserRouter,
  } from "react-router-dom"
  
  import SignIn from "../pages/SignIn"
  import SignUpPremium from "../pages/SignUpPremium"
  import AudioBooks from "../pages/AudioBooks"
  import AudioBookDetails from "../pages/AudioBookDetails"
  import Read from "../pages/Read"
  import EditTranscriptList from "../pages/admin/EditTranscriptList"
  import MembershipRequests from "../pages/admin/MembershipRequests"
  import ProfileAdmin from "../pages/admin/ProfileAdmin"
  import Profile from "../pages/Profile"
  import EditTranscript from "../pages/admin/EditTranscript.tsx"
  import NotFound from "../pages/NotFound.tsx";
  
  export const router = createBrowserRouter([
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
      path: "/admin/EditTranscript/:id/Edit",
      element: <EditTranscript/>
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
    {
      path: "*",
      element: <NotFound/>
    }
  ])