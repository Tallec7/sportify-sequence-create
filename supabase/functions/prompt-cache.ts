
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface CachedPrompt {
  text: string;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
const promptCache = new Map<string, CachedPrompt>();

export async function getPromptFromCache(
  supabase: ReturnType<typeof createClient>,
  templateType: string,
  mode: string = 'express',
  sport: string | null = null
): Promise<string | null> {
  const cacheKey = `${templateType}_${mode}_${sport || 'all'}`;
  console.log('Recherche du prompt avec les paramètres:', { templateType, mode, sport, cacheKey });
  
  const cachedPrompt = promptCache.get(cacheKey);
  
  if (cachedPrompt && Date.now() - cachedPrompt.timestamp < CACHE_DURATION) {
    console.log(`Cache hit pour la clé: ${cacheKey}`);
    return cachedPrompt.text;
  }

  console.log('Cache miss, requête à la base de données...');

  try {
    // Vérifier d'abord le nombre total de templates
    const { count } = await supabase
      .from('prompt_templates')
      .select('*', { count: 'exact', head: true });

    console.log(`Nombre total de templates dans la base: ${count}`);

    // Construction de la requête avec les filtres
    let query = supabase
      .from('prompt_templates')
      .select('prompt_text')
      .eq('is_active', true)
      .eq('training_type', templateType)
      .eq('mode', mode);

    if (sport) {
      query = query.eq('sport_id', sport);
    }

    const { data: templateData, error } = await query
      .order('is_default', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('Aucun template trouvé avec les paramètres:', { templateType, mode, sport });
        return null;
      }
      console.error('Erreur lors de la récupération du template:', error);
      throw error;
    }

    if (templateData) {
      promptCache.set(cacheKey, {
        text: templateData.prompt_text,
        timestamp: Date.now()
      });
      console.log(`Cache mis à jour pour la clé: ${cacheKey}`);
      return templateData.prompt_text;
    }

    console.log('Aucun template trouvé, retour null');
    return null;
  } catch (error) {
    console.error('Échec de la récupération du template:', error);
    return null;
  }
}

export function clearPromptCache(templateType?: string) {
  if (templateType) {
    console.log(`Nettoyage du cache pour le type: ${templateType}`);
    // Supprimer toutes les entrées qui commencent par ce type
    for (const key of promptCache.keys()) {
      if (key.startsWith(templateType)) {
        promptCache.delete(key);
      }
    }
  } else {
    console.log('Nettoyage complet du cache');
    promptCache.clear();
  }
}

export function getCacheStats() {
  const stats = {
    size: promptCache.size,
    keys: Array.from(promptCache.keys()),
    timestamps: Array.from(promptCache.values()).map(v => v.timestamp),
  };
  console.log('Statistiques du cache:', stats);
  return stats;
}

