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
  import SelectChapter from "../pages/admin/SelectChapter.tsx"
  import AddTranscript from "../pages/admin/AddTranscript.tsx"
  import FavoriteBooks from "../pages/SavedBooks.tsx"
  import NotFound from "../pages/NotFound.tsx";
  import ProtectedRoute from "./ProtectedRoute.tsx"
  
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
      element: (
        <ProtectedRoute role={true} >
          <EditTranscriptList/>
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/EditTranscript/:id/Edit/:chapterId",
      element: (
        <ProtectedRoute role={true} >
          <EditTranscript/>
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/EditTranscript/:id/Add",
      element: (
        <ProtectedRoute role={true} >
          <AddTranscript/>
        </ProtectedRoute>
      )
    },
    {
      path: "/FavoriteBooks",
      element: <FavoriteBooks/>
    },
    {
      path: "/admin/EditTranscript/:id/SelectChapter",
      element: (
        <ProtectedRoute role={true} >
          <SelectChapter/>
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/MembershipRequests",
      element: (
        <ProtectedRoute role={true} >
          <MembershipRequests/>
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/Profile",
      element: (
      <ProtectedRoute role={true} >
        <ProfileAdmin/>
      </ProtectedRoute>
      
      )
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