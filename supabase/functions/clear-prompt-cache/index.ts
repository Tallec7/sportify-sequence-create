
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { clearPromptCache, getCacheStats } from '../prompt-cache.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { template_type } = await req.json()
    
    // Obtenir les stats du cache avant la purge
    const beforeStats = getCacheStats()
    
    // Purger le cache
    clearPromptCache(template_type)
    
    // Obtenir les stats après la purge
    const afterStats = getCacheStats()
    
    console.log('Cache purge completed:', {
      template_type,
      beforeStats,
      afterStats
    })

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Cache cleared successfully',
        stats: afterStats
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error clearing cache:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})

