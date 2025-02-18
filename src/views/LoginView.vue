<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Para redirigir al dashboard después de login

const router = useRouter();

const form = ref({
  email: '',
  password: ''
});

// Mensajes de validación
const validationMessages = {
  required: 'Este campo es obligatorio',
  email: 'Por favor, ingresa un correo válido',
  pass: 'La contraseña es incorrecta'
};

// Manejo de error
const errorMessage = ref('');

// Inicio de sesión
const handleLogin = async () => {
  const { email, password } = form.value;

  if (email && password) {
    try {
      // Enviar solicitud de login a la API
      const response = await axios.post('http://desarrollo.cenarb.net/api/login', {
        email, 
        password
      });

      const token = response.data.token;
      if (token) {
        // Guardar el token en localStorage
        localStorage.setItem('token', token);
        console.log('✅ Token guardado en localStorage:', token);
        
        // Redirigir a la página principal o dashboard
        router.push('/dashboard'); // Ajusta la ruta según tu aplicación
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      errorMessage.value = 'Usuario o contraseña incorrectos.';
    }
  } else {
    errorMessage.value = 'Por favor completa todos los campos.';
  }
};

// Redirigir a recuperación de contraseña
const recoverPassword = () => {
  alert('Redirigiendo a recuperación de contraseña...');
};
</script>

<template>
  <div class="w-auto bg-white py-20">
    <div class="flex flex-col items-center text-center w-full">
      <div class="absolute w-64 top-44">
        <img src="/src/components/icons/CenArb-login.svg" alt="Logo de la aplicación" />
      </div>
      <div class="w-2/5 rounded-[50px] pt-36 pb-16 mb-10 mt-20 bg-[#4B6562]">
        <div class="pb-5">
          <h3 class="text-white text-xl font-semibold">¡Te damos la bienvenida!</h3>
          <p class="text-white text-sm font-light">Ingresá tus datos para acceder a la aplicación</p>
        </div>
        <div>
          <form @submit.prevent="handleLogin">
            <FormKit
              type="email"
              name="email"
              placeholder="Usuario"
              v-model="form.email"
              validation="required|email"
              :validation-messages="validationMessages"
            />
            <FormKit
              type="password"
              name="password"
              placeholder="Contraseña"
              v-model="form.password"
              validation="required|pass"
              :validation-messages="validationMessages"
            />
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
      <button @click="handleLogin" class="w-1/5 h-16 rounded-full bg-[#72AB26] text-white">INICIAR SESIÓN ></button>
      <div class="forgot-password mt-4">
        <button @click="recoverPassword"> ¿Olvidaste tu contraseña? </button>
      </div>
    </div>
  </div>
</template>
