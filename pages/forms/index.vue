<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Formularios</h1>
          <p class="text-gray-600">Crea y responde formularios con múltiples preguntas</p>
        </div>
        <NuxtLink to="/" class="mt-4 sm:mt-0 text-blue-600 hover:text-blue-800">
          ← Volver al inicio
        </NuxtLink>
      </div>
    </header>
    
    <div class="max-w-5xl mx-auto">
      <!-- Tabs para cambiar entre creación y listado -->
      <div class="mb-6 border-b border-gray-200">
        <div class="flex flex-wrap -mb-px">
          <button 
            @click="activeTab = 'list'"
            :class="[
              'inline-block py-4 px-4 text-sm font-medium',
              activeTab === 'list' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
            ]"
          >
            Ver Formularios
          </button>
          <button 
            @click="activeTab = 'create'"
            :class="[
              'inline-block py-4 px-4 text-sm font-medium',
              activeTab === 'create' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
            ]"
          >
            Crear Formulario
          </button>
        </div>
      </div>
      
      <!-- Contenido de las tabs -->
      <div v-if="activeTab === 'create'">
        <FormCreator @form-created="handleFormCreated" />
      </div>
      
      <div v-else>
        <div v-if="forms.length === 0" class="text-center py-10">
          <p class="text-gray-500 mb-4">No hay formularios disponibles</p>
          <CustomButton
            v-model:activeTab="activeTab"
            @update:activeTab="activeTab = 'create'"
            text="Crear el primer formulario"
            color="green"
          />
        </div>
        
        <div v-else class="grid grid-cols-1 gap-6">
          <div v-for="form in forms" :key="form.id" class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 class="text-xl font-semibold mb-3">{{ form.title }}</h2>
            <div class="flex justify-between text-sm text-gray-500 mb-4">
              <span>{{ form.questions.length }} preguntas</span>
              <span>Creado el {{ formatDate(form.createdAt) }}</span>
            </div>
            <div class="mt-4 flex space-x-3">
              <NuxtLink :to="`/forms/${form.id}`" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none flex-grow text-center">
                Responder
              </NuxtLink>
              <NuxtLink :to="`/forms/${form.id}-responses`" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none flex-grow text-center">
                Ver respuestas
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useFormStore } from '~/stores/formStore';

  const formStore = useFormStore();
  const activeTab = ref('list');

  const forms = computed(() => {
    return formStore.getAllForms();
  });

  const handleFormCreated = (formId: string) => {
    activeTab.value = 'list';
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };
</script>
