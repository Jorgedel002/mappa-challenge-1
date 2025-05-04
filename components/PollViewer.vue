<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { Poll } from '~/types/poll';
  import { usePollStore } from '~/stores/pollStore';

  const props = defineProps<{
    pollId: string;
  }>();

  const emit = defineEmits<{
    (e: 'voted'): void;
  }>();

  const pollStore = usePollStore();
  const selectedOption = ref<string>('');
  const hasVoted = ref(false);

  const poll = computed<Poll | undefined>(() => {
    if (!props.pollId) return undefined;
    return pollStore.getPoll(props.pollId);
  });

  const submitResponse = () => {
    if (selectedOption.value && poll.value) {
      pollStore.respondToPoll({
        pollId: props.pollId,
        selectedOptionId: selectedOption.value
      });
      
      hasVoted.value = true;
      emit('voted');
    }
  };
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
    <div v-if="poll">
      <h2 class="text-2xl font-bold mb-4">{{ poll.question }}</h2>
      
      <form @submit.prevent="submitResponse" v-if="!hasVoted">
        <div class="space-y-2 mb-6">
          <div 
            v-for="option in poll.options" 
            :key="option.id" 
            class="flex items-center"
          >
            <input
              type="radio"
              :id="option.id"
              :value="option.id"
              v-model="selectedOption"
              class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              required
            />
            <label :for="option.id" class="text-gray-700">{{ option.text }}</label>
          </div>
        </div>
        
        <button
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full"
          :disabled="!selectedOption"
        >
          Votar
        </button>
      </form>
      
      <div v-else>
        <p class="text-green-600 mb-4">¡Tu respuesta ha sido registrada!</p>
        <PollResults :poll="poll" />
      </div>
    </div>
    
    <div v-else class="text-center text-gray-500">
      Encuesta no encontrada
    </div>
  </div>
</template>
