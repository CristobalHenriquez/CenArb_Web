import api from '../lib/axios';

export default {
    loguearse(credentials){
        return api.post('/login', credentials)
    },
    obtenerMunicipio(){
        return api.get('/user')
    },
    salir(){
        return api.post('/logout')
    }
}