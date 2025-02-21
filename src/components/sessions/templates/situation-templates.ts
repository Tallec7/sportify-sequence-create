
import { Exercise } from "@/types/sequence"

export const situationTemplates: Partial<Exercise>[] = [
  {
    title: "2 contre 1 en transition",
    description: "Situation de surnombre offensif en transition rapide",
    duration: 15,
    activity_type: "situation",
    intensity_level: "high",
    opposition_type: "active",
    decision_making_focus: ["Lecture du jeu", "Timing", "Choix passe/tir"],
    tactical_objectives: ["Progression", "Finition", "Création du surnombre"],
    setup_instructions: "Former des groupes de 3 joueurs (2 attaquants, 1 défenseur). Départ depuis le milieu de terrain.",
    player_instructions: "Les attaquants doivent exploiter le surnombre pour créer une occasion de but. Le défenseur doit retarder la progression et forcer une mauvaise décision.",
    coach_instructions: "Observer la prise d'information des attaquants et leur capacité à exploiter l'espace. Analyser les choix tactiques et le timing des passes."
  },
  {
    title: "3 contre 3 position",
    description: "Situation de jeu en position avec égalité numérique",
    duration: 20,
    activity_type: "situation",
    intensity_level: "medium",
    opposition_type: "active",
    decision_making_focus: ["Prise d'information", "Choix tactiques", "Communication"],
    tactical_objectives: ["Conservation", "Organisation défensive", "Création d'espaces"],
    setup_instructions: "Délimiter un espace de jeu de 10x10m avec deux zones de but. Former des équipes de 3.",
    player_instructions: "L'équipe en attaque doit conserver le ballon et créer des opportunités. L'équipe en défense doit récupérer le ballon et empêcher la progression.",
    coach_instructions: "Mettre l'accent sur l'occupation de l'espace et les déplacements sans ballon. Encourager la communication entre les joueurs."
  },
  {
    title: "Montée de balle",
    description: "Situation de montée de balle face à une défense repliée",
    duration: 15,
    activity_type: "situation",
    opposition_type: "passive",
    intensity_level: "medium",
    decision_making_focus: ["Lecture du jeu", "Prise d'information", "Organisation collective"],
    tactical_objectives: ["Progression", "Conservation", "Changement de rythme"],
    setup_instructions: "Placer une défense en place (4-5 joueurs). L'équipe en attaque part du milieu de terrain.",
    player_instructions: "Monter la balle collectivement en utilisant la largeur du terrain. Chercher les intervalles et les changements de rythme.",
    coach_instructions: "Veiller à l'écartement des joueurs et à la circulation du ballon. Encourager les prises d'initiatives et les changements de rythme opportuns."
  }
]
