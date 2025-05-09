<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';
  
    let savedChallenges = [];
    let loading = true;
    let user = null;
  
    onMount(async () => {
      const { data: authData } = await supabase.auth.getUser();
      user = authData.user;
  
      if (!user) {
        loading = false;
        return;
      }
  
      const { data, error } = await supabase
        .from('saved_challenges')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error("❌ Error fetching saved_challenges'):", error);
      } else {
        savedChallenges = data;
      }
  
      loading = false;
    });
  </script>
  
  {#if loading}
    <p class="text-center text-gray-500 mt-10">Loading saved challenges...</p>
  {:else if !user}
    <p class="text-center text-red-600 mt-10">You must be logged in to view saved challenges.</p>
  {:else if savedChallenges.length === 0}
    <p class="text-center text-gray-500 mt-10">You haven’t saved any challenges yet.</p>
  {:else}
    <div class="max-w-3xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">📦 Your Saved Stack Challenges</h2>
  
      <ul class="space-y-4">
        {#each savedChallenges as stack}
          <li class="border p-4 rounded bg-white shadow hover:shadow-lg transition">
            <div class="grid grid-cols-2 gap-2">
              <p><strong>Frontend:</strong> {stack.frontend}</p>
              <p><strong>Backend:</strong> {stack.backend}</p>
              <p><strong>Database:</strong> {stack.database}</p>
              <p><strong>Styling:</strong> {stack.styling}</p>
              <p><strong>Deploy:</strong> {stack.deploy}</p>
              <p><strong>Status:</strong> {stack.status}</p>
            </div>
            <p class="text-xs text-gray-500 mt-2">Saved: {new Date(stack.created_at).toLocaleString()}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  