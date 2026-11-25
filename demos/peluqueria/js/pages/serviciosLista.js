import { ServiciosAPI } from '../api/serviciosAPI.js';
import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('navbar').innerHTML = crearBarraNavegacion();
    document.getElementById('footer').innerHTML = crearFooter();

    const root = document.getElementById('root');

    const servicios = await ServiciosAPI.obtenerTodos();

    let listaServicios = '';

    for (const servicio of servicios) {
        listaServicios += `
        <a href="pedirCitas.html?servicioId=${servicio.id}" class="enlace-servicio">
            <div>
                <h5>${servicio.nombre}</h5>
                <small>⏱️ ${servicio.duracionMinutos} Minutos</small>
            </div>
            <span class="precio-servicio">
                ${servicio.precio} €
            </span>
        </a>
    `;
    }

    root.innerHTML = `
    <div class="contenedor-servicios">
        <h2 class="titulo">Nuestros Servicios</h2>
        <p class="introduccion-servicios">
            Selecciona uno o varios servicios para tu próxima visita. Todos nuestros trabajos incluyen asesoramiento de imagen personalizado y productos de primera calidad.
        </p>
        <div class="grupo-servicios">
            ${listaServicios}
        </div>
        <div class="informacion-adicional">
            <p><strong>💡 Nota:</strong> El lavado está incluido en todos nuestros servicios de corte.</p>
            <p><strong>🕒 Política de cancelación:</strong> Si no puedes asistir, por favor cancela tu cita con un mínimo de 2 horas de antelación desde el apartado "Citas".</p>
        </div>
    </div>
`;
});