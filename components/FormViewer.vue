<script setup lang="ts">
  import { ref, computed, reactive } from 'vue';
  import type { Form } from '~/types/form';
  import { useFormStore } from '~/stores/formStore';

  const props = defineProps<{
    formId: string;
  }>();

  const emit = defineEmits<{
    (e: 'submitted'): void;
    (e: 'reset'): void;
  }>();

  const formStore = useFormStore();
  const answers = reactive<Record<string, string | number>>({});
  const submitted = ref(false);

  const form = computed<Form | undefined>(() => {
    return formStore.getForm(props.formId);
  });

  const submitForm = () => {
    if (form.value && props.formId) {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));
      
      formStore.submitFormResponse(props.formId, formattedAnswers);
      submitted.value = true;
      emit('submitted');
    }
  };

  const resetForm = () => {
    submitted.value = false;
    Object.keys(answers).forEach(key => {
      delete answers[key];
    });
    emit('reset');
  };
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
    <div v-if="form">
      <h2 class="text-2xl font-bold mb-6">{{ form.title }}</h2>
      
      <form v-if="!submitted" @submit.prevent="submitForm">
        <div v-for="question in form.questions" :key="question.id" class="mb-6">
          <div class="mb-2">
            <label :for="question.id" class="block text-md font-medium text-gray-800">
              {{ question.title }}
              <span v-if="question.required" class="text-red-500 ml-1">*</span>
            </label>
          </div>
          
          <!-- Input para respuesta corta -->
          <input
            v-if="question.type === 'short-answer'"
            :id="question.id"
            v-model="answers[question.id]"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="question.placeholder || ''"
            :required="question.required"
          />
          
          <!-- Textarea para respuesta larga -->
          <textarea
            v-else-if="question.type === 'long-answer'"
            :id="question.id"
            v-model="answers[question.id]"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="question.placeholder || ''"
            :required="question.required"
          ></textarea>
          
          <!-- Input para número -->
          <input
            v-else-if="question.type === 'number'"
            :id="question.id"
            v-model.number="answers[question.id]"
            type="number"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="question.placeholder || ''"
            :required="question.required"
          />
          
          <!-- Radio buttons para selección única -->
          <div v-else-if="question.type === 'radio'" class="space-y-2">
            <div v-for="(option, index) in question.options" :key="index" class="flex items-center">
              <input
                :id="`${question.id}-option-${index}`"
                v-model="answers[question.id]"
                type="radio"
                :value="option"
                class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                :required="question.required"
              />
              <label :for="`${question.id}-option-${index}`" class="text-gray-700">{{ option }}</label>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full"
          >
            Enviar respuestas
          </button>
        </div>
      </form>
      
      <div v-else class="text-center py-8">
        <div class="text-green-600 text-xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          ¡Formulario enviado con éxito!
        </div>
        <p class="text-gray-600">Gracias por completar este formulario.</p>
        <button
          @click="resetForm"
          class="mt-6 bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          Volver al inicio
        </button>
      </div>
    </div>
    
    <div v-else class="text-center text-gray-500">
      Formulario no encontrado
    </div>
  </div>
</template>
