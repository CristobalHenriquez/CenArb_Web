<script setup>
import { onMounted, ref, computed } from 'vue';
import ClienteService from '@/services/ClienteService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import Cliente from '../components/Cliente.vue';

const clientes = ref([]);

// Paginación
const paginaActual = ref(1);
const clientesPorPagina = ref(10); // Número de clientes por página

// Obtener el rol del usuario desde el localStorage o valor predeterminado
const getUserRole = () => {
  return localStorage.getItem('user_role') || 'relevador';
};

onMounted(() => {
  const role = getUserRole();

  ClienteService.obtenerClientes(role)
    .then(({ data }) => {
      console.log("Datos obtenidos de la API:", data);

      if (Array.isArray(data)) {
        clientes.value = data.filter(user => user.role === 'Relevador' || user.role === 'Técnico');
      } else if (data && data.role) {
        clientes.value = [data].filter(user => user.role === 'Relevador' || user.role === 'Técnico');
      } else {
        clientes.value = [];
        console.log("No se encontraron usuarios con el rol adecuado.");
      }
    })
    .catch(error => {
      console.log('Hubo un error al obtener los datos:', error);
    });
});

// Propiedades para el título (si es necesario)
defineProps({
  titulo: {
    type: String
  }
});

// Computed para determinar si hay clientes
const existenClientes = computed(() => clientes.value.length > 0);

// Paginación
const totalPaginas = computed(() => Math.ceil(clientes.value.length / clientesPorPagina.value));

const clientesPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * clientesPorPagina.value;
  return clientes.value.slice(inicio, inicio + clientesPorPagina.value);
});

const paginaAnterior = () => {
  if (paginaActual.value > 1) paginaActual.value--;
};

const paginaSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) paginaActual.value++;
};

// Actualizar el estado del cliente
const actualizarEstado = ({ id, estado }) => {
  const role = getUserRole();
  ClienteService.cambiarEstado(id, { estado: !estado }, role)
    .then(() => {
      const i = clientes.value.findIndex(cliente => cliente.id === id);
      clientes.value[i].estado = !estado;
    })
    .catch(error => console.log(error));
};

// Eliminar un cliente
const eliminarCliente = id => {
  const role = getUserRole();
  ClienteService.eliminarCliente(id, role)
    .then(() => {
      clientes.value = clientes.value.filter(cliente => cliente.id !== id);
    })
    .catch(error => console.log(error));
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Contenedor de enlaces -->
    <div class="flex justify-end space-x-4 p-4">
      <RouterLink to="agregar-cliente"
        class="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        Agregar Censista
      </RouterLink>
      <RouterLink to="municipio"
        class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        Volver
      </RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <div v-if="existenClientes" class="flow-root mx-auto mt-10 p-5 bg-white shadow-xl rounded-lg  w-full">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-3 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-3 lg:px-8">
          <table class="min-w-full w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg overflow-hidden">
            <thead class="bg-green-800 text-white">
              <tr>
                <th scope="col" class="px-3 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" class="px-3 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" class="px-3 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" class="px-3 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <Cliente 
                v-for="cliente in clientesPaginados" 
                :key="cliente.id" 
                :cliente="cliente"
                class="hover:bg-green-200 transition-all duration-150 ease-in-out transform hover:scale-100 hover:shadow-sm text-gray-700 py-2"
                @actualizar-estado="actualizarEstado"
                @eliminar-cliente="eliminarCliente"
              />
            </tbody>
          </table>
        </div>
      </div>

      </div>

    <!-- Paginación -->
    <div v-if="existenClientes" class="flex justify-between items-center mt-4 px-5">
      <button @click="paginaAnterior" :disabled="paginaActual === 1"
        class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
        Anterior
      </button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button @click="paginaSiguiente" :disabled="paginaActual === totalPaginas"
        class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
        Siguiente
      </button>
    </div>

    <p v-else class="text-center text-gray-600 mt-5">No hay clientes</p>
  </div>
</template>
