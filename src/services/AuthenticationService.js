import api from '../lib/axios';

export default {
    obtenerMunicipio(){
        return api.get('/user')
    }
}