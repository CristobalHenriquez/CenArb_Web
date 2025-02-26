<script setup>
import { computed } from 'vue';

const props = defineProps({
    arbol: {
        type: Object,
        required: true
    }
});

// Computed para obtener el nombre de la especie
const especieNombre = computed(() => {
    return props.arbol.especie ? props.arbol.especie.nombre_comun : 'Especie no encontrada';
});

// Formatear la fecha al formato 'dd/mm/yyyy'
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}
</script>

<template>
    <tr>
        <!-- Especie con enlace -->
        <td class="px-6 py-3 text-center text-sm">
            <router-link :to="`/arbol/${props.arbol.id}`" class="text-blue-500 hover:underline">
                {{ especieNombre }}
            </router-link>
        </td>

        <!-- Fecha formateada -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ formatearFecha(props.arbol.created_at) }}</p>
        </td>

        <!-- Estado general -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ props.arbol.tipo_condición_general }}</p>
        </td>

        <!-- Calle -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ props.arbol.calle }}</p>
        </td>

        <!-- Barrio -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ props.arbol.barrio }}</p>
        </td>

        <!-- Requiere intervención -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ props.arbol.requiere_intervencion ? 'Sí' : 'No' }}</p>
        </td>
    </tr>
</template>
