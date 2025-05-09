<script>
    import { categories } from '$lib/categories.js';
    import { supabase } from '$lib/supabaseClient';
  
    let currentStack = {};
    let spinning = false;
    let user = null;
  
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      user = data?.user;
    }
  
    function getRandomItem(list) {
      return list[Math.floor(Math.random() * list.length)];
    }
  
    function spin() {
      spinning = true;
  
      const interval = setInterval(() => {
        for (let key in categories) {
          currentStack[key] = getRandomItem(categories[key]);
        }
      }, 100);
  
      setTimeout(() => {
        clearInterval(interval);
        spinning = false;
      }, 1500);
    }
  
    async function saveChallenge() {
      if (!user) return alert('Please log in!');
      await supabase.from('stack_challenges').insert({
        user_id: user.id,
        ...currentStack,
        status: 'started'
      });
    }
  
    getUser();


  </script>
  <a href="/saved" class="text-sm text-blue-600 hover:underline">Saved Challenges</a>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white px-4 py-10">
    <h1 class="text-4xl sm:text-5xl font-extrabold text-blue-800 flex items-center gap-3 mb-12">
      🎰 <span>Stack Roulette</span>
    </h1>
  
    <!-- SLOT REELS -->
    <div class="space-y-4 w-full max-w-xs sm:max-w-sm">
      {#each Object.keys(categories) as key}
        <div
          class="bg-white border-4 border-blue-200 shadow-lg rounded-lg p-4 text-center transition-all duration-300 animate__animated {spinning ? 'animate__flipInY' : ''}"
        >
          <div class="text-xs text-gray-500 tracking-widest uppercase">{key}</div>
          <div class="text-2xl font-bold text-blue-600 mt-1">
            {currentStack[key] || '—'}
          </div>
        </div>
      {/each}
    </div>
  
    <!-- BUTTONS -->
    <div class="mt-10 flex gap-4">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
        on:click={spin}
        disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'Spin Stack'}
      </button>
  
      {#if Object.keys(currentStack).length}
      <button
      on:click={saveChallenge}
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition">
      💾 Save Challenge
    </button>
    
      {/if}
    </div>
  </div>
  