<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <FooterComp />
  </div>
</template>

<script setup>
import FooterComp from "./components/FooterComp.vue";
import Navbar from "./components/Navbar.vue";
</script>

<style scoped></style>
