import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Optionally, log or redirect
  console.error("❌ Missing Supabase credentials in .env");
  window.location.href = '/error';
}

export const supabase = createClient(supabaseUrl, supabaseKey);
