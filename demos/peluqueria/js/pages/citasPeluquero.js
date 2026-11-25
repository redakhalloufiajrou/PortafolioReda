import { CitasAPI } from '../api/citaAPI.js';
import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('navbar').innerHTML = crearBarraNavegacion();
    document.getElementById('footer').innerHTML = crearFooter();

    const root = document.getElementById('root');

    const params = new URLSearchParams(window.location.search);
    const peluqueroId = params.get('id');
    const peluqueroNombre = params.get('nombre');

    if (!peluqueroId) {
        root.innerHTML = '<p class="mensaje-error">Error: No se especificó ningún peluquero.</p>';
        return;
    }

    root.innerHTML = `
        <div class="contenedor-principal">
            <button onclick="window.history.back()" class="btn-volver">Volver atrás</button>
            <h2 id="tituloPeluquero">Agenda de ${peluqueroNombre || 'Peluquero'}</h2>
            <div id="listaCitas"><p>Cargando citas...</p></div>
        </div>
    `;

    const listaCitas = document.getElementById('listaCitas');

    try {
        const todasLasCitas = await CitasAPI.obtenerTodos();
        const citasFiltradas = todasLasCitas.filter(cita => cita.peluquero?.id == peluqueroId);

        if (!citasFiltradas || citasFiltradas.length === 0) {
            listaCitas.innerHTML = '<p class="lista-vacia">Este peluquero no tiene citas programadas.</p>';
            return;
        }

        let html = '<ul class="lista-agenda">';
        citasFiltradas.forEach(cita => {
            html += `
                <li class="elemento-cita">
                    <div class="datos-cliente">
                        <strong class="cliente-nombre">Cliente: ${cita.cliente?.nombre || 'Cliente'}</strong>
                        <span class="fecha-hora">Fecha y Hora: ${cita.fechaHora
                    ? new Date(cita.fechaHora).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    : 'N/A'
                }</span>
                    </div>
                    <div class="datos-tiempo">
                        <span class="cita-estado">Estado: ${cita.estado || 'Pendiente'}</span>
                        <span class="cita-nota2">Nota: ${cita.notas || 'Sin notas'}</span>
                    </div>
                </li>
            `;
        });
        html += '</ul>';

        listaCitas.innerHTML = html;

    } catch (error) {
        console.error("Error al cargar las citas:", error);
        listaCitas.innerHTML = '<p class="mensaje-error">Hubo un error al comunicar con el servidor.</p>';
    }
});