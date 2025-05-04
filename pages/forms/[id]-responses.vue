<script setup lang="ts">
  const route = useRoute();
</script>

<template>
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800">Respuestas del formulario</h1>
          <div class="flex space-x-4 mt-4 sm:mt-0">
            <NuxtLink :to="`/forms/${route.params.id}`" class="text-green-600 hover:text-green-800">
              Responder de nuevo
            </NuxtLink>
            <NuxtLink to="/forms" class="text-green-600 hover:text-green-800">
              ← Volver a formularios
            </NuxtLink>
          </div>
        </div>
      </header>
      
      <div class="max-w-5xl mx-auto">
        <FormResponses :form-id="route.params.id as string" />
      </div>
    </div>
</template>