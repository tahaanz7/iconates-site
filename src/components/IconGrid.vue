<template>
  <div class="p-6">
    <!--  Search input -->
    <input
      v-model="query"
      type="text"
      placeholder="Search icons (e.g. home, house...)"
      class="focus:outline-none w-full mb-10 p-3 border border-gray-300 rounded-lg max-w-lg mx-auto block"
    />

     <!-- Icons grid  -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      <div
        v-for="(path, name) in filteredIcons"
        :key="name"
        class="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
        @click="copyIcon(name)"
      >
        <img :src="path" :alt="name" class="w-10 h-10 mb-2" />
        <span class="text-sm text-gray-600">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* -------------------------------------------------------------------------- */
/* 🔹 1. Load all SVG icons dynamically from /public/iconates                 */
/* -------------------------------------------------------------------------- */
const svgFiles = import.meta.glob('/public/iconates/*.svg', {
  eager: true,
  import: 'default'
})

const icons = Object.fromEntries(
  Object.entries(svgFiles).map(([path]) => {
    const name = path.split('/').pop().replace('.svg', '')
    return [name, `/iconates/${name}.svg`]
  })
)

/* -------------------------------------------------------------------------- */
/* 🔹 2. Load all JSON metadata files (name, synonyms, category, etc.)        */
/* -------------------------------------------------------------------------- */
const metadataFiles = import.meta.glob('/public/iconates/*.json', {
  eager: true
})

const metadata = Object.fromEntries(
  Object.entries(metadataFiles).map(([path, mod]) => {
    const name = path.split('/').pop().replace('.json', '')
    return [name, mod.default || mod]
  })
)

/* -------------------------------------------------------------------------- */
/* 🔹 3. Search input state                                                   */
/* -------------------------------------------------------------------------- */
const query = ref('')

/* -------------------------------------------------------------------------- */
/* 🔹 4. Computed filtered list of icons                                      */
/* -------------------------------------------------------------------------- */
const filteredIcons = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return icons

  // Return icons whose name OR synonyms include the query
  return Object.fromEntries(
    Object.entries(icons).filter(([name]) => {
      const data = metadata[name] || {}
      const allTerms = [name, ...(data.synonyms || [])]
      return allTerms.some(term => term.toLowerCase().includes(q))
    })
  )
})

/* -------------------------------------------------------------------------- */
/* 🔹 5. Copy icon code to clipboard                                          */
/* -------------------------------------------------------------------------- */
function copyIcon(name) {
  const path = icons[name]
  navigator.clipboard.writeText(`<img src="${path}" alt="${name}" />`)
  alert(`Copied ${name} SVG code!`)
}
</script>
