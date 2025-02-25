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
        <td class="whitespace-nowrap py-2 pr-3 text-sm sm:pl-0 text-center bg-gray-200">
            <p class="font-medium text-gray-900">{{ cliente.name }}</p>  <!-- Cambié 'user' por 'cliente' -->
        </td>        
        <td class="whitespace-nowrap px-3 pl-3 py-2 text-sm text-center items-center justify-center text-gray-500 bg-gray-200">
            <p class="text-gray-900 font-bold">{{ cliente.role }}</p>  <!-- Cambié 'user.rol' por 'cliente.role' -->
        </td>
        <td class="whitespace-nowrap px-3 py-2 text-sm text-center bg-gray-200">
            <button 
                class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-gray-200"
                :class="[estadoCliente ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
                @click="$event => $emit('actualizar-estado', {id: cliente.id, estado: cliente.estado})"
            >
                {{ estadoCliente ? 'Activo' : 'Inactivo' }}
            </button>
        </td>
        <td class="whitespace-nowrap px-3 py-2 text-sm text-gray-500 bg-gray-200">
            <RouterLink 
                :to="{ name:'editar-cliente', params:{id: cliente.id}}"
                class="text-indigo-600 hover:text-indigo-900 ml-10 mr-5"
            >
                Editar
            </RouterLink>
            <button 
                class="text-red-600 hover:text-red-900"
                @click="$event => $emit('eliminar-cliente', cliente.id)"
            >
                Eliminar
            </button>
        </td>
    </tr>
</template>
