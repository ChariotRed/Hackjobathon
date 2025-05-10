<script>
	import '../app.css';
	import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  export let data;

  let user = null;
  let isGuest = false;
  let menuOpen = false;

  onMount(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    user = sessionData?.session?.user;

    if (!user) {
      const guest = sessionStorage.getItem('guest');
      if (guest) {
        isGuest = true;
      } else if (window.location.pathname !== '/') {
        goto('/');
      }
    }

    supabase.auth.onAuthStateChange((event, session) => {
      user = session?.user || null;
      if (user) {
        isGuest = false;
        sessionStorage.removeItem('guest');
      }
    });
  });
  </script>

<nav class="bg-dark shadow">
  <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:justify-between items-center">
    <h1 class="text-3xl font-bold text-black mb-4 md:mb-0">🛠️Hack-job-athon</h1>
    <button
      class="text-black md:hidden focus:outline-none"
      on:click={() => (menuOpen = !menuOpen)}
    >
      ☰
    </button>
    <ul
      class="hidden md:flex flex-row space-x-4 w-auto justify-start"
    >
      <li><a href="/" class="text-black hover:text-indigo-600">Home</a></li>
      <li><a href="/" class="text-black hover:text-indigo-600">About</a></li>
      <li><a href="https://chariotred.github.io/BarrettPortfolio/" class="text-black hover:text-indigo-600">Contact</a></li>
      <li><a href="/saved" class="text-black hover:text-indigo-600">Saved Challenges</a></li>
    </ul>
  </div>
  <ul
    class="md:hidden bg-dark space-y-2 px-4 py-2 text-center"
    class:hidden={!menuOpen}
  >
    <li><a href="/" class="block text-black hover:text-indigo-600">Home</a></li>
    <li><a href="/" class="block text-black hover:text-indigo-600">About</a></li>
    <li><a href="https://chariotred.github.io/BarrettPortfolio/" class="block text-black hover:text-indigo-600">Contact</a></li>
    <li><a href="/saved" class="block text-black hover:text-indigo-600">Saved Challenges</a></li>
  </ul>
</nav>


  <slot />

<footer class="bg-dark shadow mt-0">
  <div class="max-w-7xl mx-auto px-4 py-6">
    <p class="text-center text-gray-500 text-sm">
      &copy; 2025 Hackjobathon. All rights reserved.
    </p>
    <ul>
      {#each data.countries as country}
        <li>{country.name}</li>
      {/each}
    </ul>
  </div>
</footer>