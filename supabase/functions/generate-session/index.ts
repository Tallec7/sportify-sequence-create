
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
    
    // Construire le prompt selon le mode
    let systemPrompt = "Tu es un expert en création de séances d'entraînement.";
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

    console.log("Sending request to OpenAI with:", { systemPrompt, userPrompt });

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
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI');
    }

    return new Response(JSON.stringify({ session: data.choices[0].message.content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-session function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
