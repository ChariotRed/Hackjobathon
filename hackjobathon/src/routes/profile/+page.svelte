<script>
  import { onMount } from 'svelte';
  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = 'https://your-supabase-url.supabase.co';
  const supabaseKey = 'your-anon-key';
  const supabase = createClient(supabaseUrl, supabaseKey);

  let user;

  onMount(async () => {
  const { data } = await supabase.auth.getUser();
  user = data.user;
  });
</script>
