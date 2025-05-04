<script setup lang="ts">
  const route = useRoute();

  const handleVoted = () => {
    navigateTo(`/polls/${route.params.id}-results`, { replace: true });
  };
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Responder a la encuesta</h1>
        <NuxtLink to="/polls" class="mt-4 sm:mt-0 text-blue-600 hover:text-blue-800">
          ← Volver a encuestas
        </NuxtLink>
      </div>
    </header>
    
    <div class="max-w-2xl mx-auto">
      <PollViewer :poll-id="route.params.id as string" @voted="handleVoted" />
    </div>
  </div>
</template>
