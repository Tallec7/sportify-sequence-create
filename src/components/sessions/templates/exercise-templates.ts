
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
    ],
    setup_instructions: "Placer les joueurs en deux colonnes face à face, espacées de 5-6 mètres",
    player_instructions: "Effectuer des passes en avançant progressivement, synchroniser les déplacements avec son partenaire",
    coach_instructions: "Observer la qualité des passes et la synchronisation des déplacements. Corriger la position des mains et l'orientation des épaules."
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
    ],
    setup_instructions: "Installer des plots pour marquer les positions de tir. Placer un gardien dans les buts.",
    player_instructions: "Enchaîner les tirs en variant les positions et les types de tirs. Analyser la position du gardien avant chaque tir.",
    coach_instructions: "Veiller à la qualité des appuis et à l'armé du bras. Insister sur la précision plutôt que la puissance dans un premier temps."
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
    ],
    setup_instructions: "Mettre en place un parcours de plots en zigzag sur 10-15 mètres",
    player_instructions: "Réaliser le parcours en dribblant, varier les changements de direction et les rythmes",
    coach_instructions: "Insister sur la protection du ballon et la dissociation haut/bas du corps. Encourager la créativité dans les feintes."
  }
]
