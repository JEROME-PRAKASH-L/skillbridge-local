export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          availability: string
          created_at: string
          id: string
          pitch: string
          status: Database["public"]["Enums"]["application_status"]
          student_id: string
          task_id: string
          updated_at: string
        }
        Insert: {
          availability: string
          created_at?: string
          id?: string
          pitch: string
          status?: Database["public"]["Enums"]["application_status"]
          student_id: string
          task_id: string
          updated_at?: string
        }
        Update: {
          availability?: string
          created_at?: string
          id?: string
          pitch?: string
          status?: Database["public"]["Enums"]["application_status"]
          student_id?: string
          task_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability: string | null
          bio: string | null
          course: string | null
          created_at: string
          display_name: string
          id: string
          location: string
          organization_name: string | null
          portfolio_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          skills: string[]
          updated_at: string
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          display_name: string
          id: string
          location?: string
          organization_name?: string | null
          portfolio_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[]
          updated_at?: string
        }
        Update: {
          availability?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          display_name?: string
          id?: string
          location?: string
          organization_name?: string | null
          portfolio_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      task_updates: {
        Row: {
          actor_id: string
          created_at: string
          from_status: Database["public"]["Enums"]["task_status"] | null
          id: string
          note: string | null
          task_id: string
          to_status: Database["public"]["Enums"]["task_status"]
        }
        Insert: {
          actor_id: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["task_status"] | null
          id?: string
          note?: string | null
          task_id: string
          to_status: Database["public"]["Enums"]["task_status"]
        }
        Update: {
          actor_id?: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["task_status"] | null
          id?: string
          note?: string | null
          task_id?: string
          to_status?: Database["public"]["Enums"]["task_status"]
        }
        Relationships: [
          {
            foreignKeyName: "task_updates_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_updates_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          acceptance_criteria: string[]
          assigned_student_id: string | null
          budget_amount: number
          business_id: string | null
          business_name_snapshot: string
          category: string
          created_at: string
          deliverables: string[]
          description: string
          desired_outcome: string | null
          duration_label: string
          estimated_hours: number
          id: string
          location: string
          mock_payment_status: string
          progress: number
          scope_summary: string
          skills: string[]
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
          visibility: string
        }
        Insert: {
          acceptance_criteria?: string[]
          assigned_student_id?: string | null
          budget_amount?: number
          business_id?: string | null
          business_name_snapshot: string
          category: string
          created_at?: string
          deliverables?: string[]
          description: string
          desired_outcome?: string | null
          duration_label: string
          estimated_hours?: number
          id?: string
          location?: string
          mock_payment_status?: string
          progress?: number
          scope_summary: string
          skills?: string[]
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          acceptance_criteria?: string[]
          assigned_student_id?: string | null
          budget_amount?: number
          business_id?: string | null
          business_name_snapshot?: string
          category?: string
          created_at?: string
          deliverables?: string[]
          description?: string
          desired_outcome?: string | null
          duration_label?: string
          estimated_hours?: number
          id?: string
          location?: string
          mock_payment_status?: string
          progress?: number
          scope_summary?: string
          skills?: string[]
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_student_id_fkey"
            columns: ["assigned_student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "pending" | "shortlisted" | "accepted" | "declined"
      task_status:
        | "open"
        | "reviewing"
        | "assigned"
        | "in_progress"
        | "review"
        | "completed"
      user_role: "business" | "student" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "shortlisted", "accepted", "declined"],
      task_status: [
        "open",
        "reviewing",
        "assigned",
        "in_progress",
        "review",
        "completed",
      ],
      user_role: ["business", "student", "admin"],
    },
  },
} as const

