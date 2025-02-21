
import { Exercise } from "@/types/sequence"

export const situationTemplates: Partial<Exercise>[] = [
  {
    title: "2 contre 1 en transition",
    description: "Situation de surnombre offensif en transition rapide",
    duration: 15,
    activity_type: "situation",
    intensity_level: "high",
    opposition_type: "active",
    decision_making_focus: ["Lecture du jeu", "Timing"],
    tactical_objectives: ["Progression", "Finition"]
  },
  {
    title: "3 contre 3 position",
    description: "Situation de jeu en position avec égalité numérique",
    duration: 20,
    activity_type: "situation",
    intensity_level: "medium",
    opposition_type: "active",
    decision_making_focus: ["Prise d'information", "Choix tactiques"],
    tactical_objectives: ["Conservation", "Organisation défensive"]
  },
  {
    title: "Montée de balle",
    description: "Situation de montée de balle face à une défense repliée",
    duration: 15,
    activity_type: "situation",
    opposition_type: "passive",
    intensity_level: "medium",
    decision_making_focus: ["Lecture du jeu", "Prise d'information"],
    tactical_objectives: ["Progression", "Conservation"]
  }
]

