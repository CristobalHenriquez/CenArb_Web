<script setup>

import { ref } from 'vue';

const form = ref({
  email: '',
  password: ''
});

//Mensajes de validación
const validationMessages = {
  required: 'Este campo es obligatorio',
  email: 'Por favor, ingresa un correo válido',
  pass: 'La contraseña es incorrecta'
};

//Inicio de sesión
const handleLogin = () => {
  const { email, password } = form.value;

  if (email && password) {
    //Autenticar usuario
    console.log('Iniciando sesión con:', email, password);
  } else {
    console.log('Por favor completa todos los campos');
  }
};

const recoverPassword = () => {
  alert('Redirigiendo a recuperación de contraseña...');
};
</script>


<template>
    <div class="w-auto bg-white py-20">
      <div class="flex flex-col items-center text-center w-full">
            <div class="absolute w-64 top-44">
                <img src="/src/components/icons/CenArb-login.svg" alt="Logo de la aplicación">
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
                </form>
            </div>
        </div>
        <button type="submit" class="w-1/5 h-16 rounded-full bg-[#72AB26] text-white">INICIAR SESIÓN ></button>
            <div class="forgot-password mt-4 ">
                <button @click="recoverPassword"> ¿Olvidaste tu contraseña? </button>
            </div>
      </div>
    </div>
</template>
