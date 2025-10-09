<template>
  <nav class="w-full py-4 px-4 mt-2">
    <div class="max-w-6xl mx-auto flex justify-between items-center  border-b border-gray-200 pb-4">
      <RouterLink to="/"><h1 class="text-2xl font-bold">Iconates</h1></RouterLink>
      <ul class="flex gap-6 text-gray-600">
        <li><RouterLink to="/icons">Icons</RouterLink></li>
        <li><RouterLink to="/docs">Docs</RouterLink></li>
        <li><RouterLink to="/contribute">Contribute</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/license">License</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
