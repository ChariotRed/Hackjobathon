<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  export const data = {};

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'https://hackjobathon.vercel.app' 
      }
    });
  };

  function continueAsGuest() {
    sessionStorage.setItem('guest', 'true');
    goto('/stack');
  }

  
</script>

<svelte:head>
  <title>Hack-Job-Athon | Enter the Arena</title>
</svelte:head>
<div class="relative z-10  bg-gradient-to-br from-slate-100/50 to-blue-50/50 flex flex-col justify-center items-center text-center px-6 py-10 min-h-screen">
  <h1 class="animate-fadeInDown text-5xl sm:text-6xl font-extrabold text-indigo-800 mb-4 tracking-tight">Test your wit!</h1>

  <p class="text-lg text-gray-700 max-w-2xl mb-8 leading-relaxed">
    Welcome to the ultimate developer showdown!<br> You'll spin a randomized tech stack, build fast against the clock, and climb the leaderboard as you prove your skills under pressure. Good luck!
  </p>

    <div class="flex space-x-4">
      <button on:click={signInWithGitHub} class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
        Sign in with GitHub
      </button>

      <button
        on:click={continueAsGuest}
        class="bg-white hover:bg-gray-100 text-indigo-700 border border-indigo-400 font-semibold px-6 py-3 rounded-lg shadow transition" >
        Continue as Guest
      </button>
    </div>
    <!-- <p class="text-sm text-gray-500 mt-6 max-w-md italic">
      You can always sign in later to save your progress and unlock achievements.
    </p> -->
  </div>

    





