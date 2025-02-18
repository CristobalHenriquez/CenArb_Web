import api from '../lib/axios';

export default {
    obtenerArboles() {
        return api.get('/arbol');
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
    }
};
