<script>
	import '../app.css';
	import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  export let data;

  let user = null;
  let isGuest = false;

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
  <slot />