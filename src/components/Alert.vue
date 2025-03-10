<script setup>
import { ref } from "vue";

const props = defineProps({
  nombre: String,
  arboles: Number,
  co2: Number,
  especies: Number,
});

const showAlert = ref(true);

function closeAlert() {
  showAlert.value = false;
}

</script>

<template>
  <div v-if="showAlert" class="w-full h-1/2 flex justify-center">
    <div class="fixed w-3/5 md:w-4/5 lg:w-9/12 xl:w-1/2 bottom-4 bg-[#042825] text-white px-4 pb-3 rounded-2xl shadow-lg space-y-4">
      <button @click="closeAlert" class="absolute top-3 right-4 text-white text-3xl font-bold">&times;</button>

      <div class="flex w-3/4 md:w-full justify-center">
        <h1 class="font-bold text-base md:text-2xl pb-4 md:pb-10">Municipio de {{ nombre }}</h1>
      </div>

      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div class="w-full h-20 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
          <div class="flex flex-col">
            <p class="font-bold text-2xl text-[#042825]">{{ arboles }}</p>
            <p class="text-[#042825] font-medium text-sm">Árboles relevados</p>
          </div>
          <img class="w-12 ml-auto" src="../components/icons/Arbol_Home.svg" alt="Árbol" />
        </div>
        <div class="w-full h-20 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
          <div class="flex flex-col">
            <p class="font-bold text-2xl text-[#042825]">{{ co2 }}</p>
            <p class="text-[#042825] font-medium text-sm">Absorción de CO2 Aprox</p>
          </div>
          <img class="w-12 ml-auto" src="../components/icons/CO2_Home.svg" alt="CO2" />
        </div>
        <div class="w-full h-20 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
          <div class="flex flex-col">
            <p class="font-bold text-2xl text-[#042825]">{{ especies }}</p>
            <p class="text-[#042825] font-medium text-sm">Especies de árboles</p>
          </div>
          <img class="w-12 ml-auto" src="../components/icons/Especies_Home.svg" alt="Especies de árboles" />
        </div>
      </div>
    </div>
  </div>
</template>
