<script setup>
  import { RouterView, useRoute } from "vue-router";

  const route = useRoute();
</script>

<template>
  <header class="bg-[rgb(75,101,98)] flex justify-between items-center px-5 py-5">
    <!-- Imagen a la izquierda -->
    <div class="flex-shrink-0 mr-8">
      <img src="./components/icons/AppArbolado2.png" alt="Imagen Centro" class="h-12 mx-auto">
    </div>
    
    

   
    <div class="header-content">
      <!-- Botón "Salir" solo si la ruta actual NO es 'home' -->
      <RouterLink 
        v-if="route.name !== 'home'"
        to="/" 
        class="block rounded-full bg-red-700 hover:bg-red-500 py-2 px-3 text-white text-center uppercase font-bold shadow text-sm">
        Salir
      </RouterLink>

      <div class="social-icons">
        <a href="https://www.facebook.com" target="_blank">
          <i class="fa fa-youtube"><img src="./components/icons/Youtube.svg"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <i class="fa fa-twitter"><img src="./components/icons/Twitter.svg"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <i class="fa fa-instagram"><img src="./components/icons/Instagram.svg"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank">
          <i class="fa fa-linkedin"><img src="./components/icons/Linkedin.svg"></i>
        </a>
      </div>
    </div>

  </header>

  <main :class="route.name === 'home' || route.name === 'municipio' || route.name === 'login' ? '' : 'max-w-6xl mx-auto mt-10'">
    <RouterView />
  </main>
  <footer class="bg-neutral-700 flex flex-col justify-center py-4 md:flex-row md:justify-between items-center md:px-8 md:py-0 md:h-24 w-full">
  <!-- Contenedor de las dos imágenes de la izquierda con espacio entre ellas -->
  <div class="flex flex-col items-center pb-8 md:pb-0 md:items-start space-y-4">
  <p class="text-white text-sm md:text-base font-semibold tracking-wide hover:text-gray-300 transition duration-300">
    COMPROMETIDOS CON LA ACCIÓN CLIMÁTICA
  </p>
  <div class="flex space-x-4">
    <a href="https://www.youtube.com" target="_blank">
      <img src="./components/icons/Youtube.svg" alt="YouTube" class="w-8 h-8">
    </a>
    <a href="https://www.twitter.com" target="_blank">
      <img src="./components/icons/Twitter.svg" alt="Twitter" class="w-8 h-8">
    </a>
    <a href="https://www.instagram.com" target="_blank">
      <img src="./components/icons/Instagram.svg" alt="Instagram" class="w-8 h-8">
    </a>
    <a href="https://www.linkedin.com" target="_blank">
      <img src="./components/icons/Linkedin.svg" alt="LinkedIn" class="w-8 h-8">
    </a>
  </div>
</div>

  <!-- Contenedor para las imágenes a la derecha -->
  <div class="flex gap-4 md:ml-auto">
    <img src="./components/icons/RAMCC logo blanco.png" alt="Imagen 1" class="w-29 h-8" />
    <img src="./components/icons/Fes.svg" alt="Imagen 2" class="w-29 h-8" />
  </div>
</footer>
</template>
<style scoped>
.social-icons {
  display: flex;
  justify-content: flex-start; /* Para alinearlos a la izquierda */
  gap: 10px; /* Espacio entre los íconos */
}

.social-icons a {
  display: inline-block;
}

.social-icons img {
  width: 30px; /* Ajusta el tamaño de los íconos */
  height: 30px; /* Ajusta el tamaño de los íconos */
}
</style>
