<script setup>
import { computed } from 'vue';

const props = defineProps({
    arbol: {  // El prop es el arbol que se pasa al componente
        type: Object
    }
});

// Computed para obtener el nombre de la especie directamente del arbol
const especieNombre = computed(() => {
    // Verifica si el arbol tiene una especie definida
    return props.arbol.especie ? props.arbol.especie.nombre_comun : 'Especie no encontrada';  // Devuelve el nombre común de la especie o un mensaje de error si no está presente
});
</script>

<template>
    <tr>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.id }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ especieNombre }}</p>  <!-- Muestra el nombre de la especie directamente -->
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.tipo_altura }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.tipo_diametro_tronco }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.estadoSanitario }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.calle }} {{ arbol.numero_aprox }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.detalles_arbol }}</p>
        </td>
    </tr>
</template>
