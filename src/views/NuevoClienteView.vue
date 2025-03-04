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
  <div class="min-h-screen bg-gray-100 mb-5">
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
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #3b82f6;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-volver:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}

/* Estilo del título */
.titulo {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
}

/* Contenedor del formulario */
.formulario-container {
  margin: 2.5rem auto;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
}

/* Contenido interno del formulario */
.formulario-content {
  padding: 2rem;
}

/* Estilos específicos para los campos FormKit */
:deep(.formkit-input) {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

:deep(.formkit-input:focus) {
  border-color: #3b82f6;
  box-shadow: 0px 0px 0px 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

:deep(.formkit-label) {
  font-weight: bold;
  color: #374151;
  margin-bottom: 8px;
  display: block;
}

:deep(.formkit-message) {
  text-align: center;
  border-radius: 0%;
  color: #f2e9e9;
  font-size: 12px;
  margin-top: 4px;
}

/* Estilo del botón de envío */
:deep(.formkit-submit) {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #10b981;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.formkit-submit:hover) {
  background-color: #059669;
  transform: translateY(-1px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}

/* Espaciado entre los campos */
.formulario :deep(.formkit-wrapper) {
  margin-bottom: 20px;
}
</style>