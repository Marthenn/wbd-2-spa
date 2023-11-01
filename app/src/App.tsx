import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"

import SignIn from "./pages/SignIn"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App;