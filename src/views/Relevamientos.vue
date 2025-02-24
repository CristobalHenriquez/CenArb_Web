<script setup>
import { onMounted, ref, computed } from 'vue';
import ArbolService from '@/services/ArbolService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import Arbol from '../components/Arbol.vue';

// Estado para los árboles y la ordenación
const arboles = ref([]);
const ordenAscendente = ref(true);  // Estado de la ordenación (ascendente/descendente)
const criterioOrdenacion = ref('especie');  // Criterio actual de ordenación (puede ser 'especie', 'fecha', 'calle', 'barrio')

// Traer los datos de los árboles
onMounted(() => {
    ArbolService.obtenerArboles()
        .then(({ data }) => {
            arboles.value = data;
        })
        .catch(error => console.error('Error obteniendo árboles', error));
});

defineProps({
    titulo: {
        type: String
    }
});

// Computada para verificar si hay árboles
const existenArboles = computed(() => arboles.value.length > 0);

// Función para alternar el orden de la fecha, especie, calle o barrio
const toggleOrdenacion = (criterio) => {
    if (criterio === criterioOrdenacion.value) {
        // Si el criterio ya está seleccionado, solo alternamos el orden
        ordenAscendente.value = !ordenAscendente.value;
    } else {
        // Si cambiamos el criterio, reseteamos el orden a ascendente
        criterioOrdenacion.value = criterio;
        ordenAscendente.value = true;
    }
};

// Función para ordenar los árboles según el criterio seleccionado
const arbolesOrdenados = computed(() => {
    return [...arboles.value].sort((a, b) => {
        let valorA, valorB;

        // Ordenar por fecha de censo
        if (criterioOrdenacion.value === 'fecha') {
            const fechaA = new Date(a.fecha_censo);
            const fechaB = new Date(b.fecha_censo);
            valorA = fechaA;
            valorB = fechaB;
        } 
        // Ordenar por especie
        else if (criterioOrdenacion.value === 'especie') {
            const especieA = a.especie ? a.especie.nombre_comun.toLowerCase() : '';
            const especieB = b.especie ? b.especie.nombre_comun.toLowerCase() : '';
            valorA = especieA;
            valorB = especieB;
        }
        // Ordenar por calle
        else if (criterioOrdenacion.value === 'calle') {
            const calleA = a.calle ? a.calle.toLowerCase() : '';
            const calleB = b.calle ? b.calle.toLowerCase() : '';
            valorA = calleA;
            valorB = calleB;
        }
        // Ordenar por barrio
        else if (criterioOrdenacion.value === 'barrio') {
            const barrioA = a.barrio ? a.barrio.toLowerCase() : '';
            const barrioB = b.barrio ? b.barrio.toLowerCase() : '';
            valorA = barrioA;
            valorB = barrioB;
        }

        // Devolver el valor según el orden ascendente o descendente
        return ordenAscendente.value 
            ? valorA < valorB ? -1 : 1 
            : valorA > valorB ? -1 : 1;
    });
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
      <div class="flex justify-end">
          <RouterLink to="municipio">
              Volver
          </RouterLink>
      </div>
      <Heading>{{ titulo }}</Heading>

      <div v-if="existenArboles" class="flow-root mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                      <thead class="bg-green-800 text-white">
                          <tr>
                              <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                                  <button @click="toggleOrdenacion('especie')">
                                      Especie
                                  </button>
                              </th>

                              <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                                  <button @click="toggleOrdenacion('fecha')">
                                      Fecha del Censo
                                  </button>
                              </th>

                              <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Estado general</th>

                              <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                                  <button @click="toggleOrdenacion('calle')">
                                      Calle
                                  </button>
                              </th>

                              <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                                  <button @click="toggleOrdenacion('barrio')">
                                      Barrio
                                  </button>
                              </th>

                              <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Requiere intervención</th>
                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-gray-50">
                          <!-- Iteramos usando la propiedad computada para los árboles ordenados -->
                          <Arbol
                              v-for="arbol in arbolesOrdenados" 
                              :key="arbol.id"
                              :arbol="arbol"
                              class="hover:bg-green-100 transition-all text-gray-700"
                          />
                      </tbody>
                  </table>
              </div>
          </div>
      </div>

      <p v-else>No hay árboles</p>
  </div>
</template>
