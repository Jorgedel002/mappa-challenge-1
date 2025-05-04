# Mappa Challenge - Aplicación de Encuestas y Formularios

Esta aplicación web permite a los usuarios crear y responder a encuestas y formularios sin necesidad de un backend o autenticación. El proyecto está construido utilizando Vue 3 con la Composition API, TypeScript, Nuxt 3, Pinia y Tailwind CSS.

## Funcionalidades

### Encuestas
- Creación de encuestas con una pregunta y múltiples opciones
- Respuesta a encuestas mediante selección única (radio buttons)
- Visualización de resultados con conteo y gráficos de barras

### Formularios
- Creación de formularios con múltiples preguntas
- Tipos de preguntas soportados:
  - Respuesta corta (texto)
  - Respuesta larga (área de texto)
  - Número
  - Selección única (radio buttons)
- Opciones para marcar preguntas como obligatorias y agregar placeholders
- Visualización de respuestas en formato tabular

## Tecnologías utilizadas

- **Vue 3**: Framework principal con Composition API
- **TypeScript**: Para tipado estático
- **Nuxt 3**: Framework Vue para aplicaciones universales
- **Pinia**: Gestión de estado
- **Tailwind CSS**: Framework de CSS para el diseño

## Estructura del proyecto

- `/components`: Componentes reutilizables de Vue
- `/pages`: Páginas y rutas de la aplicación
- `/stores`: Pinia stores para la gestión de estado
- `/types`: Definiciones de tipos TypeScript

## Cómo ejecutar el proyecto

1. Instalar dependencias:
   ```
   npm install
   ```

2. Ejecutar el servidor de desarrollo:
   ```
   npm run dev
   ```

3. Abrir http://localhost:3000 en tu navegador

## Decisiones de diseño

- **Reusabilidad**: Los componentes como inputs, formularios y visualizadores están diseñados para ser reutilizables.
- **Estado local persistente**: Se utiliza Pinia para mantener el estado a nivel de aplicación, lo que permite que los datos persistan durante la sesión del usuario.
- **UI/UX**: Se priorizó la funcionalidad y la fluidez de la experiencia de usuario, con un diseño limpio y minimalista utilizando Tailwind CSS.
- **TypeScript**: Se implementaron interfaces detalladas para garantizar la integridad de datos en toda la aplicación.
