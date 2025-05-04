<script setup lang="ts">
  import { computed } from 'vue';
  import type { Form, FormResponse } from '~/types/form';
  import { useFormStore } from '~/stores/formStore';

  const props = defineProps<{
    formId: string;
  }>();

  const formStore = useFormStore();

  const form = computed<Form | undefined>(() => {
    return formStore.getForm(props.formId);
  });

  const responses = computed<FormResponse[]>(() => {
    if (!props.formId) return [];
    return formStore.getFormResponses(props.formId);
  });

  const getAnswerForQuestion = (response: FormResponse, questionId: string): string => {
    const answer = response.answers.find(a => a.questionId === questionId);
    return answer ? String(answer.answer) : '-';
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
  };
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
    <div v-if="form && responses.length > 0">
      <h2 class="text-2xl font-bold mb-2">Respuestas: {{ form.title }}</h2>
      <p class="text-gray-600 mb-6">{{ responses.length }} respuestas recibidas</p>
      
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th 
                v-for="question in form.questions" 
                :key="question.id"
                class="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ question.title }}
              </th>
              <th class="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(response, index) in responses" :key="response.id" class="hover:bg-gray-50">
              <td class="py-3 px-4 border-b border-gray-200">{{ index + 1 }}</td>
              <td 
                v-for="question in form.questions" 
                :key="`${response.id}-${question.id}`"
                class="py-3 px-4 border-b border-gray-200"
              >
                {{ getAnswerForQuestion(response, question.id) }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-500">
                {{ formatDate(response.submittedAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div v-else-if="form && responses.length === 0" class="text-center py-8">
      <p class="text-gray-500">No hay respuestas para este formulario todavía.</p>
    </div>
    
    <div v-else class="text-center text-gray-500">
      Formulario no encontrado
    </div>
  </div>
</template>
