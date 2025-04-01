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
const fotoArbol = ref('');

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

// Función para formatear la fecha
const formatearFecha = (fecha) => {
  return fecha ? new Date(fecha).toLocaleDateString() : '';
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

const cargarFotoArbol = async (id) => {
  if (!id) {
    fotoArbol.value = '../assets/img/default.jpg'; // Imagen por defecto
    return;
  }

  try {
    const response = await ArbolService.obtenerFotoArbol(id);

    if (response.data && response.data.ruta_foto) {
      console.log("🔗 URL de la foto:", response.data.ruta_foto);
      fotoArbol.value = response.data.ruta_foto; // Asignar la URL directamente
    } else {
      console.warn("⚠️ No se encontró la URL de la foto.");
      fotoArbol.value = '../assets/img/default.jpg';
    }
  } catch (error) {
    console.error('❌ Error al obtener la foto del árbol:', error);
    fotoArbol.value = '../assets/img/default.jpg';
  }
};






// 🌳 Seleccionar un árbol para ver su detalle
const seleccionarArbol = (arbol) => {
  arbolSeleccionado.value = arbol;
  cargarFotoArbol(arbol.id);
};

const eliminarArbol = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este árbol?')) return;

  try {
    await ArbolService.eliminarArbol(id);
    arboles.value = arboles.value.filter(arbol => arbol.id !== id);
    console.log(`✅ Árbol con ID ${id} eliminado`);
  } catch (error) {
    console.error(`❌ Error al eliminar el árbol con ID ${id}`, error);
  }
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
                <td class="px-6 py-3 text-center">{{ formatearFecha(arbol.created_at) }}</td>
                <td class="px-6 py-3 text-center">{{ arbol.calle }}</td>
                <td class="px-6 py-3 text-center">{{ arbol.barrio }}</td>
                <td class="px-6 py-3 text-center flex justify-center gap-2">
                  <button @click="seleccionarArbol(arbol)" class="px-3 py-1 bg-blue-500 text-white rounded">
                    Ver Detalle
                  </button>
                  <button @click="eliminarArbol(arbol.id)" class="px-3 py-1 bg-red-500 text-white rounded">
                    Eliminar
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
          <button @click="paginaSiguiente" :disabled="paginaActual === totalPaginas"
            class="px-3 py-1 bg-gray-300 rounded">
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay resultados -->
    <p v-else class="text-center text-gray-500 mt-10">No hay árboles</p>

    <!-- 🌳 Detalle completo del árbol seleccionado -->
    <div v-if="arbolSeleccionado"
      class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-5 rounded-lg shadow-lg w-full max-w-3xl flex gap-1">
        <div class="w-1/3">
          <img :src="fotoArbol" alt="Árbol" class="w-full h-auto rounded-lg shadow">
        </div>
        <div class="w-2/3">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Detalle del Árbol</h2>

          <div class="grid grid-cols-2 gap-6">
            <div class="space-y">
              <p><strong>Especie:</strong> {{ arbolSeleccionado.especie.nombre_comun }}</p>
              <p><strong>Municipio:</strong> {{ arbolSeleccionado.municipio.nombre }}</p>
              <p><strong>Coordenadas:</strong> Lat: {{ arbolSeleccionado.latitud }}, Long: {{ arbolSeleccionado.longitud}}</p>
              <p><strong>Dirección:</strong> {{ arbolSeleccionado.calle }} {{ arbolSeleccionado.numero_aprox }}</p>
              <p><strong>Identificación:</strong> {{ arbolSeleccionado.identificacion }}</p>
              <p><strong>Barrio:</strong> {{ arbolSeleccionado.barrio }}</p>
              <p><strong>Altura:</strong> {{ arbolSeleccionado.tipo_altura }}</p>
              <p><strong>Diámetro del tronco:</strong> {{ arbolSeleccionado.tipo_diametro_tronco }}</p>
              <p><strong>Ámbito:</strong> {{ arbolSeleccionado.tipo_ambito }}</p>
              <p><strong>Distancia entre ejemplares:</strong> {{ arbolSeleccionado.tipo_distancia_entre_ejemplares }}
              </p>
            </div>

            <div class="space-y">
              <p><strong>Distancia al cordón:</strong> {{ arbolSeleccionado.tipo_distancia_al_cordon }}</p>
              <p><strong>Interferencia aérea:</strong> {{ arbolSeleccionado.tipo_interferencia_aerea }}</p>
              <p><strong>Tipo de cable:</strong> {{ arbolSeleccionado.tipo_cable }}</p>
              <p><strong>Cazuela:</strong> {{ arbolSeleccionado.cazuela }}</p>
              <p><strong>Protegido:</strong> {{ arbolSeleccionado.protegido ? 'Sí' : 'No' }}</p>
              <p><strong>Fecha del Censo:</strong> {{ formatearFecha(arbolSeleccionado.created_at) }}</p>
              <p><strong>Interferencias:</strong> {{ arbolSeleccionado.interferencias }}</p>
              <p><strong>Detalles adicionales:</strong> {{ arbolSeleccionado.detalles_arbol }}</p>
              <p><strong>Edad:</strong> {{ arbolSeleccionado.edad }}</p>
              <p><strong>Condición Base:</strong> {{ arbolSeleccionado.tipo_condición_base }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-5">
            <div class="space-y">
              <p><strong>Daño:</strong> {{ arbolSeleccionado.detalle_tipo_daño }}</p>
              <p><strong>Condición del Tronco:</strong> {{ arbolSeleccionado.tipo_condición_tronco }}</p>
              <p><strong>Condición de la Corona:</strong> {{ arbolSeleccionado.tipo_condición_corona }}</p>
              <p><strong>Condición General:</strong> {{ arbolSeleccionado.tipo_condición_general }}</p>
            </div>

            <div class="space-y">
              <p><strong>Fecha de creación:</strong> {{ formatearFecha(arbolSeleccionado.created_at) }}</p>
              <p><strong>Última actualización:</strong> {{ formatearFecha(arbolSeleccionado.updated_at) }}</p>
            </div>
          </div>

          <button @click="arbolSeleccionado = null" class="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
