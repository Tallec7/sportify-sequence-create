
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index"
import Auth from "@/pages/Auth"
import NotFound from "@/pages/NotFound"
import Navbar from "@/components/Navbar"
import Dashboard from "@/pages/Dashboard"
import Editor from "@/pages/Editor"
import Settings from "@/pages/Settings"
import ViewSession from "@/pages/ViewSession"
import DropdownSettings from "@/pages/DropdownSettings"
import PromptManager from "@/pages/PromptManager"

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
        path: "/editor/:id",
        element: <Editor />,
      },
      {
        path: "/session/:id",
        element: <ViewSession />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/dropdown-settings",
        element: <DropdownSettings />,
      },
      {
        path: "/prompt-manager",
        element: <PromptManager />,
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
