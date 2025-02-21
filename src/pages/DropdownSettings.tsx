
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Exercise, TacticalConcept } from "@/types/sequence";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const DropdownSettings = () => {
  const [selectedSport, setSelectedSport] = useState<string>("handball");
  const [selectedTacticalConcept, setSelectedTacticalConcept] = useState<TacticalConcept | "">("");

  const sports = [
    { value: "handball", label: "Handball" },
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
  ];

  const tacticalConceptsByActivity: Record<string, TacticalConcept[]> = {
    handball: ["montee_de_balle", "repli_defensif", "contre_attaque", "attaque_placee", "defense_alignee", "defense_etagee"],
    basketball: ["montee_de_balle", "repli_defensif", "contre_attaque"],
    football: ["attaque_placee", "defense_alignee", "defense_etagee"],
  };

  const getConceptLabel = (concept: TacticalConcept) => {
    const labels: Record<TacticalConcept, string> = {
      montee_de_balle: "Montée de balle",
      repli_defensif: "Repli défensif",
      contre_attaque: "Contre-attaque",
      attaque_placee: "Attaque placée",
      defense_alignee: "Défense alignée",
      defense_etagee: "Défense étagée"
    };
    return labels[concept];
  };

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
                {tacticalConceptsByActivity[selectedSport]?.map((concept) => (
                  <SelectItem key={concept} value={concept}>
                    {getConceptLabel(concept)}
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
