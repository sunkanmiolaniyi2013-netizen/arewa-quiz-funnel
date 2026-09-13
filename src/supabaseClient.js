import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a singleton instance to the Master Database
export const supabase = supabaseUrl && supabaseUrl !== "https://YOUR_SUPABASE_URL.supabase.co"
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to check if credentials are provided
export const isSupabaseConfigured = () => supabase !== null;
