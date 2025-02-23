
export type SessionFormData = {
  title: string;
  description: string;
  sport: string;
  level: string;
  duration: number;
  participants_min: number;
  participants_max: number;
  age_category: "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior";
  intensity_level: string;
  cycle_id: string | null;
  objective: string;
}
