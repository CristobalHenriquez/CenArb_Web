<script setup>
    import { computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        relevamiento:{
            type: Object
        }
    })



   
    

</script>

<template>
    <tr>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
        <p class="text-gray-500">{{ relevamiento.id }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
        <p class="text-gray-500">{{ relevamiento.especie }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ relevamiento.altura }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ relevamiento.diametro }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ relevamiento.estadoSanitario }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ relevamiento.ubicacion }}</p>
        </td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-500">{{ relevamiento.observaciones }}</p>
        </td>

    </tr>
</template>