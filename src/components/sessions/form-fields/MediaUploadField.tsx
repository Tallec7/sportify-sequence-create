
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/components/ui/use-toast'

interface MediaUploadFieldProps {
  label: string
  accept: string
  value?: string
  onChange: (url: string | undefined) => void
}

export const MediaUploadField = ({ label, accept, value, onChange }: MediaUploadFieldProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('exercise-media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('exercise-media')
        .getPublicUrl(filePath)

      onChange(data.publicUrl)
      toast({
        title: "Succès",
        description: "Le fichier a été téléchargé avec succès.",
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement du fichier.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange(undefined)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {value ? (
          <div className="flex items-center gap-2">
            {accept.includes('image') ? (
              <img src={value} alt={label} className="h-20 w-20 object-cover rounded-md" />
            ) : (
              <video src={value} className="h-20 w-20 object-cover rounded-md" controls />
            )}
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept={accept}
              onChange={handleUpload}
              disabled={isUploading}
              className="w-full"
            />
            {isUploading && <Upload className="h-4 w-4 animate-bounce" />}
          </div>
        )}
      </div>
    </div>
  )
}
