
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface CachedPrompt {
  text: string;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
const promptCache = new Map<string, CachedPrompt>();

export async function getPromptFromCache(
  supabase: ReturnType<typeof createClient>,
  templateType: string
): Promise<string | null> {
  const cachedPrompt = promptCache.get(templateType);
  
  if (cachedPrompt && Date.now() - cachedPrompt.timestamp < CACHE_DURATION) {
    console.log(`Cache hit for template type: ${templateType}`);
    return cachedPrompt.text;
  }

  try {
    const { data: templateData, error } = await supabase
      .from('prompt_templates')
      .select('prompt_text')
      .eq('training_type', templateType)
      .eq('is_active', true)
      .order('is_default', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching prompt template:', error);
      return null;
    }

    if (templateData) {
      promptCache.set(templateType, {
        text: templateData.prompt_text,
        timestamp: Date.now()
      });
      console.log(`Cache updated for template type: ${templateType}`);
      return templateData.prompt_text;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch prompt template:', error);
    return null;
  }
}

export function clearPromptCache(templateType?: string) {
  if (templateType) {
    console.log(`Clearing cache for template type: ${templateType}`);
    promptCache.delete(templateType);
  } else {
    console.log('Clearing entire prompt cache');
    promptCache.clear();
  }
}

export function getCacheStats() {
  return {
    size: promptCache.size,
    keys: Array.from(promptCache.keys()),
    timestamps: Array.from(promptCache.values()).map(v => v.timestamp),
  };
}

