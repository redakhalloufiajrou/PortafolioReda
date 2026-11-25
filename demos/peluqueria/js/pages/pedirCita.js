import { CitasAPI } from '../api/citaAPI.js';
import { ServiciosAPI } from '../api/serviciosAPI.js';
import { ClientesAPI } from '../api/clientesAPI.js';
import { PeluquerosAPI } from '../api/peluquerosAPI.js';
import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('navbar').innerHTML = crearBarraNavegacion();
    document.getElementById('footer').innerHTML = crearFooter();

    const root = document.getElementById('root');

    const servicios = await ServiciosAPI.obtenerTodos();
    const clientes = await ClientesAPI.obtenerTodos();
    const peluqueros = await PeluquerosAPI.obtenerTodos();

    const params = new URLSearchParams(window.location.search);
    const servicioIdSeleccionado = params.get('servicioId');

    let opcionesServicios = servicios.map(servicio =>
        `<option value="${servicio.id}" ${servicio.id == servicioIdSeleccionado ? 'selected' : ''}> ${servicio.nombre} (${servicio.precio}€) (${servicio.duracionMinutos} Min) </option>`
    ).join('');
    let opcionesClientes = clientes.map(cliente =>
        `<option value="${cliente.id}">${cliente.nombre}</option>`
    ).join('');
    let opcionesPeluqueros = peluqueros.map(peluquero => {
        const noDisponible = peluquero.disponible == 'No';
        return `<option value="${peluquero.id}" ${noDisponible ? 'disabled' : ''}> ${peluquero.nombre} ${noDisponible ? ' (No disponible)' : ''}</option>`;
    }).join('');

    root.innerHTML = `
        <div>
            <h1>Reservar Cita</h1>
            <div>
                <form id="formReserva">
                    <div>
                        <label>Selecciona el Servicio</label>
                        <select id="servicioId" required>
                            <option value="">Seleccione un servicio...</option>
                            ${opcionesServicios}
                        </select>
                    </div>

                    <div>
                        <label>Selecciona el Peluquero</label>
                        <select id="peluqueroId" required>
                            <option value="">Seleccione un peluquero...</option>
                            ${opcionesPeluqueros}
                        </select>
                    </div>

                    <div>
                        <label>Selecciona el Cliente</label>
                        <select id="clienteId" required>
                            <option value="">Seleccione un cliente...</option>
                            ${opcionesClientes}
                        </select>
                    </div>

                    <div>
                        <label>Nota</label>
                        <textarea id="notaReserva" rows="2" placeholder="¿Alguna petición especial?"></textarea>
                    </div>

                    <div>
                        <label>Selecciona el Día</label>
                        <input type="date" id="fechaReserva" required>
                    </div>

                    <div>
                        <label>Horas Disponibles</label>
                        <div id="contenedorHoras">
                            <p>Selecciona un peluquero y una fecha para ver las horas.</p>
                        </div>
                        <input type="hidden" id="horaSeleccionada" required>
                    </div>

                    <button type="submit">Confirmar Reserva</button>
                </form>
            </div>
            <div id="mensaje"></div>
        </div>
    `;

    // BLOQUEAR FECHAS PASADAS 
    const inputFecha = document.getElementById('fechaReserva');
    const fechaHoy = new Date();

    const year = fechaHoy.getFullYear();
    const month = String(fechaHoy.getMonth() + 1).padStart(2, '0');
    const day = String(fechaHoy.getDate()).padStart(2, '0');

    inputFecha.min = `${year}-${month}-${day}`;

    const horarioLaboral = ['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

    async function actualizarHorasDisponibles() {
        const peluqueroId = document.getElementById('peluqueroId').value;
        const fecha = document.getElementById('fechaReserva').value;
        const contenedor = document.getElementById('contenedorHoras');

        if (!peluqueroId || !fecha) return;

        contenedor.innerHTML = '<span>Cargando disponibilidad...</span>';

        try {
            const todasLasCitas = await CitasAPI.obtenerTodos();

            const citasDelDia = todasLasCitas.filter(cita => {
                const coincidePeluquero = cita.peluquero.id === parseInt(peluqueroId);
                const coincideFecha = cita.fechaHora.includes(fecha);
                const noCancelada = cita.estado !== 'CANCELADA';
                return coincidePeluquero && coincideFecha && noCancelada;
            });

            let htmlBotones = '';
            horarioLaboral.forEach(hora => {
                const estaOcupada = citasDelDia.some(cita => cita.fechaHora.includes(hora));

                if (estaOcupada) {
                    htmlBotones += `<button type="button" class="btn-hora-ocupada" disabled>${hora}</button>`;
                } else {
                    htmlBotones += `<button type="button" class="btn-hora" onclick="seleccionarHora(event, '${hora}')">${hora}</button>`;
                }
            });

            contenedor.innerHTML = htmlBotones || '<p>No hay horas disponibles.</p>';

        } catch (error) {
            console.error("Error al comprobar horas:", error);
            contenedor.innerHTML = '<span>Error al cargar las horas.</span>';
        }
    }

    window.seleccionarHora = function (evento, hora) {
        document.getElementById('horaSeleccionada').value = hora;

        document.querySelectorAll('.btn-hora').forEach(btn => {
            btn.classList.remove('seleccionada');
        });

        evento.target.classList.add('seleccionada');
    };

    document.getElementById('peluqueroId').addEventListener('change', actualizarHorasDisponibles);
    document.getElementById('fechaReserva').addEventListener('change', actualizarHorasDisponibles);

    const form = document.getElementById('formReserva');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fecha = document.getElementById('fechaReserva').value;
        const hora = document.getElementById('horaSeleccionada').value;

        if (!hora) {
            document.getElementById('mensaje').innerHTML = `
                <div>Por favor, haz clic en una hora disponible.</div>
            `;
            return;
        }

        const fechaHoraFormateada = `${fecha}T${hora}:00`;

        const nuevaCita = {
            cliente: {
                id: parseInt(document.getElementById('clienteId').value)
            },
            peluquero: {
                id: parseInt(document.getElementById('peluqueroId').value)
            },
            fechaHora: fechaHoraFormateada,
            notas: document.getElementById('notaReserva').value,
            estado: "PENDIENTE"
        };

        try {
            await CitasAPI.crear(nuevaCita);
            document.getElementById('mensaje').innerHTML = `
                <div>¡Cita reservada con éxito!</div>
            `;

            form.reset();

            document.getElementById('contenedorHoras').innerHTML = '<p>Selecciona un peluquero y una fecha para ver las horas.</p>';
            document.getElementById('horaSeleccionada').value = '';

        } catch (error) {
            console.error("Error al guardar:", error);
            document.getElementById('mensaje').innerHTML = `
                <div>Error al reservar la cita. Inténtalo de nuevo.</div>
            `;
        }
    });
});