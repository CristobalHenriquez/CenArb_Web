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
        <div class="flex justify-end space-x-4">
            <RouterLink to="agregar-cliente">
                Agregar Censista
            </RouterLink>
            <RouterLink to="municipio">
                Volver
            </RouterLink>
        </div>
 

        <Heading>{{ titulo }}</Heading>        
        <div v-if="existenClientes" class="flow-root mt-10 w-full sm:w-[500px] md:w-[800px] mx-auto">
  <!-- Contenedor externo para el fondo contrastante -->
  <div class="rounded-md pt-0 bg-[rgb(75,101,98)] p-5">
    <!-- Encabezado separado con el mismo fondo -->
    <div class="rounded-md">
      <table class="min-w-full">
        <thead>
          <tr>
            <th scope="col" class="p-2 text-balance text-sm font-extrabold text-white">Nombre</th>
            <th scope="col" class="p-2 text-left text-sm font-extrabold text-white">Rol</th>
            <th scope="col" class="p-2 text-left text-sm font-extrabold text-white">Estado</th>
            <th scope="col" class="p-2 text-left text-sm font-extrabold text-white">Acciones</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- Contenedor original de la tabla -->
    <div class="flow-root w-full rounded-md bg-[rgb(176,194,152)]">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full">
                  
                  <tbody>
                    <Cliente
                        v-for="cliente in clientes"
                        :key="cliente.id"
                        :cliente="cliente"
                        @actualizar-estado="actualizarEstado"
                        @eliminar-cliente="eliminarCliente"
                    />
                  </tbody>
              </table>
          </div>
          
      </div>
      
  </div>     
       
    </div>
    </div> <p v-else="existenClientes">No hay clientes</p>
    </div>
    
</template>