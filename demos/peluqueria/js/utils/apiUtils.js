import { API_CONFIG, usarModoDemo } from '../config/apiConfig.js';
import { mockFetchApi } from './mockApi.js';

export async function fetchApi(method = 'GET', path, body = null) {
    // Modo demo del portafolio: responde una API simulada que imita la de Spring Boot
    if (usarModoDemo()) {
        return mockFetchApi(method, path, body);
    }

    let url = `${API_CONFIG.baseURL}${path}`;
    let response;

    const options = { method: method };

    if (method === 'POST' || method === 'PUT') {
        options.headers = {
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(body);
    }

    response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
    }

    if (method === 'DELETE' || response.status === 204) {
        return null;
    }

    return await response.json();
}
