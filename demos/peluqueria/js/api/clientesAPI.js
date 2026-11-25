import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const ClientesAPI = {
    obtenerTodos: () => fetchApi('GET', '/v1/Clientes'),

    detallePorId: (id) => fetchApi('GET', `/v1/Clientes/${id}`),

    crear: (cliente) => fetchApi('POST', '/v1/Clientes', cliente),

    actualizar: (id, cliente) => fetchApi('PUT', `/v1/Clientes/${id}`, cliente),

    eliminar: (id) => fetchApi('DELETE', `/v1/Clientes/${id}`)
};