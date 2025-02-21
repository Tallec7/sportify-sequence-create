
import { Exercise } from "@/types/sequence"

export const exerciseTemplates: Partial<Exercise>[] = [
  {
    title: "Exercice de passes",
    description: "Exercice basique de passes en mouvement",
    duration: 10,
    activity_type: "exercise",
    intensity_level: "medium",
    variations: [
      "Passes à une main",
      "Passes en sautant",
      "Passes avec rebond"
    ]
  },
  {
    title: "Exercice de tirs",
    description: "Exercice de tirs au but avec différentes positions",
    duration: 15,
    activity_type: "exercise",
    intensity_level: "high",
    variations: [
      "Tir en appui",
      "Tir en suspension",
      "Tir avec course d'élan"
    ]
  },
  {
    title: "Dribbles et feintes",
    description: "Exercice de dribbles avec changements de direction",
    duration: 12,
    activity_type: "exercise",
    intensity_level: "medium",
    variations: [
      "Dribble en slalom",
      "Changements de direction",
      "Feintes de corps"
    ]
  }
]

