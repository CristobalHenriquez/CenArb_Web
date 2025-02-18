<script setup>
    import { computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        arbol: {  // Cambié 'relevamiento' por 'arbol'
            type: Object
        }
    })
</script>

<template>
    <tr>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
        <p class="text-gray-500">{{ arbol.id }}</p>  <!-- Cambié relevamiento por arbol -->
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
        <p class="text-gray-500">{{ arbol.id_especie }}</p>  
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.tipo_altura }}</p>  <!-- Cambié relevamiento por arbol -->
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.tipo_diametro_tronco }}</p>  <!-- Cambié relevamiento por arbol -->
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.estadoSanitario }}</p>  <!-- Cambié relevamiento por arbol -->
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.calle }}  {{ arbol.numero_aprox }}</p>  <!-- Cambié relevamiento por arbol -->
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.detalles_arbol }}</p>  <!-- Cambié relevamiento por arbol -->
        </td>
    </tr>
</template>
