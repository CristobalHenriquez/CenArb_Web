<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ClienteService from '@/services/ClienteService';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const { id } = route.params;
const passwordError = ref('');
const userRole = localStorage.getItem('userRole'); // Obtenemos el rol guardado

const formData = reactive({
  name: '',
  password: '',
  password_confirmation: '',
  email: '',
  role: ''
});

onMounted(() => {
  ClienteService.obtenerCliente(id, userRole)
    .then(({ data }) => {
      Object.assign(formData, data);
    })
    .catch(error => {
      console.error(error);
      toast.error('Error al obtener los datos del censista');
    });
});

const validarPassword = (event) => {
  const valor = event.target.value;
  if (valor.length < 8) {
    passwordError.value = 'La contraseña debe tener al menos 8 caracteres';
  } else {
    passwordError.value = '';
  }
};

const validarNombre = (event) => {
  const valor = event.target.value;
  event.target.value = valor.replace(/[0-9]/g, '');
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (formData.password.length < 8) {
    toast.error('La contraseña debe tener al menos 8 caracteres');
    return;
  }

  ClienteService.actualizarCliente(id, formData, userRole)
    .then(() => {
      toast.success('Censista actualizado con éxito');
      router.push('/inicio');
    })
    .catch(error => {
      console.error(error);
      toast.error('Error al actualizar el censista');
    });
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 mb-5">
    <div class="flex justify-end p-4">
      <RouterLink to="inicio" class="btn-volver">Volver</RouterLink>
    </div>

    <Heading class="titulo">Editar Censista</Heading>

    <div class="formulario-container">
      <div class="formulario-content">
        <form @submit="handleSubmit" class="formulario">
          <div class="campo">
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" v-model="formData.name" required @input="validarNombre" />
          </div>

          <div class="campo">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" v-model="formData.password" required minlength="8" @input="validarPassword" />
            <p v-if="passwordError" class="error">{{ passwordError }}</p>
          </div>

          <div class="campo">
            <label for="password_confirmation">Confirmar contraseña</label>
            <input type="password" id="password_confirmation" name="password_confirmation" v-model="formData.password_confirmation" required minlength="8" @input="validarPassword" />
            <p v-if="passwordError" class="error">{{ passwordError }}</p>
          </div>

          <div class="campo">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="formData.email" required />
          </div>

          <div class="campo">
            <label for="role">Rol</label>
            <select id="role" name="role" v-model="formData.role" required>
              <option value="">Selecciona el rol del censista</option>
              <option value="Relevador">Relevador</option>
              <option value="Técnico">Técnico</option>
            </select>
          </div>

          <button type="submit" class="btn-submit">Guardar cambios</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Botón volver */
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

/* Título */
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

.formulario-content {
  padding: 2rem;
}

.campo {
  margin-bottom: 20px;
}

.campo label {
  font-weight: bold;
  color: #374151;
  margin-bottom: 8px;
  display: block;
}

.campo input,
.campo select {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.campo input:focus,
.campo select:focus {
  border-color: #3b82f6;
  box-shadow: 0px 0px 0px 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

/* Botón enviar */
.btn-submit {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #10b981;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
}

.btn-submit:hover {
  background-color: #059669;
  transform: translateY(-1px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}
</style>
