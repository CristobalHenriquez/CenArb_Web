import api from '../lib/axios';

const getAuthToken = (userRole) => {
  if (userRole === 'relevador') {
    return localStorage.getItem('token_relevador');
  } else if (userRole === 'tecnico') {
    return localStorage.getItem('token_tecnico');
  } else {
    return localStorage.getItem('token_admin');
  }
};

export default {
  obtenerClientes(userRole) {
    return api.get(`/getRelevadorTecnico`, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`,
      }
    });
  },

  agregarCliente(data, userRole) {
    return api.post('/registerUser', data, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`,
      }
    });
  },

  obtenerCliente(id, userRole) {
    return api.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`,
      }
    });
  },

  actualizarCliente(id, data, userRole) {
    console.log(data)
    return api.put(`/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`,
      }
    });
  },  

  cambiarEstado(id, data, userRole) {
    return api.put(`/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`,
      }
    });
  },

  eliminarCliente(id, userRole) {
    return api.delete(`/userEliminar/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`,
      }
    });
  },

  obtenerRelevamientos(userRole) {
    return api.get('/relevamientos', {
      headers: {
        Authorization: `Bearer ${getAuthToken(userRole)}`,
      }
    });
  }
};
