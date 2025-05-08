import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE ANON KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);
// Check if the environment variables are set
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Supabase URL or Anon Key is not set in the environment variables.');
}
// Check if the Supabase client is created successfully
if (!supabase) {
  console.error('Failed to create Supabase client.');
}
// Check if the Supabase client is working
supabase
  .from('stacks')
  .select('*')
  .then(({ data, error }) => {
    if (error) {
      console.error('Error fetching data from Supabase:', error);
    } else {
      console.log('Supabase client is working. Data:', data);
    }
  }, (error) => {
    console.error('Error in Supabase query:', error);
  });
  