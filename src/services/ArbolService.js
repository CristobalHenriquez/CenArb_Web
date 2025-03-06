import api from '../lib/axios';

export default {
  obtenerArboles(params) {
    return api.get('/arboles/filtrar', { params });  // Aquí se pasa `params` como parte de la solicitud
  },
  agregarArbol(data) {
    return api.post('/arbol', data);
  },
  obtenerArbolPorId(id) {
    return api.get(`/arbol/${id}`);
  },
  actualizarArbol(id, data) {
    return api.patch(`/arbol/${id}`, data);
  },
  eliminarArbol(id) {
    return api.delete(`/arbol/${id}`);
  },
  mostrarArboles(){
    return api.get('/totalArboles')
  },
  mostrarArbolesPorMunicipio(){
    return api.get('/totalArbolesMunicipio')
  },
  mostrarEspeciesPorMunicipio(){
    return api.get('/totalEspeciesPorMunicipio')
  }
};
