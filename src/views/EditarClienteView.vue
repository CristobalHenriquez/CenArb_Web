<script setup>
    import { onMounted, reactive } from 'vue';
    import { FormKit } from '@formkit/vue';
    import { useRouter, useRoute } from 'vue-router';
    import ClienteService from '@/services/ClienteService';
    import RouterLink  from '../components/UI/RouterLink.vue';
    import Heading from '../components/UI/Heading.vue';

    
    const router = useRouter()
    const route = useRoute()

    const {id} = route.params

    const formData = reactive({})

    onMounted(() => {
        ClienteService.obtenerCliente(id)
            .then(({data}) =>{
                Object.assign(formData, data)
            })
            .catch(error => console.log(error))
    })

    defineProps({
        titulo:{
        type: String
        }
    })

    const handleSubmit= (data) => {
        ClienteService.actualizarCliente(id, data)
        .then(() => router.push({name: 'inicio'}))
        .catch(error => console.log(error))
    }

</script>

<template>
    <div class="min-h-screen bg-gray-300 mb-5">
        <div class="flex justify-end p-4">
            <RouterLink to="inicio"
            >
                Volver
            </RouterLink>
        </div>
        <Heading class="text-center text-2xl font-bold text-gray-800">{{titulo}}</Heading>

        <div class="mx-auto mt-10 bg-[rgb(75,101,98)] shadow-lg rounded-lg md:w-2/3">
            <div class="py-10 px-6 md:px-10 text-white">
            <FormKit
                type="form"
                submit-label="Guardar cambios"
                incomplete-message="No se pudo enviar, revisa los mensajes"
                @submit="handleSubmit"
                class="space-y-6"
                :value="formData"
            >
                <FormKit 
                    type="text"
                    label="Nombre"
                    name="nombre"
                    placeholder="Nombre de cliente"
                    help="Coloca el nombre del cliente que deseas registrar"
                    validation="required"
                    :validation-messages="{ required: 'El nombre del cliente es obligatorio'}"
                    v-model="formData.nombre"
                />
                <FormKit
                    type="text"
                    label="Contraseña"
                    name="password"
                    help="Introduce una contraseña segura"
                    validation="required|min:8"
                    :validation-messages="{
                        required: 'La contraseña es obligatoria',
                        min: 'La contraseña debe tener al menos 8 caracteres'
                    }"
                    v-model="formData.password"
                    />
                <FormKit 
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email de cliente"
                    validation="required|email"
                    :validation-messages="{ required: 'El email del cliente es obligatorio', email:'Coloca un email valido'}"
                    v-model="formData.email"
                />
                <FormKit 
                    type="text"
                    label="Rol"
                    name="Rol"
                    placeholder="Rol del censista"v-model="formData.rol"
                />
                

            </FormKit>
            </div>
        </div>
    </div>
</template>

<style>
    .formkit-wrapper {
        max-width: 100%;

    }
</style>