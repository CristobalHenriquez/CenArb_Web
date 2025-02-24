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
        <td class="px-6 py-3 text-center text-sm">
                  <router-link :to="`/arbol/${arbol.id}`" class="text-blue-500 hover:underline">
                    {{ especieNombre }}
                  </router-link>
                </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.fecha_censo }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.tipo_condición_general }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.calle }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.barrio }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ arbol.requiere_intervencion ? 'Sí' : 'No' }}</p>
        </td>
    </tr>
</template>
