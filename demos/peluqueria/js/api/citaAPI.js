import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const CitasAPI = {
    obtenerTodos: () => fetchApi('GET', '/v1/Citas'),

    detallePorId: (id) => fetchApi('GET', `/v1/Citas/${id}`),

    crear: (cita) => fetchApi('POST', '/v1/Citas', cita),

    actualizar: (id, cita) => fetchApi('PUT', `/v1/Citas/${id}`, cita),

    eliminar: (id) => fetchApi('DELETE', `/v1/Citas/${id}`)
};