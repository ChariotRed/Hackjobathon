<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
    if (error) alert('Login failed: ' + error.message);
  }

  function continueAsGuest() {
    sessionStorage.setItem('guest', 'true');
    goto('/stack');
  }

  // List of rotating emojis
  function getEmoji(index) {
    const icons = ['⚙️', '🧠', '💻', '🚀', '🎯', '🧪', '📦', '🏆', '🕒', '🧰', '🧵', '🧱'];
    return icons[index % icons.length];
  }
</script>

<svelte:head>
  <title>Hack-Job-Athon | Enter the Arena</title>
</svelte:head>

<style>
  .orbit-ring {
    position: absolute;
    width: 100vmin;
    height: 100vmin;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }

  .orbit-ring span {
    position: absolute;
    font-size: 1.25rem;
    animation: rotate 30s linear infinite;
    transform-origin: center center;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg) translateX(40vmin) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(40vmin) rotate(-360deg);
    }
  }
</style>

<!-- Background animated dial -->
<div class="orbit-ring">
  {#each Array(12).fill(0) as _, i}
    <span style="transform: rotate({i * 30}deg) translateX(40vmin) rotate(-{i * 30}deg)">
      {getEmoji(i)}
    </span>
  {/each}
</div>

<!-- Main landing content -->
<div class="relative z-10 min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col justify-center items-center text-center px-6 py-12">
  <h1 class="text-5xl sm:text-6xl font-extrabold text-indigo-800 mb-4 tracking-tight">🛠️ Hack-Job-Athon</h1>

  <p class="text-lg text-gray-700 max-w-2xl mb-8 leading-relaxed">
    Welcome to the ultimate developer showdown. You'll spin a randomized tech stack, build fast against the clock, and climb the leaderboard as you prove your skills under pressure.
  </p>

  <div class="flex flex-col sm:flex-row gap-4">
    <button
      on:click={signInWithGithub}
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
    >
      Sign in with GitHub
    </button>

    <button
      on:click={continueAsGuest}
      class="bg-white hover:bg-gray-100 text-indigo-700 border border-indigo-400 font-semibold px-6 py-3 rounded-lg shadow transition"
    >
      Continue as Guest
    </button>
  </div>

  <p class="text-sm text-gray-500 mt-6 max-w-md italic">
    You can always sign in later to save your progress and unlock achievements.
  </p>
</div>
