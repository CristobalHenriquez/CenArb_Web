<script setup>
import { onMounted, ref } from 'vue';
import ArbolService from '@/services/ArbolService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';

const arboles = ref([]);

onMounted(() => {
    ArbolService.obtenerArboles()
        .then(({ data }) => {
            arboles.value = data;
        })
        .catch(error => console.log('Hubo un error', error));
});

defineProps({
    titulo: {
        type: String
    }
});
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <div class="flex justify-end">
            <RouterLink to="municipio"> Volver </RouterLink>
        </div>
        <Heading>{{ titulo }}</Heading>
        <div id="app" class="p-6">
            <h1 class="text-2xl font-extrabold text-slate-500">Árboles Censados</h1>

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
                    <tr v-for="arbol in arboles" :key="arbol.id" class="odd:bg-gray-50 even:bg-gray-100">
                        <td class="px-6 py-3 text-sm">{{ arbol.tipo }}</td>
                        <td class="px-6 py-3 text-sm">{{ arbol.ubicacion }}</td>
                        <td class="px-6 py-3 text-sm">{{ arbol.censista.nombre }}</td>
                        <td class="px-6 py-3 text-sm">{{ arbol.censista.apellido }}</td>
                    </tr>
                </tbody>
            </table>

            <p v-if="arboles.length === 0" class="text-gray-500 mt-4">No hay árboles censados.</p>
        </div>
    </div>
</template>
