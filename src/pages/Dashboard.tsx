
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { SessionCard } from "@/components/sessions/SessionCard"
import { EmptySessionsState } from "@/components/sessions/EmptySessionsState"
import { useSessionsQuery } from "@/hooks/queries/useSessionsQuery"
import { useSessionDelete } from "@/hooks/useSessionDelete"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const Dashboard = () => {
  const navigate = useNavigate()
  const { sessions, loading, setSessions, pagination, handlePageChange } = useSessionsQuery(undefined)
  const { handleDelete } = useSessionDelete({
    onSuccess: (sessionId) => {
      setSessions(sessions.filter(session => session.id !== sessionId))
    }
  })

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      }
    }
    checkAuth()
  }, [navigate])

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className={`cursor-pointer ${pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
            />
          </PaginationItem>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={pagination.currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className={`cursor-pointer ${pagination.currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Mes séances</h1>
        <Button 
          onClick={() => navigate("/editor")} 
          className="shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <PlusCircle className="mr-2" />
          Nouvelle séance
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground animate-pulse">
            Chargement des séances...
          </div>
        </div>
      ) : sessions.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <SessionCard 
                key={session.id} 
                session={session}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {renderPagination()}
        </>
      ) : (
        <EmptySessionsState />
      )}
    </div>
  )
}

export default Dashboard
