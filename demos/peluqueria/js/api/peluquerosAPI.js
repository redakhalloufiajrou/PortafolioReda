import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const PeluquerosAPI = {
    obtenerTodos: () => fetchApi('GET', '/v1/Peluqueros'),

    detallePorId: (id) => fetchApi('GET', `/v1/Peluqueros/${id}`),

    crear: (peluquero) => fetchApi('POST', '/v1/Peluqueros', peluquero),

    actualizar: (id, peluquero) => fetchApi('PUT', `/v1/Peluqueros/${id}`, peluquero),

    eliminar: (id) => fetchApi('DELETE', `/v1/Peluqueros/${id}`)
};