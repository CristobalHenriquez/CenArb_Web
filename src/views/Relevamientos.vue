<script setup>
import { onMounted, ref, computed } from 'vue';
import ArbolService from '@/services/ArbolService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import Arbol from '../components/Arbol.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const arboles = ref([]);
const ordenAscendente = ref(true);
const criterioOrdenacion = ref('especie');
const filtros = ref({ especie: '', fecha: '', calle: '', barrio: '' });

const paginaActual = ref(1);
const arbolesPorPagina = ref(10);

onMounted(() => {
  obtenerArboles();
});

const obtenerArboles = () => {
  ArbolService.obtenerArboles()
    .then(({ data }) => {
      arboles.value = data.data;
    })
    .catch(error => console.error('Error obteniendo árboles', error));
};

const arbolesFiltrados = computed(() => {
  return arboles.value.filter(arbol => {
    const coincideEspecie = arbol.especie?.nombre_comun.toLowerCase().includes(filtros.value.especie.toLowerCase());
    const coincideCalle = arbol.calle?.toLowerCase().includes(filtros.value.calle.toLowerCase());
    const coincideBarrio = arbol.barrio?.toLowerCase().includes(filtros.value.barrio.toLowerCase());
    const fechaArbol = arbol.created_at ? new Date(arbol.created_at).toISOString().split('T')[0] : '';
    const coincideFecha = !filtros.value.fecha || fechaArbol === filtros.value.fecha;
    return coincideEspecie && coincideCalle && coincideBarrio && coincideFecha;
  });
});

const toggleOrdenacion = (criterio) => {
  if (criterio === criterioOrdenacion.value) {
    ordenAscendente.value = !ordenAscendente.value;
  } else {
    criterioOrdenacion.value = criterio;
    ordenAscendente.value = true;
  }
};

const arbolesOrdenados = computed(() => {
  return [...arbolesFiltrados.value].sort((a, b) => {
    let valorA, valorB;
    if (criterioOrdenacion.value === 'fecha') {
      valorA = a.created_at ? new Date(a.created_at) : new Date(0);
      valorB = b.created_at ? new Date(b.created_at) : new Date(0);
    } else {
      valorA = a[criterioOrdenacion.value]?.toLowerCase() || '';
      valorB = b[criterioOrdenacion.value]?.toLowerCase() || '';
    }
    return ordenAscendente.value ? (valorA < valorB ? -1 : 1) : (valorA > valorB ? -1 : 1);
  });
});

const totalPaginas = computed(() => Math.ceil(arbolesOrdenados.value.length / arbolesPorPagina.value));

const arbolesPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * arbolesPorPagina.value;
  return arbolesOrdenados.value.slice(inicio, inicio + arbolesPorPagina.value);
});

const paginaAnterior = () => {
  if (paginaActual.value > 1) paginaActual.value--;
};

const paginaSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) paginaActual.value++;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Heading class="text-left">Relevamientos</Heading>
    <div class="flex justify-end p-4 bg-white">
      <RouterLink to="municipio">Volver</RouterLink>
    </div>

    <div class="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Filtros de búsqueda</h2>
      <div class="flex flex-wrap gap-4">
        <input v-model="filtros.especie" type="text" placeholder="Filtrar por especie" class="p-2 border rounded" />
        <input v-model="filtros.fecha" type="date" class="p-2 border rounded" />
        <input v-model="filtros.calle" type="text" placeholder="Filtrar por calle" class="p-2 border rounded" />
        <input v-model="filtros.barrio" type="text" placeholder="Filtrar por barrio" class="p-2 border rounded" />
      </div>
    </div>

    <div v-if="arbolesPaginados.length" class="flex flex-col flex-grow items-center">
      <div class="w-full max-w-6xl p-5 bg-white shadow-lg rounded-lg">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-green-800 text-white">
              <tr>
                <th class="px-6 py-3 text-center"><button @click="toggleOrdenacion('especie')">Especie</button></th>
                <th class="px-6 py-3 text-center"><button @click="toggleOrdenacion('fecha')">Fecha del Censo</button></th>
                <th class="px-6 py-3 text-center">Estado general</th>
                <th class="px-6 py-3 text-center"><button @click="toggleOrdenacion('calle')">Calle</button></th>
                <th class="px-6 py-3 text-center"><button @click="toggleOrdenacion('barrio')">Barrio</button></th>
                <th class="px-6 py-3 text-center">Requiere intervención</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-gray-50">
              <Arbol v-for="arbol in arbolesPaginados" :key="arbol.id" :arbol="arbol" />
            </tbody>
          </table>
        </div>
        <div class="flex justify-between items-center mt-4">
          <button @click="paginaAnterior" :disabled="paginaActual === 1" class="px-3 py-1 bg-gray-300 rounded">Anterior</button>
          <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
          <button @click="paginaSiguiente" :disabled="paginaActual === totalPaginas" class="px-3 py-1 bg-gray-300 rounded">Siguiente</button>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-gray-500 mt-10">No hay árboles</p>
  </div>
</template>