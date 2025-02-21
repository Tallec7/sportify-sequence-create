
import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddActivityTypeDialog } from "./AddActivityTypeDialog"
import { ActivityTypeItem } from "./ActivityTypeItem"
import { useActivityTypesQuery } from "@/hooks/queries/useActivityTypesQuery"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useActivityTypeUpdateMutation } from "@/hooks/mutations/useActivityTypeUpdateMutation"

export const ActivityTypesList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: activityTypes = [], isLoading } = useActivityTypesQuery()

  // State for editing
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedValue, setEditedValue] = useState("")
  const [editedLabel, setEditedLabel] = useState("")

  // Dialog state
  const [newValue, setNewValue] = useState("")
  const [newLabel, setNewLabel] = useState("")

  const { mutate: updateActivityType } = useActivityTypeUpdateMutation()

  const filteredTypes = activityTypes.filter(type => 
    type.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    type.value.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStartEdit = (type: { id: string; value: string; label: string }) => {
    setEditingId(type.id)
    setEditedValue(type.value)
    setEditedLabel(type.label)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditedValue("")
    setEditedLabel("")
  }

  const handleSaveEdit = (id: string) => {
    updateActivityType({
      id,
      value: editedValue,
      label: editedLabel,
    })
    setEditingId(null)
    setEditedValue("")
    setEditedLabel("")
  }

  const handleDelete = (id: string) => {
    // Implement delete logic here
  }

  const handleAdd = () => {
    // Implement add logic here
    setIsDialogOpen(false)
    setNewValue("")
    setNewLabel("")
  }

  const handleDialogCancel = () => {
    setIsDialogOpen(false)
    setNewValue("")
    setNewLabel("")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl font-semibold">Types d'activité</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Rechercher un type d'activité..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTypes.map((type) => (
              <ActivityTypeItem
                key={type.id}
                type={type}
                isEditing={editingId === type.id}
                editedValue={editedValue}
                editedLabel={editedLabel}
                onEditValueChange={setEditedValue}
                onEditLabelChange={setEditedLabel}
                onStartEdit={() => handleStartEdit(type)}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={() => handleSaveEdit(type.id)}
                onDelete={() => handleDelete(type.id)}
              />
            ))}
            {filteredTypes.length === 0 && searchQuery && (
              <p className="text-center text-muted-foreground py-4">
                Aucun type d'activité ne correspond à votre recherche
              </p>
            )}
          </div>
        )}
        <AddActivityTypeDialog
          isOpen={isDialogOpen}
          newValue={newValue}
          newLabel={newLabel}
          onNewValueChange={setNewValue}
          onNewLabelChange={setNewLabel}
          onCancel={handleDialogCancel}
          onAdd={handleAdd}
        />
      </CardContent>
    </Card>
  )
}
