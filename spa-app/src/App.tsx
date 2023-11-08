import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"

import SignIn from "./pages/SignIn"
import SignUpPremium from "./pages/SignUpPremium"
import AudioBooks from "./pages/AudioBooks"
import AudioBookDetails from "./pages/AudioBookDetails"
import Read from "./pages/Read"

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
    element: <AudioBookDetails open={true}/>
  },
  {
    path: "/AudioBooks/:id/Read",
    element: <Read/>
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App;