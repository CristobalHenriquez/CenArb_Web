<script setup>
    import { onMounted, ref, computed } from 'vue';
    import ClienteService from '@/services/ClienteService';
    import RouterLink  from '../components/UI/RouterLink.vue';
    import Heading from '../components/UI/Heading.vue';

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


</script>

<template>
  <div class="flex flex-col min-h-screen">
        <div class="flex justify-end">
            <RouterLink to="municipio">
                Volver
            </RouterLink>
        </div>
        <Heading>{{ titulo }}</Heading>
        <div id="app" class="p-6">
    <h1 class="text-2xl font-extrabold text-slate-500">Árboles Censados</h1>
    
    <!-- Tabla con estilos de Tailwind -->
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr class="bg-blue-600 text-white">
          <th class="px-6 py-3 text-left text-sm font-medium">Tipo de Árbol</th>
          <th class="px-6 py-3 text-left text-sm font-medium">Ubicación</th>
          <th class="px-6 py-3 text-left text-sm font-medium">Nombre del Censista</th>
          <th class="px-6 py-3 text-left text-sm font-medium">Apellido del Censista</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterar sobre los datos obtenidos de la API -->
        
        <tr class="odd:bg-gray-50 even:bg-gray-100">
          <td class="px-6 py-3 text-sm">Eucalipto</td>
          <td class="px-6 py-3 text-sm">Los pinos 1885</td>
          <td class="px-6 py-3 text-sm">Juan</td>
          <td class="px-6 py-3 text-sm">Perez</td>
        </tr>
        <tr class="odd:bg-gray-50 even:bg-gray-100">
          <td class="px-6 py-3 text-sm">Eucalipto</td>
          <td class="px-6 py-3 text-sm">Los pinos 1885</td>
          <td class="px-6 py-3 text-sm">Juan</td>
          <td class="px-6 py-3 text-sm">Perez</td>
        </tr>
        <tr class="odd:bg-gray-50 even:bg-gray-100">
          <td class="px-6 py-3 text-sm">Eucalipto</td>
          <td class="px-6 py-3 text-sm">Los pinos 1885</td>
          <td class="px-6 py-3 text-sm">Juan</td>
          <td class="px-6 py-3 text-sm">Perez</td>
        </tr>
        <tr class="odd:bg-gray-50 even:bg-gray-100">
          <td class="px-6 py-3 text-sm">Eucalipto</td>
          <td class="px-6 py-3 text-sm">Los pinos 1885</td>
          <td class="px-6 py-3 text-sm">Juan</td>
          <td class="px-6 py-3 text-sm">Perez</td>
        </tr>
        <tr class="odd:bg-gray-50 even:bg-gray-100">
          <td class="px-6 py-3 text-sm">Eucalipto</td>
          <td class="px-6 py-3 text-sm">Los pinos 1885</td>
          <td class="px-6 py-3 text-sm">Juan</td>
          <td class="px-6 py-3 text-sm">Perez</td>
        </tr>
        <tr class="odd:bg-gray-50 even:bg-gray-100">
          <td class="px-6 py-3 text-sm">Eucalipto</td>
          <td class="px-6 py-3 text-sm">Los pinos 1885</td>
          <td class="px-6 py-3 text-sm">Juan</td>
          <td class="px-6 py-3 text-sm">Perez</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>