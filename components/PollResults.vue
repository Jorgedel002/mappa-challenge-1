<script setup lang="ts">
  import { computed } from 'vue';
  import type { Poll } from '~/types/poll';

  const props = defineProps<{
    poll: Poll;
  }>();

  const totalVotes = computed(() => {
    return props.poll.options.reduce((sum, option) => sum + option.count, 0);
  });

  const calculatePercentage = (count: number) => {
    if (totalVotes.value === 0) return 0;
    return Math.round((count / totalVotes.value) * 100);
  };
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-xl font-semibold mb-3">Resultados</h3>
    
    <div v-for="option in poll.options" :key="option.id" class="mb-3">
      <div class="flex justify-between mb-1">
        <span class="text-gray-700">{{ option.text }}</span>
        <span class="text-gray-900 font-medium">{{ option.count }} votos ({{ calculatePercentage(option.count) }}%)</span>
      </div>
      
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="bg-blue-600 h-2.5 rounded-full"
          :style="{ width: `${calculatePercentage(option.count)}%` }"
        ></div>
      </div>
    </div>
    
    <div class="mt-4 text-gray-600 text-sm">
      Total de votos: {{ totalVotes }}
    </div>
  </div>
</template>
