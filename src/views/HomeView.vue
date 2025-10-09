<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import IconGrid from "../components/IconGrid.vue";
</script>

<template>
  <div class="min-h-screen max-w-6xl mx-auto mb-20">
    <HeroSection />
    <section>
      <IconGrid />
    </section>

    

    <!-- meet the creator -->
   <section class="flex flex-col items-center justify-center text-center py-16 bg-gray-50 rounded-lg mt-20 w-max mx-auto px-40">
   
    <img
      src="../../public/images/taha-aanizile.jpg"
      alt="Taha Aanizile"
      class="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
    />

   
    <h2 class="text-2xl font-bold mb-1">Taha Aanizile</h2>
    <p class="text-gray-500 mb-6">Creator & Maintainer of Iconates <br> Software Engineer / Designer</p>

   
    <div class="flex gap-6">
      <div>
        linkedin
      </div>
      <div>Github</div>
    </div>
  </section>
  </div>
</template>
