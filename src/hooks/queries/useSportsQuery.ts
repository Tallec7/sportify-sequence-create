
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export interface Sport {
  id?: string
  value: string
  label: string
}

export const useSportsQuery = () => {
  const [sports, setSports] = useState<Sport[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchSports()
  }, [])

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
    }
  }

  return sports
}
