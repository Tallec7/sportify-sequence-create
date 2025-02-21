
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index"
import Auth from "@/pages/Auth"
import NotFound from "@/pages/NotFound"
import Navbar from "@/components/Navbar"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App
