<script setup>
import { onMounted, ref, computed } from 'vue';
import RelevamientoService from '@/services/RelevamientoService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import Relevamiento from '../components/Relevamiento.vue';

const relevamientos = ref([]);

onMounted(() => {
    RelevamientoService.obtenerRelevamientos()
        .then(({ data }) => {
            relevamientos.value = data;
        })
        .catch(error => console.error('Error obteniendo relevamientos', error));
});

defineProps({
    titulo: {
        type: String
    }
});

const existenRelevamientos = computed(() => relevamientos.value.length > 0);
</script>

<template>
  <div class="flex flex-col min-h-screen">
      <div class="flex justify-end">
          <RouterLink to="municipio">
              Volver
          </RouterLink>
      </div>
      <Heading>{{ titulo }}</Heading>
          
      <div v-if="existenRelevamientos" class="flow-root mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
  <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table class="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gradient-to-r from-green-800 to-lime-700 text-white">
          <tr>
            <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">ID</th>
            <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Especie</th>
            <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Altura</th>
            <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Diámetro</th>
            <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Estado sanitario</th>
            <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Ubicación</th>
            <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Observaciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-gray-50">
          <Relevamiento
            v-for="relevamiento in relevamientos"
            :key="relevamiento.id"
            :relevamiento="relevamiento"
            class="hover:bg-green-100 transition-all text-gray-700"
          />
        </tbody>
      </table>
    </div>
  </div>
</div>

      
      <p v-else>No hay relevamientos</p>
  </div>
</template>
