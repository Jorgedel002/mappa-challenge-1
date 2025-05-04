<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  });
  
  defineEmits(['update:activeTab']);
</script>

<template>
  <button
  @click="$emit('update:activeTab', activeTab)" 
  :class="`bg-${color}-500 text-white px-4 py-2 rounded-md hover:bg-${color}-600 focus:outline-none`"
  >
    {{ text }}
  </button>
</template>