
import { useLocation, Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { HomeIcon } from "lucide-react"

interface BreadcrumbNavProps {
  pageName?: string
}

export const BreadcrumbNav = ({ pageName }: BreadcrumbNavProps) => {
  const location = useLocation()
  const pathSegments = location.pathname.split("/").filter(segment => segment)

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Accueil
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`
          const isLast = index === pathSegments.length - 1

          if (isLast) {
            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={path}>
                  <BreadcrumbPage>
                    {pageName || segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )
          }

          return (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={path}>
                <BreadcrumbLink asChild>
                  <Link to={path}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
