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
          
      <div v-if="existenRelevamientos" class="flow-root mx-auto mt-10 p-5 bg-white shadow">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300">
                      <thead>
                          <tr>
                              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">ID</th>
                              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Especie</th>
                              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Altura</th>
                              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Diámetro</th>
                              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Estado sanitario</th>
                              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Ubicación</th>
                              <th scope="col" class="p-2 text-center text-sm font-extrabold text-gray-600">Observaciones</th>
                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-lime-100">
                          <Relevamiento
                              v-for="relevamiento in relevamientos"
                              :key="relevamiento.id"
                              :relevamiento="relevamiento"
                          />
                      </tbody>
                  </table>
              </div>
          </div>
      </div>     
      
      <p v-else>No hay relevamientos</p>
  </div>
</template>
