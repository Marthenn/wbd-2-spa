import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"

import SignIn from "./pages/SignIn"
import SignUpPremium from "./pages/SignUpPremium"
import AudioBooks from "./pages/AudioBooks"

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
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App;