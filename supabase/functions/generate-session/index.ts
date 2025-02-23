
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mode, answers } = await req.json();
    
    // Construction du prompt système selon le mode
    let systemPrompt = `Tu es un expert en création de séances d'entraînement. Tu dois générer une séance complète en JSON en respectant strictement le format suivant. IMPORTANT : Ta réponse ne doit contenir QUE du JSON valide, sans aucun texte avant ou après.

{
  "title": "string",
  "description": "string",
  "sport": "string",
  "level": "string",
  "duration": "number",
  "participants_min": "number",
  "participants_max": "number",
  "age_category": "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior",
  "intensity_level": "low" | "medium" | "high",
  "sequences": [
    {
      "title": "string",
      "description": "string",
      "duration": "number",
      "sequence_type": "warmup" | "main" | "cooldown",
      "intensity_level": "low" | "medium" | "high",
      "sequence_order": "number",
      "exercises": [
        {
          "title": "string",
          "description": "string",
          "duration": "number",
          "activity_type": "exercise" | "situation",
          "intensity_level": "low" | "medium" | "high",
          "exercise_order": "number",
          "player_instructions": "string?",
          "setup_instructions": "string?",
          "coach_instructions": "string?",
          "opposition_type": "string?",
          "decision_making_focus": "string[]?",
          "tactical_objectives": "string[]?",
          "tactical_concepts": "string[]?",
          "variations": "string[]?",
          "performance_metrics": "{}?"
        }
      ],
      "objectives": [
        {
          "description": "string",
          "objective_type": "apprentissage" | "developpement" | "perfectionnement",
          "is_priority": "boolean",
          "order_index": "number"
        }
      ]
    }
  ]
}`;

    let userPrompt = "";

    switch (mode) {
      case "express":
        systemPrompt += " Génère une séance simple et efficace basée sur les informations essentielles.";
        userPrompt = `Crée une séance d'entraînement pour ${answers.sport}, niveau ${answers.level}, avec ${answers.participants} participants, durée ${answers.duration} minutes.`;
        break;
      case "expert":
        systemPrompt += " Crée une séance optimisée et détaillée en tenant compte de tous les paramètres.";
        userPrompt = `Crée une séance détaillée pour ${answers.sport}, niveau ${answers.level}, ${answers.participants} participants, durée ${answers.duration} minutes. Objectifs: ${answers.objectives}. Intensité: ${answers.intensity}. Catégorie d'âge: ${answers.ageCategory}.`;
        break;
      case "creativity":
        systemPrompt += " Innove avec des exercices originaux tout en respectant les objectifs pédagogiques.";
        userPrompt = `Crée une séance innovante pour ${answers.sport}, niveau ${answers.level}. Cherche des exercices créatifs et originaux en gardant l'aspect pédagogique. Durée: ${answers.duration} minutes. Style recherché: ${answers.style}`;
        break;
    }

    console.log("Envoi de la requête à OpenAI avec:", { systemPrompt, userPrompt });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API a répondu avec le statut : ${response.status}. Erreur: ${error}`);
    }

    const data = await response.json();
    let sessionData;
    
    try {
      // On s'assure que le contenu est bien du JSON valide
      sessionData = JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error("Erreur lors du parsing JSON:", error);
      console.log("Contenu reçu:", data.choices[0].message.content);
      throw new Error('La réponse de l\'IA n\'est pas un JSON valide');
    }
    
    // Validation de base de la structure JSON
    if (!sessionData.title || !sessionData.sport || !sessionData.sequences) {
      throw new Error('La structure JSON générée est invalide ou incomplète');
    }

    console.log("Session générée avec succès:", sessionData);

    return new Response(JSON.stringify({ session: sessionData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur dans la fonction generate-session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
