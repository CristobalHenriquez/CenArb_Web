import api from '../lib/axios';

export default {
    obtenerMunicipios() {
        return api.get('/MostrarMunicipios')
    }
}