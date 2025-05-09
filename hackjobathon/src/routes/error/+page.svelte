<script>
  import { onMount } from 'svelte';

  onMount(() => {
    console.error('⚠️ Supabase environment variables not configured correctly.');
  });
</script>

<svelte:head>
  <title>Configuration Error - Stack Roulette</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white px-6 py-12">
  <div class="max-w-md text-center bg-white shadow-lg border border-red-200 rounded-xl p-8">
    <div class="text-6xl mb-4">🚫</div>
    <h1 class="text-3xl font-bold text-red-700 mb-4">Configuration Error</h1>

    <p class="text-gray-700 mb-6">
      The application failed to initialize because essential configuration values are missing.
    </p>

    <div class="bg-red-100 text-red-800 p-4 rounded text-sm mb-6">
      <strong>Missing:</strong><br />
      <code>VITE_SUPABASE_URL</code><br />
      <code>VITE_SUPABASE_ANON_KEY</code>
    </div>

    <p class="text-sm text-gray-500 mb-6">
      Please update your <code>.env</code> file in the root of your project and restart the server.
    </p>

    <a href="/" class="text-blue-600 hover:underline font-medium">← Return to homepage</a>
  </div>
</div>
