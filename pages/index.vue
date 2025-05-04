<template>
  <div class="container mx-auto px-4 py-8">
    <header class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Mappa Challenge</h1>
      <p class="text-gray-600">Crea y responde encuestas y formularios</p>
    </header>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <FeatureCard
        title="Encuestas"
        description="Crea encuestas de una sola pregunta con múltiples opciones"
        link="/polls"
        linkText="Ir a Encuestas"
        color="blue"
        svg-path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />

      <FeatureCard
        title="Formularios"
        description="Crea formularios con múltiples preguntas de diferentes tipos"
        link="/forms"
        linkText="Ir a Formularios"
        color="green"
        svg-path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </div>
  </div>
</template>
