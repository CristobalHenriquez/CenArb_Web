import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import('../views/ClientesView.vue'),
      props: {titulo: 'Listado de Censistas'}
    },
    {
      path: '/agregar-cliente',
      name: 'agregar-cliente',
      component: () => import('../views/NuevoClienteView.vue'),
      props: {titulo: 'Agregar Censista'}
    },
    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: () => import('../views/EditarClienteView.vue'),
      props: {titulo: 'Editar Censista'}
    },
    {
      path: '/relevamientos',
      name: 'relevamientos',
      component: () => import('../views/Relevamientos.vue'),
      props: {titulo: 'Relevamientos'}
    },
    {
      path: '/municipio',
      name: 'municipio',
      component: () => import('../views/MunicipioView.vue'),
      props: {titulo: 'Municipio'}
    },
    {
      path: '/intervenciones',
      name: 'intervenciones',
      component: () => import('../views/Intervenciones.vue'),
      props: {titulo: 'Intervenciones'}
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      props: {titulo: 'Login'}
    },
    
    
  ],
})

export default router
