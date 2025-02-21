
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TacticalConcept } from "@/types/sequence";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

interface Sport {
  value: string;
  label: string;
}

interface TacticalConceptOption {
  value: TacticalConcept;
  label: string;
}

const DropdownSettings = () => {
  useAuthCheck(); // Protect this route
  const [selectedSport, setSelectedSport] = useState<string>("handball");
  const [selectedTacticalConcept, setSelectedTacticalConcept] = useState<TacticalConcept | "">("");
  const [hasAccess, setHasAccess] = useState(false);
  const [sports, setSports] = useState<Sport[]>([]);
  const [tacticalConcepts, setTacticalConcepts] = useState<TacticalConceptOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUserAccess();
    fetchSports();
  }, []);

  useEffect(() => {
    if (selectedSport) {
      fetchTacticalConcepts(selectedSport);
    }
  }, [selectedSport]);

  const checkUserAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id);

    const userRoles = roles?.map(r => r.role) || [];
    const hasAccess = userRoles.some(role => ['admin', 'user_plus'].includes(role));
    
    if (!hasAccess) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous n'avez pas les droits nécessaires pour accéder à cette page"
      });
      navigate('/dashboard');
      return;
    }
    
    setHasAccess(true);
  };

  const fetchSports = async () => {
    try {
      const { data, error } = await supabase
        .from('sports')
        .select('value, label')
        .order('label');

      if (error) throw error;
      setSports(data || []);
    } catch (error) {
      console.error('Error fetching sports:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des sports"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTacticalConcepts = async (sportValue: string) => {
    try {
      const { data: sportData } = await supabase
        .from('sports')
        .select('id')
        .eq('value', sportValue)
        .single();

      if (sportData) {
        const { data, error } = await supabase
          .from('tactical_concepts')
          .select('value, label')
          .eq('sport_id', sportData.id)
          .order('label');

        if (error) throw error;
        setTacticalConcepts(data as TacticalConceptOption[] || []);
      }
    } catch (error) {
      console.error('Error fetching tactical concepts:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les concepts tactiques"
      });
    }
  };

  const handleSave = async () => {
    // In the future, this could save configurations to the database
    toast({
      title: "Configuration sauvegardée",
      description: `Sport: ${selectedSport}, Concept: ${selectedTacticalConcept}`
    });
  };

  if (!hasAccess || isLoading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-8 space-y-8"
    >
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Paramètres des listes déroulantes</h2>
          <Button onClick={handleSave} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Sport</Label>
            <Select
              value={selectedSport}
              onValueChange={(value) => setSelectedSport(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport.value} value={sport.value}>
                    {sport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Concept tactique</Label>
            <Select
              value={selectedTacticalConcept}
              onValueChange={(value: TacticalConcept) => setSelectedTacticalConcept(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un concept tactique" />
              </SelectTrigger>
              <SelectContent>
                {tacticalConcepts.map((concept) => (
                  <SelectItem key={concept.value} value={concept.value}>
                    {concept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropdownSettings;
