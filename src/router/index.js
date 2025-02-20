import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '../views/ClientesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import('../views/ClientesView.vue'),
      props: { titulo: 'Listado de Censistas' },
      meta: { requiresAuth: true } // Ruta privada, necesita autenticación
    },
    {
      path: '/agregar-cliente',
      name: 'agregar-cliente',
      component: () => import('../views/NuevoClienteView.vue'),
      props: { titulo: 'Agregar Censista' },
      meta: { requiresAuth: true } // Ruta privada
    },
    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: () => import('../views/EditarClienteView.vue'),
      props: { titulo: 'Editar Censista' },
      meta: { requiresAuth: true } // Ruta privada
    },
    {
      path: '/relevamientos',
      name: 'relevamientos',
      component: () => import('../views/Relevamientos.vue'),
      props: { titulo: 'Relevamientos' },
      meta: { requiresAuth: true } // Ruta privada
    },
    {
      path: '/arbol/:id',
      name: 'arboldetalle',
      component: () => import('../views/ArbolDetalle.vue'),
      props: true,
      meta: { requiresAuth: true } // Ruta privada
    },
    {
      path: '/municipio',
      name: 'municipio',
      component: () => import('../views/MunicipioView.vue'),
      props: { titulo: 'Municipio' },
      meta: { requiresAuth: true } // Ruta privada
    },
    {
      path: '/intervenciones',
      name: 'intervenciones',
      component: () => import('../views/Intervenciones.vue'),
      props: { titulo: 'Intervenciones' },
      meta: { requiresAuth: true } // Ruta privada
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      props: { titulo: 'Login' }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  // Si la ruta requiere autenticación y no hay token, redirige a login
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else {
    next(); // Permite continuar a la ruta
  }
});

export default router;
