import { createClient } from '@supabase/supabase-js';

// These lines pull your keys from GitHub Secrets
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This part prevents the app from crashing if keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are missing. Check your GitHub Secrets.");
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);
