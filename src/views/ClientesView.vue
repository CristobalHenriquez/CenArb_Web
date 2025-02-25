<script setup>
import { onMounted, ref, computed } from 'vue';
import ClienteService from '@/services/ClienteService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import Cliente from '../components/Cliente.vue';

const clientes = ref([]);

// Obtener el rol del usuario desde el localStorage o valor predeterminado
const getUserRole = () => {
  return localStorage.getItem('user_role') || 'relevador'; // Si no se encuentra el rol, por defecto "relevador"
};

onMounted(() => {
  // Obtener el rol del usuario
  const role = getUserRole();

  ClienteService.obtenerClientes(role)
    .then(({ data }) => {
      console.log("Datos obtenidos de la API:", data);
      
      // Verifica si la respuesta es un arreglo o un objeto único
      if (Array.isArray(data)) {
        // Si es un arreglo, filtra los usuarios con rol "Relevador" o "Técnico"
        clientes.value = data.filter(user => user.role === 'Relevador' || user.role === 'Técnico');
      } else if (data && data.role) {
        // Si es un único objeto, ponlo dentro de un arreglo
        clientes.value = [data].filter(user => user.role === 'Relevador' || user.role === 'Técnico');
      } else {
        // Si no es ni un arreglo ni un objeto con propiedad 'role', muestra un mensaje de error
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

const existenClientes = computed(() => {
  return clientes.value.length > 0;
});

// Actualizar el estado del cliente
const actualizarEstado = ({ id, estado }) => {
  const role = getUserRole(); // Obtener rol para cada solicitud
  ClienteService.cambiarEstado(id, { estado: !estado }, role)
    .then(() => {
      const i = clientes.value.findIndex(cliente => cliente.id === id);
      clientes.value[i].estado = !estado;
    })
    .catch(error => console.log(error));
};

// Eliminar un cliente
const eliminarCliente = id => {
  const role = getUserRole(); // Obtener rol para cada solicitud
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
            <RouterLink to="agregar-cliente" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                Agregar Censista
            </RouterLink>
            <RouterLink to="municipio" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                Volver
            </RouterLink>
        </div>

        <Heading>{{ titulo }}</Heading>

        <div v-if="existenClientes" class="flow-root mt-10 w-full sm:w-[500px] md:w-[800px] mx-auto">
            <!-- Fondo contrastante -->
            <div class="bg-gray-300 p-5 shadow-lg">
                <!-- Tabla con encabezado estilizado -->
                <div class="overflow-hidden">
                    <table class="min-w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th scope="col" class="p-3 text-left text-sm font-bold uppercase">Nombre</th>
                                <th scope="col" class="p-3 text-left text-sm font-bold uppercase">Rol</th>
                                <th scope="col" class="p-3 text-left text-sm font-bold uppercase">Estado</th>
                                <th scope="col" class="p-3 text-left text-sm font-bold uppercase">Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <!-- Contenedor de la tabla -->
                <div class="w-full">
                    <table class="min-w-full divide-y divide-gray-300">
                        <tbody class="divide-y-0 divide-gray-200">
                            <Cliente
                                v-for="cliente in clientes"
                                :key="cliente.id"
                                :cliente="cliente"
                                class="hover:bg-green-100 transition-all text-gray-700 text-left"
                                @actualizar-estado="actualizarEstado"
                                @eliminar-cliente="eliminarCliente"
                            />
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <p v-else class="text-center text-gray-600 mt-5">No hay clientes</p>
    </div>
</template>
