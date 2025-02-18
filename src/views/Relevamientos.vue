<script setup>
import { onMounted, ref, computed } from 'vue';
import ArbolService from '@/services/ArbolService';  // Cambié RelevamientoService por ArbolService
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import Arbol from '../components/Arbol.vue';  // Cambié Relevamiento por Arbol

const arboles = ref([]);  // Cambié relevamientos por arboles

onMounted(() => {
    ArbolService.obtenerArboles()  // Cambié obtenerRelevamientos por obtenerArboles
        .then(({ data }) => {
            arboles.value = data;
        })
        .catch(error => console.error('Error obteniendo árboles', error));  // Cambié relevamientos por árboles
});

defineProps({
    titulo: {
        type: String
    }
});

const existenArboles = computed(() => arboles.value.length > 0);  // Cambié relevamientos por arboles
</script>

<template>
  <div class="flex flex-col min-h-screen">
      <div class="flex justify-end">
          <RouterLink to="municipio">
              Volver
          </RouterLink>
      </div>
      <Heading>{{ titulo }}</Heading>
          
      <div v-if="existenArboles" class="flow-root mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">  <!-- Cambié existenRelevamientos por existenArboles -->
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
          <Arbol
            v-for="arbol in arboles"  
            :key="arbol.id"
            :arbol="arbol"  
            class="hover:bg-green-100 transition-all text-gray-700"
          />
        </tbody>
      </table>
    </div>
  </div>
</div>

      
      <p v-else>No hay árboles</p>  <!-- Cambié relevamientos por árboles -->
  </div>
</template>
