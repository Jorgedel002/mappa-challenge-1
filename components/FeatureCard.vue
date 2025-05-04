<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    svgPath: {
      type: String,
      default: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    }
  });
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
    <div :class="`w-16 h-16 bg-${color}-100 text-${color}-600 rounded-full flex items-center justify-center mb-4`">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="svgPath" />
      </svg>
    </div>
    <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
    <p class="text-gray-600 mb-6">{{ description }}</p>
    <NuxtLink :to="link" :class="`mt-auto bg-${color}-500 text-white px-6 py-2 rounded-md hover:bg-${color}-600 focus:outline-none w-full`">
      {{ linkText }}
    </NuxtLink>
  </div>
</template>
