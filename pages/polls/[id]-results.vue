<script setup lang="ts">
  import { computed } from 'vue';
  import type { Poll } from '~/types/poll';
  import { usePollStore } from '~/stores/pollStore';

  const pollStore = usePollStore();

  const route = useRoute();

  const poll = computed<Poll | undefined>(() => {
    return pollStore.getPoll(route.params.id as string);
  });
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Resultados de la encuesta</h1>
        <div class="flex space-x-4 mt-4 sm:mt-0">
          <NuxtLink :to="`/polls/${route.params.id}`" class="text-blue-600 hover:text-blue-800">
            Responder de nuevo
          </NuxtLink>
          <NuxtLink to="/polls" class="text-blue-600 hover:text-blue-800">
            ← Volver a encuestas
          </NuxtLink>
        </div>
      </div>
    </header>
    
    <div class="max-w-2xl mx-auto" v-if="poll">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-6">{{ poll.question }}</h2>
        <PollResults :poll="poll" />
      </div>
    </div>
    
    <div v-else class="text-center py-8 max-w-2xl mx-auto">
      <div class="bg-white shadow-md rounded-lg p-6">
        <p class="text-gray-500">Encuesta no encontrada</p>
        <NuxtLink to="/polls" class="mt-4 inline-block text-blue-600 hover:text-blue-800">
          ← Volver a encuestas
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
