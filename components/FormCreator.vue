<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { FormQuestion } from '~/types/form';
  import { useFormStore } from '~/stores/formStore';

  const formStore = useFormStore();

  const title = ref('');
  const questions = ref<Array<Omit<FormQuestion, 'id'>>>([]);

  const addQuestion = () => {
    questions.value.push({
      title: '',
      type: 'short-answer',
      required: false,
      placeholder: '',
      options: ['', '']
    });
  };

  const removeQuestion = (index: number) => {
    questions.value.splice(index, 1);
  };

  const addOption = (questionIndex: number) => {
    if (!questions.value[questionIndex].options) {
      questions.value[questionIndex].options = [];
    }
    questions.value[questionIndex].options!.push('');
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const options = questions.value[questionIndex].options;
    if (options && options.length > 2) {
      options.splice(optionIndex, 1);
    }
  };

  const isValid = computed(() => {
    return (
      title.value.trim() !== '' && 
      questions.value.length > 0 && 
      questions.value.every(q => q.title.trim() !== '') &&
      questions.value.every(q => q.type !== 'radio' || (q.options && q.options.length >= 2 && q.options.every(opt => opt.trim() !== '')))
    );
  });

  const createNewForm = () => {
    if (isValid.value) {
      const newForm = formStore.createForm(
        title.value,
        questions.value
      );
      
      title.value = '';
      questions.value = [];
      
      // Emitir evento para indicar que se creó un nuevo formulario
      emit('formCreated', newForm.id);
    }
  };

  const emit = defineEmits<{
    (e: 'formCreated', formId: string): void
  }>();

  // Inicializar con una pregunta vacía
  addQuestion();
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Crear nuevo formulario</h2>
    
    <form @submit.prevent="createNewForm">
      <div class="mb-6">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título del formulario</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Título del formulario"
          required
        />
      </div>
      
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Preguntas</h3>
        
        <div v-for="(question, index) in questions" :key="index" class="mb-6 p-4 border border-gray-200 rounded-lg">
          <div class="flex justify-between mb-3">
            <h4 class="text-md font-medium">Pregunta {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeQuestion(index)"
              class="text-red-500 hover:text-red-700"
              aria-label="Eliminar pregunta"
            >
              <span>Eliminar</span>
            </button>
          </div>
          
          <div class="mb-3">
            <label :for="`question-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Título de la pregunta</label>
            <input
              :id="`question-${index}`"
              v-model="questions[index].title"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe la pregunta aquí"
              required
            />
          </div>
          
          <div class="mb-3">
            <label :for="`type-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Tipo de pregunta</label>
            <select
              :id="`type-${index}`"
              v-model="questions[index].type"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="short-answer">Respuesta corta</option>
              <option value="long-answer">Respuesta larga</option>
              <option value="number">Número</option>
              <option value="radio">Selección única</option>
            </select>
          </div>
          
          <div class="mb-3">
            <div class="flex items-center">
              <input
                :id="`required-${index}`"
                v-model="questions[index].required"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"
              />
              <label :for="`required-${index}`" class="text-sm font-medium text-gray-700">Obligatorio</label>
            </div>
          </div>
          
          <div class="mb-3">
            <label :for="`placeholder-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Placeholder (opcional)</label>
            <input
              :id="`placeholder-${index}`"
              v-model="questions[index].placeholder"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Texto de ayuda para el usuario"
            />
          </div>
          
          <!-- Opciones para preguntas de tipo radio -->
          <div v-if="questions[index].type === 'radio'" class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Opciones</label>
            <div v-for="(option, optIndex) in questions[index].options || []" :key="optIndex" class="flex mb-2">
              <input
                v-model="questions[index].options![optIndex]"
                type="text"
                class="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :placeholder="`Opción ${optIndex + 1}`"
                required
              />
              <button
                type="button"
                @click="removeOption(index, optIndex)"
                class="bg-red-500 text-white px-3 py-2 rounded-r-md hover:bg-red-600 focus:outline-none"
                :disabled="questions[index].options!.length <= 2"
              >
                <span>×</span>
              </button>
            </div>
            
            <button
              type="button"
              @click="addOption(index)"
              class="mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 focus:outline-none w-full"
            >
              + Agregar opción
            </button>
          </div>
        </div>
        
        <button
          type="button"
          @click="addQuestion"
          class="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 focus:outline-none w-full"
        >
          + Agregar pregunta
        </button>
      </div>
      
      <div class="mt-6">
        <button
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full"
          :disabled="!isValid"
        >
          Crear formulario
        </button>
      </div>
    </form>
  </div>
</template>
