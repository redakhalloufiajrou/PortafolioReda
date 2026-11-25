import { CitasAPI } from '../api/citaAPI.js';
import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('navbar').innerHTML = crearBarraNavegacion();
    document.getElementById('footer').innerHTML = crearFooter();
    const root = document.getElementById('root');

    try {
        const citas = await CitasAPI.obtenerTodos();

        let tarjetasCitas = '';
        for (const cita of citas) {
            tarjetasCitas += `
                <div class="cita-card">
                    <div class="cita-card-content">
                        <div class="cita-card-body">
                            <h5 class="cita-cliente">
                                👤 ${cita.cliente.nombre}
                            </h5>
                            <p class="cita-info">
                                <strong>💈 Peluquero:</strong> ${cita.peluquero.nombre}
                            </p>
                            <p class="cita-info">
                                <strong>📅 Fecha y Hora:</strong>
                                ${new Date(cita.fechaHora).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
                            </p>
                            <p class="cita-nota">
                                <strong>📝 Nota:</strong> ${cita.notas || 'Sin notas'}
                            </p>
                            
                            <div class="cita-acciones" style="margin-top: 15px;">
                                <button 
                                    type="button" 
                                    class="eliminarCita-btn" 
                                    data-id="${cita.id}">
                                    Cancelar Cita
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        root.innerHTML = `
            <div class="citas-seccion">
                <h2 class="citas-titulo">
                    Listado de Citas
                </h2>
                <div id="mensajeFeedback" class="mensaje-oculto"></div>
                
                <div class="citas-grid">
                    ${tarjetasCitas}
                </div>
            </div>
        `;

        const mensajeFeedback = document.getElementById('mensajeFeedback');

        document.querySelectorAll('.eliminarCita-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');

                if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
                    try {
                        await CitasAPI.eliminar(id);

                        if (mensajeFeedback) {
                            mensajeFeedback.textContent = "Cita cancelada correctamente.";
                            mensajeFeedback.className = "mensaje-visible exito";
                        } else {
                            alert("Cita cancelada correctamente.");
                        }

                        setTimeout(() => {
                            location.reload();
                        }, 1000);

                    } catch (error) {
                        console.error(error);
                        alert("Hubo un error al intentar cancelar la cita.");
                    }
                }
            });
        });

    } catch (error) {
        console.error(error);
        root.innerHTML = `
            <div class="citas-error">
                Error al cargar las citas. Por favor, inténtalo más tarde.
            </div>
        `;
    }
});