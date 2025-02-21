
import { useState } from "react"
import { Edit2, Save, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion } from "framer-motion"
import { Sport } from "@/types/tactical-concepts"
import { useSportMutation } from "@/hooks/mutations/useSportMutation"

interface SportItemProps {
  sport: Sport
  onSportsChange: () => void
}

export const SportItem = ({ sport, onSportsChange }: SportItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedSportValue, setEditedSportValue] = useState(sport.value)
  const [editedSportLabel, setEditedSportLabel] = useState(sport.label)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { updateSport, deleteSport } = useSportMutation(onSportsChange)

  const handleEdit = async () => {
    const success = await updateSport(sport.id!, editedSportValue, editedSportLabel)
    if (success) {
      setIsEditing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
    >
      {isEditing ? (
        <div className="flex-1 flex gap-3">
          <Input
            value={editedSportValue}
            onChange={(e) => setEditedSportValue(e.target.value)}
            placeholder="Code unique"
            className="max-w-[200px]"
          />
          <Input
            value={editedSportLabel}
            onChange={(e) => setEditedSportLabel(e.target.value)}
            placeholder="Nom affiché"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-medium">{sport.label}</span>
          <span className="text-sm text-muted-foreground">({sport.value})</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEdit}
              className="hover:bg-primary/10"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsEditing(true);
                setEditedSportValue(sport.value);
                setEditedSportLabel(sport.label);
              }}
              className="hover:bg-primary/10"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cela supprimera définitivement le sport
              et tous les concepts tactiques associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                deleteSport(sport.id!);
                setIsDeleteDialogOpen(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
