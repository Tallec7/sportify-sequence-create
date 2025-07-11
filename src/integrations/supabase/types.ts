export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_types: {
        Row: {
          created_at: string
          id: string
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      age_categories: {
        Row: {
          created_at: string
          id: string
          is_default: boolean | null
          label: string
          label_en: string | null
          label_fr: string | null
          last_modified_at: string | null
          last_modified_by: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          rating: number | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          rating?: number | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          rating?: number | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      error_alerts: {
        Row: {
          error_type: Database["public"]["Enums"]["error_type"]
          first_occurrence: string | null
          id: string
          is_resolved: boolean | null
          last_occurrence: string | null
          occurrence_count: number | null
          page_name: string
        }
        Insert: {
          error_type: Database["public"]["Enums"]["error_type"]
          first_occurrence?: string | null
          id?: string
          is_resolved?: boolean | null
          last_occurrence?: string | null
          occurrence_count?: number | null
          page_name: string
        }
        Update: {
          error_type?: Database["public"]["Enums"]["error_type"]
          first_occurrence?: string | null
          id?: string
          is_resolved?: boolean | null
          last_occurrence?: string | null
          occurrence_count?: number | null
          page_name?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      intensity_levels: {
        Row: {
          created_at: string
          id: string
          is_default: boolean | null
          label: string
          label_en: string | null
          label_fr: string | null
          last_modified_at: string | null
          last_modified_by: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      levels: {
        Row: {
          created_at: string
          id: string
          is_default: boolean | null
          label: string
          label_en: string | null
          label_fr: string | null
          last_modified_at: string | null
          last_modified_by: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      phase_success_criteria: {
        Row: {
          created_at: string | null
          description: string
          id: string
          phase_id: string | null
          target_value: number | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          phase_id?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          phase_id?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phase_success_criteria_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      phases: {
        Row: {
          activity_type: Database["public"]["Enums"]["activity_type_enum"]
          coach_instructions: string | null
          created_at: string | null
          decision_making_focus: string[] | null
          description: string
          diagram_url: string | null
          duration: number
          exercise_order: number
          id: string
          intensity_level: string | null
          objective: string
          opposition_type: string | null
          performance_metrics: Json | null
          player_instructions: string | null
          progression_level: number | null
          sequence_id: string | null
          setup_instructions: string | null
          tactical_concepts:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          tactical_objectives: string[] | null
          title: string
          updated_at: string | null
          variations: string[] | null
          video_url: string | null
        }
        Insert: {
          activity_type?: Database["public"]["Enums"]["activity_type_enum"]
          coach_instructions?: string | null
          created_at?: string | null
          decision_making_focus?: string[] | null
          description: string
          diagram_url?: string | null
          duration: number
          exercise_order: number
          id?: string
          intensity_level?: string | null
          objective: string
          opposition_type?: string | null
          performance_metrics?: Json | null
          player_instructions?: string | null
          progression_level?: number | null
          sequence_id?: string | null
          setup_instructions?: string | null
          tactical_concepts?:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          tactical_objectives?: string[] | null
          title: string
          updated_at?: string | null
          variations?: string[] | null
          video_url?: string | null
        }
        Update: {
          activity_type?: Database["public"]["Enums"]["activity_type_enum"]
          coach_instructions?: string | null
          created_at?: string | null
          decision_making_focus?: string[] | null
          description?: string
          diagram_url?: string | null
          duration?: number
          exercise_order?: number
          id?: string
          intensity_level?: string | null
          objective?: string
          opposition_type?: string | null
          performance_metrics?: Json | null
          player_instructions?: string | null
          progression_level?: number | null
          sequence_id?: string | null
          setup_instructions?: string | null
          tactical_concepts?:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          tactical_objectives?: string[] | null
          title?: string
          updated_at?: string | null
          variations?: string[] | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "session_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_exercises_intensity_level"
            columns: ["intensity_level"]
            isOneToOne: false
            referencedRelation: "intensity_levels"
            referencedColumns: ["value"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      progression_levels: {
        Row: {
          created_at: string
          id: string
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      prompt_errors: {
        Row: {
          created_at: string | null
          details: Json | null
          error_type: string
          id: string
          mode: string
          resolved_at: string | null
          timestamp: string
          training_type: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          error_type: string
          id?: string
          mode?: string
          resolved_at?: string | null
          timestamp?: string
          training_type: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          error_type?: string
          id?: string
          mode?: string
          resolved_at?: string | null
          timestamp?: string
          training_type?: string
        }
        Relationships: []
      }
      prompt_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          prompt_text: string
          template_id: string | null
          test_results: Json | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          prompt_text: string
          template_id?: string | null
          test_results?: Json | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          prompt_text?: string
          template_id?: string | null
          test_results?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_history_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "prompt_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_retrieval_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          mode: string
          sport_id: string | null
          success: boolean
          template_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          mode: string
          sport_id?: string | null
          success: boolean
          template_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          mode?: string
          sport_id?: string | null
          success?: boolean
          template_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_retrieval_logs_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          is_validated: boolean | null
          mode: string | null
          prompt_text: string
          sport_id: string | null
          training_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          is_validated?: boolean | null
          mode?: string | null
          prompt_text: string
          sport_id?: string | null
          training_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          is_validated?: boolean | null
          mode?: string | null
          prompt_text?: string
          sport_id?: string | null
          training_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_templates_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_test_results: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          template_id: string | null
          test_input: Json
          test_output: Json
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          template_id?: string | null
          test_input: Json
          test_output: Json
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          template_id?: string | null
          test_input?: Json
          test_output?: Json
        }
        Relationships: [
          {
            foreignKeyName: "prompt_test_results_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "prompt_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      sequence_objectives: {
        Row: {
          created_at: string | null
          description: string
          id: string
          is_priority: boolean | null
          objective_type: Database["public"]["Enums"]["objective_type_enum"]
          order_index: number | null
          sequence_id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          is_priority?: boolean | null
          objective_type: Database["public"]["Enums"]["objective_type_enum"]
          order_index?: number | null
          sequence_id: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          is_priority?: boolean | null
          objective_type?: Database["public"]["Enums"]["objective_type_enum"]
          order_index?: number | null
          sequence_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sequence_objectives_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "session_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      sequence_types: {
        Row: {
          created_at: string
          id: string
          is_default: boolean | null
          label: string
          label_en: string | null
          label_fr: string | null
          last_modified_at: string | null
          last_modified_by: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string
          label_en?: string | null
          label_fr?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      session_objectives: {
        Row: {
          created_at: string | null
          description: string
          id: string
          is_priority: boolean | null
          objective_type: Database["public"]["Enums"]["objective_type_enum"]
          order_index: number | null
          session_id: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          is_priority?: boolean | null
          objective_type: Database["public"]["Enums"]["objective_type_enum"]
          order_index?: number | null
          session_id?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          is_priority?: boolean | null
          objective_type?: Database["public"]["Enums"]["objective_type_enum"]
          order_index?: number | null
          session_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_objectives_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_recommendations: {
        Row: {
          created_at: string | null
          id: string
          recommended_session_id: string | null
          score: number
          session_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          recommended_session_id?: string | null
          score?: number
          session_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          recommended_session_id?: string | null
          score?: number
          session_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_recommendations_recommended_session_id_fkey"
            columns: ["recommended_session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_recommendations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_sequences: {
        Row: {
          created_at: string | null
          decision_making_focus: string[] | null
          description: string | null
          duration: number
          id: string
          intensity_level: string | null
          objective: string
          performance_metrics: Json | null
          sequence_order: number
          sequence_type: string | null
          session_id: string | null
          tactical_concepts:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          decision_making_focus?: string[] | null
          description?: string | null
          duration: number
          id?: string
          intensity_level?: string | null
          objective: string
          performance_metrics?: Json | null
          sequence_order: number
          sequence_type?: string | null
          session_id?: string | null
          tactical_concepts?:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          decision_making_focus?: string[] | null
          description?: string | null
          duration?: number
          id?: string
          intensity_level?: string | null
          objective?: string
          performance_metrics?: Json | null
          sequence_order?: number
          sequence_type?: string | null
          session_id?: string | null
          tactical_concepts?:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sequences_intensity_level"
            columns: ["intensity_level"]
            isOneToOne: false
            referencedRelation: "intensity_levels"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "fk_sequences_sequence_type"
            columns: ["sequence_type"]
            isOneToOne: false
            referencedRelation: "sequence_types"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "session_sequences_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_stats: {
        Row: {
          created_at: string | null
          downloads: number | null
          id: string
          last_viewed_at: string | null
          session_id: string | null
          views: number | null
        }
        Insert: {
          created_at?: string | null
          downloads?: number | null
          id?: string
          last_viewed_at?: string | null
          session_id?: string | null
          views?: number | null
        }
        Update: {
          created_at?: string | null
          downloads?: number | null
          id?: string
          last_viewed_at?: string | null
          session_id?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "session_stats_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          age_category: Database["public"]["Enums"]["age_category_enum"]
          created_at: string | null
          cycle_id: string | null
          decision_making_focus: string[] | null
          description: string | null
          duration: number
          expert_validated: boolean | null
          id: string
          intensity_level: string | null
          level: string
          objective: string | null
          participants_max: number
          participants_min: number
          performance_metrics: Json | null
          sport: string
          status: Database["public"]["Enums"]["session_status_enum"] | null
          submitted_at: string | null
          tactical_concepts:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          title: string
          user_id: string | null
          validated_at: string | null
          validated_by: string | null
          validation_feedback: string | null
        }
        Insert: {
          age_category: Database["public"]["Enums"]["age_category_enum"]
          created_at?: string | null
          cycle_id?: string | null
          decision_making_focus?: string[] | null
          description?: string | null
          duration: number
          expert_validated?: boolean | null
          id?: string
          intensity_level?: string | null
          level: string
          objective?: string | null
          participants_max: number
          participants_min: number
          performance_metrics?: Json | null
          sport: string
          status?: Database["public"]["Enums"]["session_status_enum"] | null
          submitted_at?: string | null
          tactical_concepts?:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          title: string
          user_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_feedback?: string | null
        }
        Update: {
          age_category?: Database["public"]["Enums"]["age_category_enum"]
          created_at?: string | null
          cycle_id?: string | null
          decision_making_focus?: string[] | null
          description?: string | null
          duration?: number
          expert_validated?: boolean | null
          id?: string
          intensity_level?: string | null
          level?: string
          objective?: string | null
          participants_max?: number
          participants_min?: number
          performance_metrics?: Json | null
          sport?: string
          status?: Database["public"]["Enums"]["session_status_enum"] | null
          submitted_at?: string | null
          tactical_concepts?:
            | Database["public"]["Enums"]["tactical_concept_enum"][]
            | null
          title?: string
          user_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_feedback?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sessions_intensity_level"
            columns: ["intensity_level"]
            isOneToOne: false
            referencedRelation: "intensity_levels"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "sessions_cycle_id_fkey"
            columns: ["cycle_id"]
            isOneToOne: false
            referencedRelation: "training_cycles"
            referencedColumns: ["id"]
          },
        ]
      }
      settings_history: {
        Row: {
          id: string
          modified_at: string | null
          modified_by: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string
          table_name: string
        }
        Insert: {
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id: string
          table_name: string
        }
        Update: {
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string
          table_name?: string
        }
        Relationships: []
      }
      sports: {
        Row: {
          created_at: string
          id: string
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      system_errors: {
        Row: {
          created_at: string | null
          details: Json | null
          error_message: string
          error_type: Database["public"]["Enums"]["error_type"]
          id: string
          page_name: string
          stack_trace: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          error_message: string
          error_type: Database["public"]["Enums"]["error_type"]
          id?: string
          page_name: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          error_message?: string
          error_type?: Database["public"]["Enums"]["error_type"]
          id?: string
          page_name?: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tactical_concepts: {
        Row: {
          created_at: string
          id: string
          label: string
          sport_id: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          sport_id?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          sport_id?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "tactical_concepts_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_progressions: {
        Row: {
          created_at: string | null
          current_level: number | null
          id: string
          phase_id: string | null
          progression_notes: string | null
          skill_name: string
          target_level: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_level?: number | null
          id?: string
          phase_id?: string | null
          progression_notes?: string | null
          skill_name: string
          target_level?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_level?: number | null
          id?: string
          phase_id?: string | null
          progression_notes?: string | null
          skill_name?: string
          target_level?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technical_progressions_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      training_cycles: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          season_period: string | null
          start_date: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          season_period?: string | null
          start_date?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          season_period?: string | null
          start_date?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          theme: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          theme?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          theme?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_session_recommendations: {
        Args: { target_session_id: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      log_prompt_retrieval: {
        Args: {
          p_user_id: string
          p_template_type: string
          p_mode: string
          p_sport_id: string
          p_success: boolean
          p_error_message?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      activity_type_enum: "exercise" | "situation"
      age_category_enum: "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior"
      app_role: "admin" | "user_plus" | "user"
      error_type:
        | "404"
        | "500"
        | "validation_error"
        | "sql_error"
        | "api_error"
        | "other"
      objective_type_enum:
        | "apprentissage"
        | "developpement"
        | "perfectionnement"
      session_status_enum: "draft" | "pending" | "validated" | "rejected"
      tactical_concept_enum:
        | "montee_de_balle"
        | "repli_defensif"
        | "contre_attaque"
        | "attaque_placee"
        | "defense_alignee"
        | "defense_etagee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type_enum: ["exercise", "situation"],
      age_category_enum: ["U9", "U11", "U13", "U15", "U17", "U19", "Senior"],
      app_role: ["admin", "user_plus", "user"],
      error_type: [
        "404",
        "500",
        "validation_error",
        "sql_error",
        "api_error",
        "other",
      ],
      objective_type_enum: [
        "apprentissage",
        "developpement",
        "perfectionnement",
      ],
      session_status_enum: ["draft", "pending", "validated", "rejected"],
      tactical_concept_enum: [
        "montee_de_balle",
        "repli_defensif",
        "contre_attaque",
        "attaque_placee",
        "defense_alignee",
        "defense_etagee",
      ],
    },
  },
} as const
