import api from '../lib/axios';

export default {
    obtenerArboles() {
        return api.get('/arboles'); 
    },
    agregarArbol(data) {
        return api.post('/arboles', data);
    },
    obtenerArbol(id) {
        return api.get(`/arboles/${id}`);
    },
    actualizarArbol(id, data) {
        return api.patch(`/arboles/${id}`, data);
    },
    eliminarArbol(id) {
        return api.delete(`/arboles/${id}`);
    }
};
