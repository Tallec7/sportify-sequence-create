
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index"
import Auth from "@/pages/Auth"
import NotFound from "@/pages/NotFound"
import Navbar from "@/components/Navbar"

const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
