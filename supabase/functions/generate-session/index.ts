
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.1';
import { getPromptFromCache } from '../prompt-cache.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const fallbackPrompts = {
  express: 'Tu es un assistant spécialisé dans la création de séances d\'entraînement express...',
  expert: 'Tu es un assistant spécialisé dans la création de séances d\'entraînement détaillées...',
  creativity: 'Tu es un assistant spécialisé dans la création de séances d\'entraînement innovantes...'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('Requête reçue:', requestBody);

    // Validation stricte du mode
    if (!requestBody.mode) {
      throw new Error("Le paramètre 'mode' est obligatoire pour la génération de séance");
    }

    const { mode, answers } = requestBody;
    console.log('Mode reçu:', mode);

    // Validation du type de mode
    if (!['express', 'expert', 'creativity'].includes(mode)) {
      throw new Error(`Mode invalide: ${mode}. Les modes acceptés sont: express, expert, creativity`);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const templateType = `session_generation_${mode}`;
    const sportId = answers.sport || null;
    
    console.log('Paramètres de génération:', { mode, templateType, sportId, answers });
    
    let systemPrompt = await getPromptFromCache(supabase, templateType, mode, sportId);

    if (!systemPrompt) {
      console.warn(`Utilisation du prompt de secours pour le mode: ${mode}`);
      systemPrompt = fallbackPrompts[mode];
      
      await supabase
        .from('prompt_errors')
        .insert({
          training_type: templateType,
          mode: mode,
          error_type: 'template_not_found',
          details: {
            answers: answers,
            sport: sportId,
            timestamp: new Date().toISOString()
          }
        });
    }

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
      default:
        throw new Error(`Mode non géré: ${mode}`);
    }

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
      await supabase
        .from('prompt_errors')
        .insert({
          training_type: templateType,
          mode: mode,
          error_type: 'generation_error',
          details: {
            error: error,
            status: response.status,
            answers: answers
          }
        });
      throw new Error(`OpenAI API a répondu avec le statut : ${response.status}. Erreur: ${error}`);
    }

    const data = await response.json();
    let sessionData;
    
    try {
      sessionData = JSON.parse(data.choices[0].message.content);
    } catch (error) {
      await supabase
        .from('prompt_errors')
        .insert({
          training_type: templateType,
          mode: mode,
          error_type: 'parsing_error',
          details: {
            raw_content: data.choices[0].message.content,
            error: error.message,
            answers: answers
          }
        });
      console.error("Erreur lors du parsing JSON:", error);
      console.log("Contenu reçu:", data.choices[0].message.content);
      throw new Error('La réponse de l\'IA n\'est pas un JSON valide');
    }
    
    if (!sessionData.title || !sessionData.sport || !sessionData.sequences) {
      await supabase
        .from('prompt_errors')
        .insert({
          training_type: templateType,
          mode: mode,
          error_type: 'validation_error',
          details: {
            session_data: sessionData,
            answers: answers
          }
        });
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
