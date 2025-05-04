<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold text-blue-600">Mappa Challenge</NuxtLink>
        <nav class="space-x-6">
          <NuxtLink to="/polls" class="text-gray-800 hover:text-blue-600">Encuestas</NuxtLink>
          <NuxtLink to="/forms" class="text-gray-800 hover:text-green-600">Formularios</NuxtLink>
        </nav>
      </div>
    </header>
    
    <main class="py-6">
      <NuxtPage />
    </main>
    
    <footer class="mt-12 py-6 bg-gray-100 border-t border-gray-200">
      <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
        Mappa Challenge - Aplicación de encuestas y formularios © {{ new Date().getFullYear() }}
      </div>
    </footer>
  </div>
</template>
