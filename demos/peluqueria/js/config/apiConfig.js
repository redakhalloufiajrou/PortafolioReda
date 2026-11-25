export const API_CONFIG = {
    baseURL: 'http://localhost:8080/api',

    // MODO DEMO (añadido para el portafolio):
    // - 'auto'  → usa la API real si la web se sirve desde Spring Boot (localhost:8080);
    //             en cualquier otro sitio (GitHub Pages, Live Server...) usa la API simulada.
    // - true    → siempre API simulada (datos en localStorage del navegador).
    // - false   → siempre la API real de Spring Boot.
    demo: 'auto'
};

export function usarModoDemo() {
    if (API_CONFIG.demo === true) return true;
    if (API_CONFIG.demo === false) return false;
    return location.port !== '8080';
}
