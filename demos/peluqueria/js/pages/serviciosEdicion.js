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
            <div class="elemento-lista">
                <h5>
                    ${servicio.nombre}
                </h5>
                <div>
                    <small>⏱️ ${servicio.duracionMinutos} min</small>
                </div>
                <div>
                    <small>Precio: <strong>${servicio.precio}€</strong></small>
                </div>
                <div>
                    <button 
                        type="button"
                        class="editar-btn"
                        data-id="${servicio.id}"
                        data-nombre="${servicio.nombre}"
                        data-duracionMinutos="${servicio.duracionMinutos}"
                        data-precio="${servicio.precio}">
                        Editar
                    </button>
                    <button 
                        type="button"
                        class="eliminar-btn"
                        id="${servicio.id}">
                        Eliminar
                    </button>
                </div>
            </div>
    `;
    }

    root.innerHTML = `
        <div class="contenedor-principal">
            <h2>
                Servicios
            </h2>

            <div id="mensajeFeedback" class="mensaje-oculto"></div>

            <div class="contenedor-formulario">
                <h4 id="formularioTitulo">Añadir Servicio</h4>
                
                <input type="hidden" id="servicioId" value="">

                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre">

                <input 
                    type="text"
                    id="duracionMinutos"
                    placeholder="Introduzca la duracion del servicio">

                <input 
                    type="text"
                    id="precio"
                    placeholder="Introduzca el precio">

                <button id="crearBtn">
                    Crear
                </button>
            </div>

            <div class="grupo-lista">
                ${listaServicios}
            </div>
        </div>
    `;

    const crearBtn = document.getElementById('crearBtn');
    const servicioIdInput = document.getElementById('servicioId');
    const nombreInput = document.getElementById('nombre');
    const duracionMinutosInput = document.getElementById('duracionMinutos');
    const precioInput = document.getElementById('precio');
    const formularioTitulo = document.getElementById('formularioTitulo');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    function mostrarMensaje(texto, tipo = 'error') {
        mensajeFeedback.textContent = texto;
        mensajeFeedback.className = `mensaje-visible ${tipo}`;
    }

    crearBtn.addEventListener('click', async () => {
        const id = servicioIdInput.value;
        const nombre = nombreInput.value;
        const duracionMinutos = duracionMinutosInput.value;
        const precio = precioInput.value;


        if (!nombre || !duracionMinutos || !precio) {
            mostrarMensaje("Por favor, rellena todos los campos.", "error");
            return;
        }

        try {
            if (id) {
                await ServiciosAPI.actualizar(id, { nombre, duracionMinutos, precio });
                mostrarMensaje("Cliente actualizado correctamente.", "exito");
            } else {
                await ServiciosAPI.crear({ nombre, duracionMinutos, precio });
                mostrarMensaje("Cliente creado correctamente.", "exito");
            }

            setTimeout(() => {
                location.reload();
            }, 1000);

        } catch (error) {
            mostrarMensaje("Hubo un error al procesar la solicitud.", "error");
            console.error(error);
        }
    });

    document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const nombre = btn.getAttribute('data-nombre');
            const duracionMinutos = btn.getAttribute('data-duracionMinutos');
            const precio = btn.getAttribute('data-precio');

            servicioIdInput.value = id;
            nombreInput.value = nombre;
            duracionMinutosInput.value = duracionMinutos;
            precioInput.value = precio;

            formularioTitulo.textContent = `Editar Servicio: ${nombre}`;
            crearBtn.textContent = "Guardar Cambios";
            crearBtn.className = "btn-guardar-cambios";
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.id;
            await ServiciosAPI.eliminar(id);

            mostrarMensaje("Servicio eliminado correctamente.", "exito");

            setTimeout(() => {
                location.reload();
            }, 1000);

        });
    });
});