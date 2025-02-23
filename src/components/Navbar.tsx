
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { User } from "@supabase/supabase-js"
import { useToast } from "./ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, LogOut, List, Wand2 } from "lucide-react"

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      checkUserRole(session?.user?.id)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      checkUserRole(session?.user?.id)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUserRole = async (userId: string | undefined) => {
    if (!userId) {
      setHasAccess(false)
      return
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)

    const userRoles = roles?.map(r => r.role) || []
    setHasAccess(userRoles.some(role => ['admin', 'user_plus'].includes(role)))
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      })
    } else {
      toast({
        title: "Succès",
        description: "Déconnexion réussie"
      })
      navigate('/')
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">KAP</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Accueil
            </Link>
            {user && (
              <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground">
                Tableau de bord
              </Link>
            )}
          </nav>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Mon compte</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
                {hasAccess && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/dropdown-settings')}>
                      <List className="mr-2 h-4 w-4" />
                      Paramètres des listes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/prompt-manager')}>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Gestion des prompts
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Connexion
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
