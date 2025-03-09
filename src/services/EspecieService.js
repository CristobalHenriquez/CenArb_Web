import api from '../lib/axios';

export default {
    obtenerEspecies() {
        return api.get('/especie')
    },
    mostrarEspecies(){
        return api.get('/totalEspecies')
    }
}