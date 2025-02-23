
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { mode, answers } = await req.json();
    
    // Fetch the appropriate prompt template
    const { data: templateData, error: templateError } = await supabase
      .from('prompt_templates')
      .select('prompt_text')
      .eq('training_type', 'session_generation')
      .eq('is_active', true)
      .order('is_default', { ascending: false })
      .limit(1)
      .single();

    if (templateError) {
      console.error('Error fetching prompt template:', templateError);
      throw new Error('Failed to fetch prompt template');
    }

    const systemPrompt = templateData.prompt_text;

    let userPrompt = "";

    switch (mode) {
      case "express":
        userPrompt = `Crée une séance d'entraînement pour ${answers.sport}, niveau ${answers.level}, avec ${answers.participants} participants, durée ${answers.duration} minutes.`;
        break;
      case "expert":
        userPrompt = `Crée une séance détaillée pour ${answers.sport}, niveau ${answers.level}, ${answers.participants} participants, durée ${answers.duration} minutes. Objectifs: ${answers.objectives}. Intensité: ${answers.intensity}. Catégorie d'âge: ${answers.ageCategory}.`;
        break;
      case "creativity":
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
      sessionData = JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error("Erreur lors du parsing JSON:", error);
      console.log("Contenu reçu:", data.choices[0].message.content);
      throw new Error('La réponse de l\'IA n\'est pas un JSON valide');
    }
    
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
