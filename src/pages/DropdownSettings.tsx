import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SportsList } from "@/components/dropdown-settings/SportsList"
import { TacticalConceptsList } from "@/components/dropdown-settings/TacticalConceptsList"
import { LevelsList } from "@/components/dropdown-settings/LevelsList"
import { IntensityLevelsList } from "@/components/dropdown-settings/IntensityLevelsList"

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

interface Level {
  id?: string
  value: string
  label: string
}

interface IntensityLevel {
  id?: string
  value: string
  label: string
}

const DropdownSettings = () => {
  useAuthCheck()
  const [selectedSport, setSelectedSport] = useState<string>("handball")
  const [hasAccess, setHasAccess] = useState(false)
  const [sports, setSports] = useState<Sport[]>([])
  const [tacticalConcepts, setTacticalConcepts] = useState<TacticalConceptOption[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [intensityLevels, setIntensityLevels] = useState<IntensityLevel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    checkUserAccess()
    fetchSports()
    fetchLevels()
    fetchIntensityLevels()
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

  const fetchLevels = async () => {
    try {
      const { data, error } = await supabase
        .from('levels')
        .select('id, value, label')
        .order('label')

      if (error) throw error
      setLevels(data || [])
    } catch (error) {
      console.error('Error fetching levels:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des niveaux"
      })
    }
  }

  const fetchIntensityLevels = async () => {
    try {
      const { data, error } = await supabase
        .from('intensity_levels')
        .select('id, value, label')
        .order('label')

      if (error) throw error
      setIntensityLevels(data || [])
    } catch (error) {
      console.error('Error fetching intensity levels:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des niveaux d'intensité"
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
      className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border bg-card shadow-lg backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Paramètres des listes déroulantes
          </h2>
          <p className="text-muted-foreground">
            Gérez les sports et les concepts tactiques disponibles dans l'application
          </p>
        </motion.div>
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SportsList 
              sports={sports}
              onSportsChange={fetchSports}
            />
          </motion.div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TacticalConceptsList 
              sports={sports}
              selectedSport={selectedSport}
              tacticalConcepts={tacticalConcepts}
              onSportChange={setSelectedSport}
              onConceptsChange={() => fetchTacticalConcepts(selectedSport)}
            />
          </motion.div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <LevelsList
              levels={levels}
              onLevelsChange={fetchLevels}
            />
          </motion.div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <IntensityLevelsList
              intensityLevels={intensityLevels}
              onIntensityLevelsChange={fetchIntensityLevels}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DropdownSettings
