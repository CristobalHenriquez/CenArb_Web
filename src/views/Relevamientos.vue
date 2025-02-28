<script setup>
import { onMounted, ref, computed } from 'vue';
import ArbolService from '@/services/ArbolService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import Arbol from '../components/Arbol.vue';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Estado para los árboles y la ordenación
const arboles = ref([]);
const ordenAscendente = ref(true);
const criterioOrdenacion = ref('especie');

// Filtros para la búsqueda
const filtros = ref({
  especie: '',
  calle: '',
  barrio: ''
});

// Traer los datos de los árboles al inicio
onMounted(() => {
  obtenerArboles();
});

// Función para obtener los árboles sin filtros
const obtenerArboles = () => {
  ArbolService.obtenerArboles()
    .then(({ data }) => {
      arboles.value = data.data;  // Asegúrate de acceder correctamente a la propiedad 'data' de la respuesta
    })
    .catch(error => console.error('Error obteniendo árboles', error));
};

// Propiedad computada para filtrar los árboles según los filtros activos
const arbolesFiltrados = computed(() => {
  return arboles.value.filter(arbol => {
    const coincideEspecie = arbol.especie?.nombre_comun.toLowerCase().includes(filtros.value.especie.toLowerCase());
    const coincideCalle = arbol.calle?.toLowerCase().includes(filtros.value.calle.toLowerCase());
    const coincideBarrio = arbol.barrio?.toLowerCase().includes(filtros.value.barrio.toLowerCase());
    
    return coincideEspecie && coincideCalle && coincideBarrio;
  });
});
// Función para alternar el orden de la fecha, especie, calle o barrio
const toggleOrdenacion = (criterio) => {
  if (criterio === criterioOrdenacion.value) {
    ordenAscendente.value = !ordenAscendente.value;
  } else {
    criterioOrdenacion.value = criterio;
    ordenAscendente.value = true;
  }
};

// Computada para ordenar los árboles según el criterio seleccionado
const arbolesOrdenados = computed(() => {
  return [...arbolesFiltrados.value].sort((a, b) => {
    let valorA, valorB;

    if (criterioOrdenacion.value === 'fecha') {
      valorA = new Date(a.created_at);
      valorB = new Date(b.created_at);
    } else if (criterioOrdenacion.value === 'especie') {
      valorA = a.especie ? a.especie.nombre_comun.toLowerCase() : '';
      valorB = b.especie ? b.especie.nombre_comun.toLowerCase() : '';
    } else if (criterioOrdenacion.value === 'calle') {
      valorA = a.calle ? a.calle.toLowerCase() : '';
      valorB = b.calle ? b.calle.toLowerCase() : '';
    } else if (criterioOrdenacion.value === 'barrio') {
      valorA = a.barrio ? a.barrio.toLowerCase() : '';
      valorB = b.barrio ? b.barrio.toLowerCase() : '';
    }

    return ordenAscendente.value 
      ? valorA < valorB ? -1 : 1 
      : valorA > valorB ? -1 : 1;
  });
});

