<script setup>
import { onMounted, ref, computed } from 'vue';
import ArbolService from '@/services/ArbolService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';

const arboles = ref([]);
const paginaActual = ref(1);
const arbolesPorPagina = ref(10);
const filtros = ref({ especie: '', fecha: '', calle: '', barrio: '' });
const arbolSeleccionado = ref(null);

onMounted(() => {
  obtenerArboles();
});

const obtenerArboles = async () => {
  try {
    const { data } = await ArbolService.obtenerArboles();
    console.log('📌 Datos recibidos:', data);
    arboles.value = data.data || [];
  } catch (error) {
    console.error('❌ Error obteniendo árboles', error);
  }
};

// 🔹 Filtrar árboles según criterios
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

// 🔹 Paginación
const totalPaginas = computed(() => Math.ceil(arbolesFiltrados.value.length / arbolesPorPagina.value));

const arbolesPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * arbolesPorPagina.value;
  return arbolesFiltrados.value.slice(inicio, inicio + arbolesPorPagina.value);
});

const paginaAnterior = () => {
  if (paginaActual.value > 1) paginaActual.value--;
};

const paginaSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) paginaActual.value++;
};

// 🌳 Seleccionar un árbol para ver su detalle
const seleccionarArbol = (arbol) => {
  arbolSeleccionado.value = arbol;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Heading class="text-left">Relevamientos</Heading>
    <div class="flex justify-end p-4 bg-white">
      <RouterLink to="municipio">Volver</RouterLink>
    </div>

    <!-- Filtros -->
    <div class="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Filtros de búsqueda</h2>
      <div class="flex flex-wrap gap-4">
        <input v-model="filtros.especie" type="text" placeholder="Filtrar por especie" class="p-2 border rounded" />
        <input v-model="filtros.fecha" type="date" class="p-2 border rounded" />
        <input v-model="filtros.calle" type="text" placeholder="Filtrar por calle" class="p-2 border rounded" />
        <input v-model="filtros.barrio" type="text" placeholder="Filtrar por barrio" class="p-2 border rounded" />
      </div>
    </div>

    <!-- Tabla de árboles -->
    <div v-if="arbolesPaginados.length" class="flex flex-col flex-grow items-center mt-4">
      <div class="w-full max-w-6xl p-5 bg-white shadow-lg rounded-lg">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-green-800 text-white">
              <tr>
                <th class="px-6 py-3 text-center">Especie</th>
                <th class="px-6 py-3 text-center">Fecha del Censo</th>
                <th class="px-6 py-3 text-center">Calle</th>
                <th class="px-6 py-3 text-center">Barrio</th>
                <th class="px-6 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-gray-50">
              <tr v-for="arbol in arbolesPaginados" :key="arbol.id">
                <td class="px-6 py-3 text-center">{{ arbol.especie?.nombre_comun || 'Sin especie' }}</td>
                <td class="px-6 py-3 text-center">{{ arbol.created_at }}</td>
                <td class="px-6 py-3 text-center">{{ arbol.calle }}</td>
                <td class="px-6 py-3 text-center">{{ arbol.barrio }}</td>
                <td class="px-6 py-3 text-center">
                  <button @click="seleccionarArbol(arbol)" class="px-3 py-1 bg-blue-500 text-white rounded">
                    Ver Detalle
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Paginación -->
        <div class="flex justify-between items-center mt-4">
          <button @click="paginaAnterior" :disabled="paginaActual === 1" class="px-3 py-1 bg-gray-300 rounded">
            Anterior
          </button>
          <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
          <button @click="paginaSiguiente" :disabled="paginaActual === totalPaginas" class="px-3 py-1 bg-gray-300 rounded">
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay resultados -->
    <p v-else class="text-center text-gray-500 mt-10">No hay árboles</p>

    <!-- 🌳 Detalle completo del árbol seleccionado -->
    <div v-if="arbolSeleccionado" class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold text-gray-800">Detalle del Árbol</h2>
        <p><strong>Especie:</strong> {{ arbolSeleccionado.especie?.nombre_comun || 'Sin especie' }}</p>
        <p><strong>Nombre Científico:</strong> {{ arbolSeleccionado.especie?.nombre_cientifico || 'Desconocido' }}</p>
        <p><strong>Fecha del Censo:</strong> {{ arbolSeleccionado.created_at }}</p>
        <p><strong>Calle:</strong> {{ arbolSeleccionado.calle }}</p>
        <p><strong>Barrio:</strong> {{ arbolSeleccionado.barrio }}</p>
        <p><strong>Altura:</strong> {{ arbolSeleccionado.altura || 'No disponible' }} m</p>
        <p><strong>Diámetro:</strong> {{ arbolSeleccionado.diametro || 'No disponible' }} cm</p>
        <p><strong>Estado:</strong> {{ arbolSeleccionado.estado_general || 'No especificado' }}</p>
        <p><strong>Intervención necesaria:</strong> {{ arbolSeleccionado.requiere_intervencion ? 'Sí' : 'No' }}</p>
        <button @click="arbolSeleccionado = null" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
