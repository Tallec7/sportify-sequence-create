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
import { Plus, Save, Pencil, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Sport {
  id?: string;
  value: string;
  label: string;
}

type TacticalConceptOption = {
  id?: string;
  value: string;
  label: string;
  sport_id?: string;
}

const DropdownSettings = () => {
  useAuthCheck();
  const [selectedSport, setSelectedSport] = useState<string>("handball");
  const [selectedTacticalConcept, setSelectedTacticalConcept] = useState<string>("");
  const [hasAccess, setHasAccess] = useState(false);
  const [sports, setSports] = useState<Sport[]>([]);
  const [tacticalConcepts, setTacticalConcepts] = useState<TacticalConceptOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingSport, setIsEditingSport] = useState<string | null>(null);
  const [editedSportValue, setEditedSportValue] = useState("");
  const [editedSportLabel, setEditedSportLabel] = useState("");
  const [newSportValue, setNewSportValue] = useState("");
  const [newSportLabel, setNewSportLabel] = useState("");
  const [isAddingSport, setIsAddingSport] = useState(false);
  const [isEditingConcept, setIsEditingConcept] = useState<string | null>(null);
  const [editedConceptValue, setEditedConceptValue] = useState("");
  const [editedConceptLabel, setEditedConceptLabel] = useState("");
  const [newConceptValue, setNewConceptValue] = useState("");
  const [newConceptLabel, setNewConceptLabel] = useState("");
  const [isAddingConcept, setIsAddingConcept] = useState(false);
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
        .select('id, value, label')
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
          .select('id, value, label')
          .eq('sport_id', sportData.id)
          .order('label');

        if (error) throw error;
        setTacticalConcepts(data || []);
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

  const handleAddSport = async () => {
    if (!newSportValue || !newSportLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('sports')
        .insert([{ value: newSportValue, label: newSportLabel }]);

      if (error) throw error;

      toast({
        title: "Sport ajouté",
        description: `Le sport ${newSportLabel} a été ajouté avec succès`
      });

      setNewSportValue("");
      setNewSportLabel("");
      setIsAddingSport(false);
      fetchSports();
    } catch (error) {
      console.error('Error adding sport:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le sport"
      });
    }
  };

  const handleEditSport = async (id: string) => {
    if (!editedSportValue || !editedSportLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('sports')
        .update({ value: editedSportValue, label: editedSportLabel })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sport modifié",
        description: `Le sport a été modifié avec succès`
      });

      setIsEditingSport(null);
      fetchSports();
    } catch (error) {
      console.error('Error updating sport:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le sport"
      });
    }
  };

  const handleDeleteSport = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sports')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sport supprimé",
        description: "Le sport a été supprimé avec succès"
      });

      fetchSports();
    } catch (error) {
      console.error('Error deleting sport:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le sport"
      });
    }
  };

  const handleAddConcept = async () => {
    if (!newConceptValue || !newConceptLabel || !selectedSport) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs et sélectionner un sport"
      });
      return;
    }

    try {
      const { data: sportData } = await supabase
        .from('sports')
        .select('id')
        .eq('value', selectedSport)
        .single();

      if (!sportData) throw new Error("Sport non trouvé");

      const { error } = await supabase
        .from('tactical_concepts')
        .insert([{
          value: newConceptValue,
          label: newConceptLabel,
          sport_id: sportData.id
        }]);

      if (error) throw error;

      toast({
        title: "Concept tactique ajouté",
        description: `Le concept ${newConceptLabel} a été ajouté avec succès`
      });

      setNewConceptValue("");
      setNewConceptLabel("");
      setIsAddingConcept(false);
      fetchTacticalConcepts(selectedSport);
    } catch (error) {
      console.error('Error adding tactical concept:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le concept tactique"
      });
    }
  };

  const handleEditConcept = async (id: string) => {
    if (!editedConceptValue || !editedConceptLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('tactical_concepts')
        .update({ value: editedConceptValue, label: editedConceptLabel })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Concept tactique modifié",
        description: `Le concept a été modifié avec succès`
      });

      setIsEditingConcept(null);
      fetchTacticalConcepts(selectedSport);
    } catch (error) {
      console.error('Error updating tactical concept:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le concept tactique"
      });
    }
  };

  const handleDeleteConcept = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tactical_concepts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Concept tactique supprimé",
        description: "Le concept tactique a été supprimé avec succès"
      });

      fetchTacticalConcepts(selectedSport);
    } catch (error) {
      console.error('Error deleting tactical concept:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le concept tactique"
      });
    }
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
        <h2 className="text-2xl font-semibold mb-6">Paramètres des listes déroulantes</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-4">
              <Label>Sports</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setIsAddingSport(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un sport
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau sport</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Identifiant unique</Label>
                      <Input
                        value={newSportValue}
                        onChange={(e) => setNewSportValue(e.target.value)}
                        placeholder="handball"
                      />
                    </div>
                    <div>
                      <Label>Nom affiché</Label>
                      <Input
                        value={newSportLabel}
                        onChange={(e) => setNewSportLabel(e.target.value)}
                        placeholder="Handball"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingSport(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleAddSport}>
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {sports.map((sport) => (
                <div key={sport.id} className="flex items-center justify-between p-2 rounded border bg-background">
                  {isEditingSport === sport.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={editedSportValue}
                        onChange={(e) => setEditedSportValue(e.target.value)}
                        placeholder="Identifiant unique"
                        className="max-w-[200px]"
                      />
                      <Input
                        value={editedSportLabel}
                        onChange={(e) => setEditedSportLabel(e.target.value)}
                        placeholder="Nom affiché"
                      />
                    </div>
                  ) : (
                    <span>{sport.label} ({sport.value})</span>
                  )}
                  <div className="flex gap-2">
                    {isEditingSport === sport.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditSport(sport.id!)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsEditingSport(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditingSport(sport.id!);
                            setEditedSportValue(sport.value);
                            setEditedSportLabel(sport.label);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. Cela supprimera définitivement le sport
                                et tous les concepts tactiques associés.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteSport(sport.id!)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-4">
              <Label>Concept tactique</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setIsAddingConcept(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un concept
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau concept tactique</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Identifiant unique</Label>
                      <Input
                        value={newConceptValue}
                        onChange={(e) => setNewConceptValue(e.target.value)}
                        placeholder="defense_zone"
                      />
                    </div>
                    <div>
                      <Label>Nom affiché</Label>
                      <Input
                        value={newConceptLabel}
                        onChange={(e) => setNewConceptLabel(e.target.value)}
                        placeholder="Défense de zone"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingConcept(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleAddConcept}>
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

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

            <div className="space-y-2 mt-4">
              {tacticalConcepts.map((concept) => (
                <div key={concept.id} className="flex items-center justify-between p-2 rounded border bg-background">
                  {isEditingConcept === concept.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={editedConceptValue}
                        onChange={(e) => setEditedConceptValue(e.target.value)}
                        placeholder="Identifiant unique"
                        className="max-w-[200px]"
                      />
                      <Input
                        value={editedConceptLabel}
                        onChange={(e) => setEditedConceptLabel(e.target.value)}
                        placeholder="Nom affiché"
                      />
                    </div>
                  ) : (
                    <span>{concept.label} ({concept.value})</span>
                  )}
                  <div className="flex gap-2">
                    {isEditingConcept === concept.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditConcept(concept.id!)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsEditingConcept(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditingConcept(concept.id!);
                            setEditedConceptValue(concept.value);
                            setEditedConceptLabel(concept.label);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. Cela supprimera définitivement ce concept tactique.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteConcept(concept.id!)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropdownSettings;
