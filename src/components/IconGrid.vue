<template>
  <div class="p-6">
    <!-- Search -->
    <div class="mb-8 flex justify-center">
      <input
        v-model="search"
        type="text"
        placeholder="Search icons..."
        class="input input-bordered w-full max-w-md rounded-lg"
      />
    </div>

    <!-- Icons grid -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      <div
        v-for="(icon, name) in filteredIcons"
        :key="name"
        class="relative flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
        @click="copyIcon(name)"
      >
        <img :src="icon.url" :alt="name" class="w-10 h-10 mb-2" />
        <span class="text-sm text-gray-600">{{ name }}</span>

        <!-- Smooth “Copied!” indicator -->
        <transition name="fade">
          <div
            v-if="copiedIcon === name"
            class="absolute bottom-2 bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg"
          >
            Copied!
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const GITHUB_USER = "tahaanz7";
const REPO = "iconates-icons";
const BRANCH = "main";

const icons = ref({});
const metadata = ref({});
const search = ref("");
const copiedIcon = ref(null);

// Fetch icons and metadata
onMounted(async () => {
  try {
    const metaRes = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/${BRANCH}/metadata.json`
    );
    metadata.value = await metaRes.json();

    const iconsList = Object.keys(metadata.value);
    icons.value = Object.fromEntries(
      iconsList.map((name) => [
        name,
        {
          url: `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/${BRANCH}/dist_iconates/${name}.svg`,
        },
      ])
    );
  } catch (error) {
    console.error("Error loading icons:", error);
  }
});

// Filter icons
const filteredIcons = computed(() => {
  const query = search.value.toLowerCase();
  if (!query) return icons.value;

  return Object.fromEntries(
    Object.entries(icons.value).filter(([name]) => {
      const meta = metadata.value[name] || {};
      const synonyms = meta.synonyms || [];
      return (
        name.toLowerCase().includes(query) ||
        synonyms.some((s) => s.toLowerCase().includes(query))
      );
    })
  );
});

// Copy icon SVG
async function copyIcon(name) {
  const path = icons.value[name].url;

  try {
    const res = await fetch(path);
    const svg = await res.text();
    await navigator.clipboard.writeText(svg);

    // Show smooth “Copied!” message
    copiedIcon.value = name;
    setTimeout(() => (copiedIcon.value = null), 500);
  } catch (err) {
    console.error("Error copying icon:", err);
  }
}
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
