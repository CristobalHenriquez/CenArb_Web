<script setup>
    import { computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        cliente: {  // Cambié "user" por "cliente"
            type: Object
        }
    });

    defineEmits(['actualizar-estado', 'eliminar-cliente']);

    const estadoCliente = computed(() => {
        return props.cliente.estado;
    });
</script>

<template>
    <tr>
        <!-- Nombre del cliente -->
        <td class="px-6 py-3 text-center text-sm">
            <p class="text-gray-900 font-medium">{{ cliente.name }}</p>
        </td>        

        <!-- Rol del cliente -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <p class="text-gray-900 font-bold">{{ cliente.role }}</p>
        </td>

        <!-- Estado del cliente -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <button 
                class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                :class="[estadoCliente ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
                @click="$emit('actualizar-estado', { id: cliente.id, estado: cliente.estado })"
            >
                {{ estadoCliente ? 'Activo' : 'Inactivo' }}
            </button>
        </td>

        <!-- Acciones -->
        <td class="whitespace-nowrap py-4 px-3 text-sm text-center">
            <RouterLink 
                :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
                class="text-blue-500 hover:underline mr-4"
            >
                Editar
            </RouterLink>
            <button 
                class="text-red-600 hover:text-red-900"
                @click="$emit('eliminar-cliente', cliente.id)"
            >
                Eliminar
            </button>
        </td>
    </tr>
</template>
