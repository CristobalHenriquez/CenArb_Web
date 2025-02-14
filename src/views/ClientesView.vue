<script setup>
    import { onMounted, ref, computed } from 'vue';
    import ClienteService from '@/services/ClienteService';
    import RouterLink  from '../components/UI/RouterLink.vue';
    import Heading from '../components/UI/Heading.vue';
    import Cliente from '../components/Cliente.vue';

    const clientes = ref([])

    onMounted(() => {
        ClienteService.obtenerClientes()
            .then(({data}) => {
                clientes.value = data
            })
            .catch(error => console.log('Hubo un error'))
        })

    defineProps({
        titulo:{
        type: String
        }
    })

    const existenClientes = computed(() =>{
        return clientes.value.length > 0
    })

    const actualizarEstado = ({id, estado}) => {
        ClienteService.cambiarEstado(id, {estado: !estado})
        .then(() => {
            const i = clientes.value.findIndex(cliente => cliente.id === id)
            clientes.value[i].estado = !estado
        })
        .catch(error => console.log(error))
    }

    const eliminarCliente = id => {
        ClienteService.eliminarCliente(id)
        .then(() => {
            clientes.value = clientes.value.filter(cliente => cliente.id !== id)
        })
        .catch(error => console.log(error))
    }

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
        <div class="rounded-lg bg-gray-800 p-5 shadow-lg">
          <!-- Tabla con encabezado estilizado -->
          <div class="rounded-lg overflow-hidden">
            <table class="min-w-full bg-gradient-to-r from-green-800 to-lime-700 text-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th scope="col" class="p-3 text-center text-sm font-bold uppercase">Nombre</th>
                  <th scope="col" class="p-3 text-center text-sm font-bold uppercase">Rol</th>
                  <th scope="col" class="p-3 text-center text-sm font-bold uppercase">Estado</th>
                  <th scope="col" class="p-3 text-center text-sm font-bold uppercase">Acciones</th>
                </tr>
              </thead>
            </table>
          </div>
  
          <!-- Contenedor original de la tabla -->
          <div class="flow-root w-full rounded-lg bg-gray-100">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-300">
                  <tbody class="divide-y divide-gray-200">
                    <Cliente
                      v-for="cliente in clientes"
                      :key="cliente.id"
                      :cliente="cliente"
                      class="hover:bg-green-100 transition-all text-gray-700"
                      @actualizar-estado="actualizarEstado"
                      @eliminar-cliente="eliminarCliente"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <p v-else class="text-center text-gray-600 mt-5">No hay clientes</p>
    </div>
  </template>
  