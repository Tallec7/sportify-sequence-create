
import { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useErrorToast } from "./use-error-toast"
import { useToast } from "@/components/ui/use-toast"

type Theme = "light" | "dark"

interface UserPreferences {
  theme: Theme
}

export const useUserPreferences = (userId?: string) => {
  const queryClient = useQueryClient()
  const { showError } = useErrorToast()
  const { toast } = useToast()
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme
      return storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }
    return "light"
  })

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["user-preferences", userId],
    queryFn: async () => {
      if (!userId) return null

      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", userId)
        .single()

      if (error) throw error
      return data as UserPreferences
    },
    enabled: !!userId,
  })

  const mutation = useMutation({
    mutationFn: async (newTheme: Theme) => {
      if (!userId) {
        localStorage.setItem("theme", newTheme)
        return
      }

      const { error } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: userId,
          theme: newTheme
        })
        .select()
        .single()

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-preferences", userId] })
      toast({
        description: "Thème mis à jour avec succès",
      })
    },
    onError: (error) => {
      showError(error, "Erreur de sauvegarde des préférences")
    }
  })

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    mutation.mutate(newTheme)
  }

  useEffect(() => {
    if (preferences?.theme) {
      setTheme(preferences.theme)
    }
  }, [preferences])

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return {
    theme,
    toggleTheme,
    isLoading: isLoading || mutation.isPending
  }
}
