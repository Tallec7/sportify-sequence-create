import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import type { TacticalConceptOption, TacticalConcept } from "@/types/settings"

export const useDropdownSettings = () => {
  const [selectedSport, setSelectedSport] = useState<string>("handball")
  const [hasAccess, setHasAccess] = useState(false)
  const [sports, setSports] = useState<Sport[]>([])
  const [tacticalConcepts, setTacticalConcepts] = useState<TacticalConceptOption[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [intensityLevels, setIntensityLevels] = useState<IntensityLevel[]>([])
  const [sequenceTypes, setSequenceTypes] = useState<SequenceType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()

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
          .select('id, value, label, sport_id')
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

  const fetchSequenceTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('sequence_types')
        .select('id, value, label')
        .order('label')

      if (error) throw error
      setSequenceTypes(data || [])
    } catch (error) {
      console.error('Error fetching sequence types:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des types de séquence"
      })
    }
  }

  useEffect(() => {
    checkUserAccess()
    fetchSports()
    fetchLevels()
    fetchIntensityLevels()
    fetchSequenceTypes()
  }, [])

  useEffect(() => {
    if (selectedSport) {
      fetchTacticalConcepts(selectedSport)
    }
  }, [selectedSport])

  return {
    hasAccess,
    isLoading,
    sports,
    selectedSport,
    setSelectedSport,
    tacticalConcepts,
    levels,
    intensityLevels,
    sequenceTypes,
    fetchSports,
    fetchTacticalConcepts,
    fetchLevels,
    fetchIntensityLevels,
    fetchSequenceTypes
  }
}
