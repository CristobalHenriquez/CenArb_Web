<script setup>
    import { RouterLink } from 'vue-router';

    defineProps({
        to: {
            type: String
        }
    })
</script>
<template>
        <RouterLink 
            :to="{name: to}"
            class="block md:inline-block rounded bg-[rgb(75,101,98)] py-2 px-3 text-white uppercase font-bold shadow text-sm hover:bg-[rgb(95,121,118)]">
                
            <slot></slot>
        </RouterLink>

</template>