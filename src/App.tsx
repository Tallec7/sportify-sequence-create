
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index"
import Auth from "@/pages/Auth"
import NotFound from "@/pages/NotFound"
import Navbar from "@/components/Navbar"
import Dashboard from "@/pages/Dashboard"
import Editor from "@/pages/Editor"
import Settings from "@/pages/Settings"

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/editor",
        element: <Editor />,
      },
      {
        path: "/settings",
        element: <Settings />,
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

