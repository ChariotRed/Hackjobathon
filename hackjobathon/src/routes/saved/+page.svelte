<script>
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from 'svelte';
  
    async function saveChallenge() {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        alert("Please log in to save your challenge.");
        return;
      }
  
      const { error } = await supabase
        .from('stacks')
        .insert([
          {
            user_id: user.id,
            frontend: selected.frontend,
            backend: selected.backend,
            database: selected.database,
            styling: selected.styling,
            deploy: selected.deploy,
            status: 'new'  // optionally defaulting to 'new' or 'pending'
          }
        ]);
  
      if (error) {
        console.error('❌ Error saving stack:', error);
        alert("There was an error saving your challenge.");
      } else {
        alert("✅ Stack saved successfully!");
      }
    }

    let saved = [];

  onMount(async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data, error } = await supabase
      .from('saved_challenges')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) saved = data;
  });
</script>

<h2 class="text-center text-2xl font-bold mb-4">📚 Your Saved Challenges</h2>
<ul class="space-y-2">
  {#each saved as challenge}
    <li class="border p-4 rounded">
      <p><strong>Frontend:</strong> {challenge.frontend}</p>
      <p><strong>Backend:</strong> {challenge.backend}</p>
      <p><strong>Database:</strong> {challenge.database}</p>
      <p><strong>Styling:</strong> {challenge.styling}</p>
      <p><strong>Deploy:</strong> {challenge.deploy}</p>
      <p class="text-xs text-gray-500">Saved: {new Date(challenge.created_at).toLocaleString()}</p>
    </li>
  {/each}
</ul>
  