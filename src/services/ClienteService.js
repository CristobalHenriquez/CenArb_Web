import api from '../lib/axios';

// Función para obtener el token dinámicamente en base al rol del usuario
const getAuthToken = (userRole) => {
  // Obtener el token según el rol
  if (userRole === 'relevador') {
    return localStorage.getItem('token_relevador'); // Token del Relevador
  } else if (userRole === 'tecnico') {
    return localStorage.getItem('token_tecnico'); // Token del Técnico
  } else {
    return localStorage.getItem('token_admin'); // Token del Admin (si es necesario)
  }
};

export default {
  // Obtener todos los usuarios
  obtenerClientes(userRole) {
    return api.get(`/getRelevadorTecnico/`, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`, // Enviar el token adecuado
      }
    });
  },

  // Agregar un nuevo cliente
  agregarCliente(data, userRole) {
    return api.post('/clientes', data, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`, // Enviar el token adecuado
      }
    });
  },

  // Obtener un cliente específico según su ID y rol
  obtenerCliente(id, userRole) {
    return api.get(`/getRelevadorTecnico/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`, // Enviar el token adecuado
      }
    });
  },

  // Actualizar un cliente específico
  actualizarCliente(id, data, userRole) {
    return api.patch(`/clientes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`, // Enviar el token adecuado
      }
    });
  },

  // Cambiar el estado de un cliente
  cambiarEstado(id, data, userRole) {
    return api.patch(`/clientes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`, // Enviar el token adecuado
      }
    });
  },

  // Eliminar un cliente
  eliminarCliente(id, userRole) {
    return api.delete(`/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`, // Enviar el token adecuado
      }
    });
  },

  // Obtener relevamientos
  obtenerRelevamientos(userRole) {
    return api.get('/relevamientos', {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`, // Enviar el token adecuado
      }
    });
  }
};
