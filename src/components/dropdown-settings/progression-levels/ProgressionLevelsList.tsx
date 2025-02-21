
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { useProgressionLevelsQuery } from "@/hooks/queries/useProgressionLevelsQuery"
import { AddProgressionLevelDialog } from "./AddProgressionLevelDialog"
import { ProgressionLevelItem } from "./ProgressionLevelItem"

export const ProgressionLevelsList = () => {
  const { data: progressionLevels = [] } = useProgressionLevelsQuery()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Label className="text-lg font-semibold">Niveaux de progression</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les niveaux de progression disponibles
          </p>
        </div>
        <AddProgressionLevelDialog />
      </div>

      <div className="grid gap-3">
        {progressionLevels.map((level) => (
          <ProgressionLevelItem key={level.id} level={level} />
        ))}
      </div>
    </div>
  )
