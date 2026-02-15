export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      audits: {
        Row: {
          company_id: string;
          created_at: string;
          id: string;
          mode: Database["public"]["Enums"]["audit_mode"];
          model_response: string | null;
          owner_user_id: string;
          prompt: string | null;
          status: string;
          summary: string | null;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          id?: string;
          mode: Database["public"]["Enums"]["audit_mode"];
          model_response?: string | null;
          owner_user_id?: string;
          prompt?: string | null;
          status?: string;
          summary?: string | null;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          id?: string;
          mode?: Database["public"]["Enums"]["audit_mode"];
          model_response?: string | null;
          owner_user_id?: string;
          prompt?: string | null;
          status?: string;
          summary?: string | null;
        };
        Relationships: [];
      };
      companies: {
        Row: {
          business_name: string;
          client_email: string | null;
          client_user_id: string | null;
          created_at: string;
          id: string;
          industry: string | null;
          notes: string | null;
          owner_user_id: string;
          priority: string;
          score: number;
          stage: string;
          updated_at: string;
          website_url: string | null;
        };
        Insert: {
          business_name: string;
          client_email?: string | null;
          client_user_id?: string | null;
          created_at?: string;
          id?: string;
          industry?: string | null;
          notes?: string | null;
          owner_user_id?: string;
          priority?: string;
          score?: number;
          stage?: string;
          updated_at?: string;
          website_url?: string | null;
        };
        Update: {
          business_name?: string;
          client_email?: string | null;
          client_user_id?: string | null;
          created_at?: string;
          id?: string;
          industry?: string | null;
          notes?: string | null;
          owner_user_id?: string;
          priority?: string;
          score?: number;
          stage?: string;
          updated_at?: string;
          website_url?: string | null;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          company_id: string;
          created_at: string;
          email: string | null;
          id: string;
          name: string;
          owner_user_id: string;
          phone: string | null;
          role: string | null;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          name: string;
          owner_user_id?: string;
          phone?: string | null;
          role?: string | null;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string;
          owner_user_id?: string;
          phone?: string | null;
          role?: string | null;
        };
        Relationships: [];
      };
      portal_settings: {
        Row: {
          company_id: string;
          created_at: string;
          owner_user_id: string;
          portal_enabled: boolean;
          updated_at: string;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          owner_user_id?: string;
          portal_enabled?: boolean;
          updated_at?: string;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          owner_user_id?: string;
          portal_enabled?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          full_name: string | null;
          provider: string | null;
          provider_username: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          provider?: string | null;
          provider_username?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          provider?: string | null;
          provider_username?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      proposals: {
        Row: {
          company_id: string;
          created_at: string;
          html: string | null;
          id: string;
          owner_user_id: string;
          sections_json: Json;
          status: string;
          title: string;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          html?: string | null;
          id?: string;
          owner_user_id?: string;
          sections_json?: Json;
          status?: string;
          title?: string;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          html?: string | null;
          id?: string;
          owner_user_id?: string;
          sections_json?: Json;
          status?: string;
          title?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          company_id: string;
          created_at: string;
          created_by: string;
          due_at: string | null;
          id: string;
          notes: string | null;
          owner_user_id: string;
          priority: string;
          status: string;
          title: string;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          created_by?: string;
          due_at?: string | null;
          id?: string;
          notes?: string | null;
          owner_user_id?: string;
          priority?: string;
          status?: string;
          title: string;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          created_by?: string;
          due_at?: string | null;
          id?: string;
          notes?: string | null;
          owner_user_id?: string;
          priority?: string;
          status?: string;
          title?: string;
        };
        Relationships: [];
      };
      website_scrapes: {
        Row: {
          company_id: string;
          created_at: string;
          extracted_json: Json;
          id: string;
          owner_user_id: string;
          raw_text: string | null;
          summary: string | null;
          url: string;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          extracted_json?: Json;
          id?: string;
          owner_user_id?: string;
          raw_text?: string | null;
          summary?: string | null;
          url: string;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          extracted_json?: Json;
          id?: string;
          owner_user_id?: string;
          raw_text?: string | null;
          summary?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      clients: {
        Row: {
          id: string;
          name: string;
          industry: string | null;
          timezone: string | null;
          owner_user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          industry?: string | null;
          timezone?: string | null;
          owner_user_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          industry?: string | null;
          timezone?: string | null;
          owner_user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      agents: {
        Row: {
          id: string;
          client_id: string;
          name: string;
          status: string;
          last_run_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          name?: string;
          status?: string;
          last_run_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          name?: string;
          status?: string;
          last_run_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      agent_runs: {
        Row: {
          id: string;
          client_id: string;
          agent_id: string | null;
          type: string;
          status: string;
          started_at: string | null;
          completed_at: string | null;
          summary: string | null;
          output_count: number | null;
          meta: Json | null;
          proof_url: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          agent_id?: string | null;
          type: string;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          summary?: string | null;
          output_count?: number | null;
          meta?: Json | null;
          proof_url?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          agent_id?: string | null;
          type?: string;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          summary?: string | null;
          output_count?: number | null;
          meta?: Json | null;
          proof_url?: string | null;
        };
        Relationships: [];
      };
      agent_tasks: {
        Row: {
          id: string;
          client_id: string;
          agent_id: string | null;
          run_id: string | null;
          title: string;
          source: string | null;
          output: string | null;
          status: string;
          created_at: string;
          proof_url: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          agent_id?: string | null;
          run_id?: string | null;
          title: string;
          source?: string | null;
          output?: string | null;
          status?: string;
          created_at?: string;
          proof_url?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          agent_id?: string | null;
          run_id?: string | null;
          title?: string;
          source?: string | null;
          output?: string | null;
          status?: string;
          created_at?: string;
          proof_url?: string | null;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          client_id: string;
          channel: string | null;
          direction: string | null;
          contact_name: string | null;
          contact_handle: string | null;
          last_message: string | null;
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          channel?: string | null;
          direction?: string | null;
          contact_name?: string | null;
          contact_handle?: string | null;
          last_message?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          channel?: string | null;
          direction?: string | null;
          contact_name?: string | null;
          contact_handle?: string | null;
          last_message?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      meetings: {
        Row: {
          id: string;
          client_id: string;
          contact_name: string | null;
          scheduled_for: string | null;
          status: string | null;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          contact_name?: string | null;
          scheduled_for?: string | null;
          status?: string | null;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          contact_name?: string | null;
          scheduled_for?: string | null;
          status?: string | null;
          source?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          client_id: string;
          company: string;
          channel: string | null;
          fit_score: number | null;
          reason: string | null;
          origin_task_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          company: string;
          channel?: string | null;
          fit_score?: number | null;
          reason?: string | null;
          origin_task_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          company?: string;
          channel?: string | null;
          fit_score?: number | null;
          reason?: string | null;
          origin_task_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      agent_settings: {
        Row: {
          id: string;
          client_id: string;
          industry: string | null;
          location: string | null;
          max_outreach_per_day: number | null;
          approval_required: boolean | null;
          exclude_keywords: string | null;
          offer_focus: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          industry?: string | null;
          location?: string | null;
          max_outreach_per_day?: number | null;
          approval_required?: boolean | null;
          exclude_keywords?: string | null;
          offer_focus?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          industry?: string | null;
          location?: string | null;
          max_outreach_per_day?: number | null;
          approval_required?: boolean | null;
          exclude_keywords?: string | null;
          offer_focus?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      audit_mode: "in_app" | "prompt";
    };
    CompositeTypes: Record<string, never>;
  };
}