// 🆕 Función para exportar todos los detalles del árbol a Excel
const exportarExcel = () => {
  const datos = arbolesFiltrados.value.map(arbol => ({
    ID: arbol.id,
    'Especie Nombre Científico': arbol.especie?.nombre_cientifico || 'N/A',
    Municipio: arbol.id_municipio || 'N/A',
    Coordenadas: `Lat: ${arbol.latitud}, Long: ${arbol.longitud}`,
    Dirección: `${arbol.calle || ''} ${arbol.numero_aprox || ''}`,
    Identificación: arbol.identificacion || 'N/A',
    Barrio: arbol.barrio || 'N/A',
    'Altura': arbol.tipo_altura || 'N/A',
    'Diámetro del Tronco': arbol.tipo_diametro_tronco || 'N/A',
    'Ámbito': arbol.tipo_ambito || 'N/A',
    'Distancia entre Ejemplares': arbol.tipo_distancia_entre_ejemplares || 'N/A',
    'Distancia al Cordón': arbol.tipo_distancia_al_cordon || 'N/A',
    'Interferencia Aérea': arbol.tipo_interferencia_aerea || 'N/A',
    'Tipo de Cable': arbol.tipo_cable || 'N/A',
    'Requiere Intervención': arbol.requiere_intervencion ? 'Sí' : 'No',
    'Tipo de Intervención': arbol.tipo_intervencion || 'N/A',
    'Tratamiento Previo': arbol.tratamiento_previo || 'N/A',
    'Cazuela': arbol.cazuela || 'N/A',
    'Protegido': arbol.protegido ? 'Sí' : 'No',
    'Fecha del Censo': arbol.fecha_censo || 'N/A',
    'Interferencias': arbol.interferencias || 'N/A',
    'Detalles Adicionales': arbol.detalles_arbol || 'N/A',
    'Edad': arbol.edad || 'N/A',
    'Fecha de Creación': new Date(arbol.created_at).toLocaleDateString() || 'N/A',
    'Última Actualización': new Date(arbol.updated_at).toLocaleDateString() || 'N/A',
    'Condición Base': arbol.tipo_condición_base || 'N/A',
    'Daño': arbol.detalle_tipo_daño || 'N/A',
    'Condición del Tronco': arbol.tipo_condición_tronco || 'N/A',
    'Condición de la Corona': arbol.tipo_condición_corona || 'N/A',
    'Condición General': arbol.tipo_condición_general || 'N/A'
  }));

  const hojaDeTrabajo = XLSX.utils.json_to_sheet(datos);
  const libroDeTrabajo = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeTrabajo, 'Árboles');
  const excelBuffer = XLSX.write(libroDeTrabajo, { bookType: 'xlsx', type: 'array' });
  const archivo = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(archivo, 'Detalle_Completo_Arboles.xlsx');
};
</script>

<template>
    <div class="flex flex-col min-h-screen">
      <!-- Navegación y Título -->
      <Heading class="text-left">Relevamientos</Heading>
      <div class="flex justify-end p-4 bg-white">
        <RouterLink to="municipio">
          Volver
        </RouterLink>
      </div>
  
      <!-- Filtro de Árboles -->
      <div class="flex justify-between p-4 bg-gray-100">
        <div class="flex space-x-4">
          <input v-model="filtros.especie" type="text" placeholder="Filtrar por especie" class="p-2 border rounded" />
          <input v-model="filtros.calle" type="text" placeholder="Filtrar por calle" class="p-2 border rounded" />
          <input v-model="filtros.barrio" type="text" placeholder="Filtrar por barrio" class="p-2 border rounded" />
        </div>
      </div>
  
      <!-- Tabla de Árboles -->
      <div v-if="arbolesOrdenados.length" class="flex flex-col flex-grow items-center">
        <div class="w-full max-w-6xl p-5 bg-white shadow-lg rounded-lg">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
              <thead class="bg-green-800 text-white">
                <tr>
                  <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                    <button @click="toggleOrdenacion('especie')">Especie</button>
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                    <button @click="toggleOrdenacion('fecha')">Fecha del Censo</button>
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Estado general</th>
                  <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                    <button @click="toggleOrdenacion('calle')">Calle</button>
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">
                    <button @click="toggleOrdenacion('barrio')">Barrio</button>
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-sm font-bold uppercase">Requiere intervención</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-gray-50">
                <Arbol
                  v-for="arbol in arbolesOrdenados"
                  :key="arbol.id"
                  :arbol="arbol"
                  class="hover:bg-green-100 transition-all text-gray-700"
                />
              </tbody>
            </table>
          </div>
  
          <!-- Botón de Exportar a Excel -->
          <div class="flex justify-end mt-4">
            <button @click="exportarExcel" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Exportar Detalle Completo a Excel
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mensaje cuando no hay árboles -->
      <p v-else class="text-center text-gray-500 mt-10">No hay árboles</p>
    </div>
</template>
