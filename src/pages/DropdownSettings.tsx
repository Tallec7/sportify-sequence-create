
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SportsList } from "@/components/dropdown-settings/SportsList"
import { TacticalConceptsList } from "@/components/dropdown-settings/TacticalConceptsList"

interface Sport {
  id?: string
  value: string
  label: string
}

type TacticalConceptOption = {
  id?: string
  value: string
  label: string
  sport_id?: string
}

const DropdownSettings = () => {
  useAuthCheck()
  const [selectedSport, setSelectedSport] = useState<string>("handball")
  const [hasAccess, setHasAccess] = useState(false)
  const [sports, setSports] = useState<Sport[]>([])
  const [tacticalConcepts, setTacticalConcepts] = useState<TacticalConceptOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    checkUserAccess()
    fetchSports()
  }, [])

  useEffect(() => {
    if (selectedSport) {
      fetchTacticalConcepts(selectedSport)
    }
  }, [selectedSport])

  const checkUserAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      navigate('/auth')
      return
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)

    const userRoles = roles?.map(r => r.role) || []
    const hasAccess = userRoles.some(role => ['admin', 'user_plus'].includes(role))
    
    if (!hasAccess) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous n'avez pas les droits nécessaires pour accéder à cette page"
      })
      navigate('/dashboard')
      return
    }
    
    setHasAccess(true)
  }

  const fetchSports = async () => {
    try {
      const { data, error } = await supabase
        .from('sports')
        .select('id, value, label')
        .order('label')

      if (error) throw error
      setSports(data || [])
    } catch (error) {
      console.error('Error fetching sports:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des sports"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTacticalConcepts = async (sportValue: string) => {
    try {
      const { data: sportData } = await supabase
        .from('sports')
        .select('id')
        .eq('value', sportValue)
        .single()

      if (sportData) {
        const { data, error } = await supabase
          .from('tactical_concepts')
          .select('id, value, label')
          .eq('sport_id', sportData.id)
          .order('label')

        if (error) throw error
        setTacticalConcepts(data || [])
      }
    } catch (error) {
      console.error('Error fetching tactical concepts:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les concepts tactiques"
      })
    }
  }

  if (!hasAccess || isLoading) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-8 space-y-8"
    >
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Paramètres des listes déroulantes</h2>
        
        <div className="space-y-6">
          <SportsList 
            sports={sports}
            onSportsChange={fetchSports}
          />

          <Separator />

          <TacticalConceptsList 
            sports={sports}
            selectedSport={selectedSport}
            tacticalConcepts={tacticalConcepts}
            onSportChange={setSelectedSport}
            onConceptsChange={() => fetchTacticalConcepts(selectedSport)}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default DropdownSettings
