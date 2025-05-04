<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { usePollStore } from '~/stores/pollStore';

  const pollStore = usePollStore();

  const question = ref('');
  const options = ref(['', '']);

  const addOption = () => {
    options.value.push('');
  };

  const removeOption = (index: number) => {
    if (options.value.length > 2) {
      options.value.splice(index, 1);
    }
  };

  const isValid = computed(() => {
    return question.value.trim() !== '' && 
          options.value.length >= 2 && 
          options.value.every(option => option.trim() !== '');
  });

  const createNewPoll = () => {
    if (isValid.value) {
      const newPoll = pollStore.createPoll(
        question.value,
        options.value.filter(option => option.trim() !== '')
      );
      
      question.value = '';
      options.value = ['', ''];
      
      // Emitir evento para indicar que se creó una nueva encuesta
      emit('pollCreated', newPoll.id);
    }
  };

  const emit = defineEmits<{
    (e: 'pollCreated', pollId: string): void
  }>();
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Crear nueva encuesta</h2>
    
    <form @submit.prevent="createNewPoll">
      <div class="mb-4">
        <label for="question" class="block text-sm font-medium text-gray-700 mb-1">Pregunta</label>
        <input
          id="question"
          v-model="question"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu pregunta aquí"
          required
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Opciones</label>
        <div v-for="(option, index) in options" :key="index" class="flex mb-2">
          <input
            v-model="options[index]"
            type="text"
            class="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="`Opción ${index + 1}`"
            required
          />
          <button
            type="button"
            @click="removeOption(index)"
            class="bg-red-500 text-white px-3 py-2 rounded-r-md hover:bg-red-600 focus:outline-none"
            :disabled="options.length <= 2"
          >
            <span>×</span>
          </button>
        </div>
        
        <button
          type="button"
          @click="addOption"
          class="mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 focus:outline-none w-full"
        >
          + Agregar opción
        </button>
      </div>
      
      <div class="mt-6">
        <button
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full"
          :disabled="!isValid"
        >
          Crear encuesta
        </button>
      </div>
    </form>
  </div>
</template>
