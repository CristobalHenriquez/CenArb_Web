import api from '../lib/axios';

export default {
  obtenerArbol() {
    return api.get('/arbol')
  },
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
  obtenerFotoArbol(id) {
    return api.get(`/foto_arboles/${id}`);
  },
  mostrarArboles(){
    return api.get('/totalArboles')
  },
  mostrarEspeciesPorMunicipio(){
    return api.get('/totalEspeciesPorMunicipio')
  }
};
