<script setup>
import { useRoute, useRouter } from "vue-router";
import AuthenticationService from "./services/AuthenticationService";
import { ref, watchEffect } from "vue";

const route = useRoute();
const router = useRouter();

const isLoggedIn = ref(!!localStorage.getItem("token"));

const logout = async () => {
  try {
    await AuthenticationService.salir();
    localStorage.removeItem("token");
    isLoggedIn.value = false;
    router.push("/");
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};


watchEffect(() => {
  isLoggedIn.value = !!localStorage.getItem("token");
});

window.addEventListener("storage", () => {
  isLoggedIn.value = !!localStorage.getItem("token");
});
</script>

<template>
  <header class="bg-[rgb(75,101,98)] flex justify-between items-center px-5 md:px-12 xl:px-28 py-8">
  <div class="flex-shrink-0 mr-8">
    <RouterLink
    v-if="isLoggedIn"
    to="/municipio">
      <img src="./components/icons/AppArbolado2.png" alt="Logo app" class="h-10 md:h-16 xl:h-20 mx-auto cursor-pointer">
    </RouterLink>
    <RouterLink
    v-else
    to="/">
      <img src="./components/icons/AppArbolado2.png" alt="Logo app" class="h-10 md:h-16 xl:h-20 mx-auto cursor-pointer">
    </RouterLink>
  </div>
    <div class="header-content flex-col justify-center w-32 md:w-40 xl:w-44 space-y-3">
      <RouterLink
      v-if="!isLoggedIn && route.path !== '/login'"
      to="/login"
      class="block rounded-full bg-white hover:bg-[#042825] hover:text-white transition duration-300 py-2 px-3 w-full text-center uppercase font-bold shadow text-sm"
    >
      INGRESAR
    </RouterLink>

    <button
      v-if="isLoggedIn"
      @click="logout"
      class="block rounded-full bg-red-700 hover:bg-white hover:text-red-700 transition duration-300 py-2 px-3 w-full text-white text-center uppercase font-bold shadow text-sm"
    >
      SALIR
    </button>

      <div class="social-icons space-x-1 md:space-x-2">
        <a href="https://ar.linkedin.com/company/ramcc-ar" target="_blank">
          <img src="./components/icons/Linke_ico.svg">
        </a>
        <a href="https://www.instagram.com/ramcc_ar/?hl=es" target="_blank">
          <img src="./components/icons/Insta_ico.svg">
        </a>
        <a href="https://www.youtube.com/@RAMCC_ar" target="_blank">
          <img src="./components/icons/You_ico.svg">
        </a>
        <a href="https://www.facebook.com/ramcc.net/?locale=cx_PH" target="_blank">
          <img src="./components/icons/Face_ico.svg">
        </a>
      </div>
    </div>

  </header>

  <main :class="route.name === 'home' || route.name === 'municipio' || route.name === 'login' ? '' : 'max-w-6xl mx-auto mt-10'">
    <RouterView />
  </main>
  <footer class="bg-neutral-700 flex flex-col justify-center py-4 md:flex-row md:justify-between items-center md:px-12 xl:px-20 md:py-0 md:h-28 w-full">

  <div class="flex flex-col items-center pb-8 md:pb-0 md:items-start space-y-4">
  <p class="text-white text-sm md:text-base font-semibold tracking-wide hover:text-gray-300 transition duration-300">
    COMPROMETIDOS CON LA ACCIÓN CLIMÁTICA
  </p>
  <div class="flex space-x-4">
    <a href="https://www.linkedin.com" target="_blank">
      <img src="./components/icons/Linke_ico.svg" class="h-8 w-8">
    </a>
    <a href="https://www.instagram.com" target="_blank">
      <img src="./components/icons/Insta_ico.svg" class="h-8 w-8">
    </a>
    <a href="https://www.youtube.com" target="_blank">
      <img src="./components/icons/You_ico.svg" class="h-8 w-8">
    </a>
    <a href="https://www.facebook.com" target="_blank">
      <img src="./components/icons/Face_ico.svg" class="h-8 w-8">
    </a>
  </div>
</div>

  <div class="flex gap-4 md:ml-auto">
    <img src="./components/icons/RAMCC logo blanco.png" alt="Red Argentina de Municipios" class="w-29 h-10 md:h-12 xl:h-16" />
    <img src="./components/icons/Fes.svg" alt="Imagen 2" class="w-29 h-10 md:h-12 xl:h-16" />
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