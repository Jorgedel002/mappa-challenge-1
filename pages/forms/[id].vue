<script setup lang="ts">
  const handleReset = () => {
    navigateTo('/forms');
  };
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Responder al formulario</h1>
        <NuxtLink to="/forms" class="mt-4 sm:mt-0 text-green-600 hover:text-green-800">
          ← Volver a formularios
        </NuxtLink>
      </div>
    </header>
    
    <div class="max-w-3xl mx-auto">
      <FormViewer 
        :form-id="$route.params.id as string" 
        @reset="handleReset" 
      />
    </div>
  </div>
</template>
