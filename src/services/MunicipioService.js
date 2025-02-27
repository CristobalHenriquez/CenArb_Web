import api from '../lib/axios';

export default {
    obtenerMunicipios() {
        return api.get('/municipio')
    },
    obtenerMunicipioPorId(id) {
        return api.get(`/municipio/${id}`);
    },
}