<script setup>
import { FormKit } from '@formkit/vue';
import { useRouter } from 'vue-router';
import ClienteService from '@/services/ClienteService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';

const router = useRouter();

defineProps({
  titulo: {
    type: String,
  },
});

const handleSubmit = (data) => {
  data.estado = 1; // Define el estado como activo
  ClienteService.agregarCliente(data)
    .then((respuesta) => {
      console.log(respuesta);
      router.push('/');
    })
    .catch((error) => console.log(error));
};
</script>

<template>
  <div class="min-h-screen bg-gray-300 mb-5">
    <!-- Botón para volver -->
    <div class="flex justify-end p-4">
      <RouterLink to="inicio" class="btn-volver">
        Volver
      </RouterLink>
    </div>

    <!-- Título -->
    <Heading class="titulo">
      {{ titulo }}
    </Heading>

    <!-- Contenedor del formulario -->
    <div class="formulario-container">
      <div class="formulario-content">
        <FormKit type="form" submit-label="Agregar censista" incomplete-message="No se pudo enviar, revisa los mensajes"
          @submit="handleSubmit" class="formulario">
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre del censista" validation="required"
            :validation-messages="{ required: 'El nombre del censista es obligatorio' }" />

          <FormKit type="password" label="Contraseña" name="password" placeholder="Contraseña"
            validation="required|min:8" :validation-messages="{
              required: 'La contraseña es obligatoria',
              min: 'La contraseña debe tener al menos 8 caracteres'
            }" />

          <FormKit type="password" label="Confirmar Contraseña" name="password_confirmation"
            placeholder="Confirmar contraseña" validation="required|same:password" :validation-messages="{
              required: 'La confirmación de la contraseña es obligatoria',
              same: 'Las contraseñas no coinciden'
            }" />

          <FormKit type="email" label="Email" name="email" placeholder="Email del censista" validation="required|email"
            :validation-messages="{ required: 'El email del censista es obligatorio', email: 'Coloca un email válido' }"
            class="email-censista" />

          <FormKit type="select" label="Rol" name="role" placeholder="Selecciona el rol del censista" :options="[
            { label: 'Relevador', value: 'relevador' },
            { label: 'Técnico', value: 'tecnico' }
          ]" />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilo del botón */
.btn-volver {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #3b82f6;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.btn-volver:hover {
  background-color: #2563eb;
}

/* Estilo del título */
.titulo {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

/* Contenedor del formulario */
.formulario-container {
  margin: 2.5rem auto;
  background-color: rgb(75, 101, 98);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 66%;
}

/* Contenido interno del formulario */
.formulario-content {
  padding: 2.5rem;
  color: black;
}

/* Estilos específicos para los campos FormKit */
:deep(.formkit-input) {
  background-color: #f3f4f6;
  border-color: #6b7280;
  border-radius: 6px;
  padding: 8px;
  width: 100%;
}

:deep(.formkit-label) {
  font-weight: bold;
  color: white;
}

/* Espaciado entre los campos */
.formulario :deep(.formkit-wrapper) {
  margin-bottom: 16px;
}
</style>
