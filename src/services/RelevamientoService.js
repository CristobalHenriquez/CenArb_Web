import api from '../lib/axios';

export default {
    obtenerRelevamientos() {
        return api.get('/relevamientos'); 
    },
    agregarRelevamiento(data) {
        return api.post('/relevamientos', data);
    },
    obtenerRelevamiento(id) {
        return api.get(`/relevamientos/${id}`);
    },
    actualizarRelevamiento(id, data) {
        return api.patch(`/relevamientos/${id}`, data);
    },
    eliminarRelevamiento(id) {
        return api.delete(`/relevamientos/${id}`);
    }
};
