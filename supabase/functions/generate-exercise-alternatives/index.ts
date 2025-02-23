
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
    const { exercise, sessionContext } = await req.json();
    
    // Validate input
    if (!exercise || !sessionContext) {
      throw new Error('Missing required parameters');
    }

    if (!sessionContext.sport || !sessionContext.level) {
      throw new Error('Sport and level are required in session context');
    }

    console.log('Generating alternatives for exercise:', {
      exerciseTitle: exercise.title,
      sport: sessionContext.sport,
      level: sessionContext.level
    });

    const systemPrompt = `Tu es un expert en création d'exercices d'entraînement. Tu dois proposer 2-3 alternatives à l'exercice fourni en respectant les mêmes objectifs et le contexte de la séance. IMPORTANT : Ta réponse doit contenir UNIQUEMENT du JSON valide avec le format suivant, sans aucun texte avant ou après.

{
  "alternatives": [
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
      "variations": "string[]?",
      "opposition_type": "string?",
      "decision_making_focus": "string[]?",
      "tactical_objectives": "string[]?",
      "performance_metrics": "{}?"
    }
  ]
}`;

    const userPrompt = `Propose des alternatives pour cet exercice: ${exercise.title}
Description: ${exercise.description}
Objectif: ${exercise.objective}
Type d'activité: ${exercise.activity_type}
Durée: ${exercise.duration} minutes

Contexte de la séance:
Sport: ${sessionContext.sport}
Niveau: ${sessionContext.level}
Catégorie d'âge: ${sessionContext.age_category}
Intensité globale: ${sessionContext.intensity_level}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let alternatives;
    
    try {
      alternatives = JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.log("Content received:", data.choices[0].message.content);
      throw new Error('Invalid JSON response from AI');
    }

    return new Response(JSON.stringify(alternatives), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-exercise-alternatives:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
