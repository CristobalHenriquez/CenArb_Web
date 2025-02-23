import api from '../lib/axios';

export default {
    obtenerEspecies() {
        return api.get('/especie')
    }
}