<script setup>
import { ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const ojo = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
const ojoCerrado = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class="w-5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === ojo ? ojoCerrado : ojo
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

const router = useRouter();
const isLoggedIn = ref(!!localStorage.getItem("token"));
const form = ref({
  email: '',
  password: ''
});

const emailError = ref('');
const passwordError = ref('');
const errorMessage = ref('');

const validateForm = () => {
  emailError.value = '';
  passwordError.value = '';
  errorMessage.value = '';

  let isValid = true;

  if (!form.value.email) {
    emailError.value = 'Este campo es obligatorio.';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    emailError.value = 'Por favor, ingresa un correo válido.';
    isValid = false;
  }

  if (!form.value.password) {
    passwordError.value = 'Este campo es obligatorio.';
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateForm()) {
    setTimeout(() => {
      emailError.value = '';
      passwordError.value = '';
      errorMessage.value = '';
    }, 3000);
    return;
  }

  try {
    const response = await axios.post('http://desarrollo.cenarb.net/api/login', {
      email: form.value.email,
      password: form.value.password
    });

    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
      isLoggedIn.value = true; 
      router.push('/municipio'); 
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    errorMessage.value = 'Usuario o contraseña incorrectos.';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
};

const recoverPassword = () => {
  alert('Redirigiendo a recuperación de contraseña...');
};

// Verificar sesión en cada recarga
watchEffect(() => {
  isLoggedIn.value = !!localStorage.getItem("token");
});
</script>

<template>
  <div class="w-auto bg-white py-20">
    <div class="flex flex-col items-center text-center w-full">
      <div class="absolute w-64 top-44">
        <img src="/src/components/icons/CenArb-login.svg" alt="Logo de la aplicación" />
      </div>
      <div class="md:w-3/5 xl:w-2/5 rounded-[50px] pt-36 pb-16 mb-10 mt-20 bg-[#4B6562]">
        <div class="pb-5">
          <h3 class="text-white text-xl font-semibold">¡Te damos la bienvenida!</h3>
          <p class="text-white text-sm font-light">Ingresá tus datos para acceder a la aplicación</p>
        </div>
        <div>
          <form @submit.prevent="handleLogin">
            <div>
              <FormKit
                type="email"
                name="email"
                placeholder="Usuario"
                v-model="form.email"
                @keydown.enter="handleLogin"
              />
              <div v-if="emailError" class="flex justify-center">
              <p class="w-72 text-white bg-red-600 rounded-full">{{ emailError }}</p>
            </div>
            </div>

            <div>
              <FormKit
                type="password"
                placeholder="Contraseña"
                :suffix-icon="ojoCerrado"
                v-model="form.password"
                @suffix-icon-click="handleIconClick"
                suffix-icon-class="transform cursor-pointer"
                @keydown.enter="handleLogin"
              />
              <div v-if="passwordError" class="flex justify-center">
              <p class="w-72 text-white bg-red-600 rounded-full">{{ passwordError }}</p>
            </div>
            </div>

            <div v-if="errorMessage" class="flex justify-center -mb-6">
              <p class="w-72 text-white bg-red-600 rounded-full">{{ errorMessage }}</p>
            </div>
          </form>
        </div>
      </div>
      <button @click="handleLogin" class="w-2/4 md:w-2/5 xl:w-1/5 h-16 rounded-full bg-[#72AB26] text-white select-none">
        INICIAR SESIÓN >
      </button>
      <div class="forgot-password mt-4 -mb-[0.05rem] select-none">
        <button @click="recoverPassword"> ¿Olvidaste tu contraseña? </button>
      </div>
    </div>
  </div>
</template>
