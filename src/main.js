import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import config from '../Formkit.config';
import App from './App.vue';
import router from './router';

// Importar vue-toastification
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';  // Estilos de toast

import './assets/main.css';

const app = createApp(App);

// Usar vue-toastification
app.use(router);
app.use(plugin, defaultConfig(config));  // Usar FormKit
app.use(Toast);  // Usar el plugin de Toast

app.mount('#app');
