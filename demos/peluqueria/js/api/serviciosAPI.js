import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const ServiciosAPI = {
    obtenerTodos: () => fetchApi('GET', '/v1/Servicios'),

    detallePorId: (id) => fetchApi('GET', `/v1/Servicios/${id}`),

    crear: (servicio) => fetchApi('POST', '/v1/Servicios', servicio),

    actualizar: (id, servicio) => fetchApi('PUT', `/v1/Servicios/${id}`, servicio),

    eliminar: (id) => fetchApi('DELETE', `/v1/Servicios/${id}`)
};