<script>
    import { supabase } from '$lib/supabaseClient';
    let email = '';
    let password = '';
    let message = '';
  
    async function login() {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      message = error ? error.message : 'Logged in!';
    }
  
    async function signup() {
      const { error } = await supabase.auth.signUp({ email, password });
      message = error ? error.message : 'Signup successful!';
    }
  </script>
  
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Login / Signup</h1>
  
    <input class="w-full border p-2 mb-2" type="email" bind:value={email} placeholder="Email" />
    <input class="w-full border p-2 mb-4" type="password" bind:value={password} placeholder="Password" />
  
    <div class="flex gap-4">
      <button class="bg-blue-600 text-white px-4 py-2 rounded" on:click={login}>Login</button>
      <button class="bg-green-600 text-white px-4 py-2 rounded" on:click={signup}>Sign Up</button>
    </div>

    <button on:click={async () => await supabase.auth.signOut()}>
        Logout
      </button>
  
    {#if message}
      <p class="mt-4 text-sm text-red-600">{message}</p>
    {/if}
  </div>
  