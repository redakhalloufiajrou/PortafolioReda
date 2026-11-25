import { PeluquerosAPI } from '../api/peluquerosAPI.js';
import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('navbar').innerHTML = crearBarraNavegacion();
    document.getElementById('footer').innerHTML = crearFooter();

    const root = document.getElementById('root');

    const peluqueros = await PeluquerosAPI.obtenerTodos();

    let listaPeluqueros = '';
    for (const peluquero of peluqueros) {
        listaPeluqueros += `
            <div class="elemento-lista">
                <div>
                    <h5>
                        ${peluquero.nombre}
                    </h5>
                    <div>
                        <small>✂️ ${peluquero.especialidad}</small>
                    </div>
                    <div>
                        <small>📅 Disponible: <strong>${peluquero.disponible || 'No'}</strong></small>
                    </div>
                </div>
                <div>
                    <button 
                        type="button"
                        class="editar-btn"
                        data-id="${peluquero.id}"
                        data-nombre="${peluquero.nombre}"
                        data-especialidad="${peluquero.especialidad}"
                        data-disponible="${peluquero.disponible || 'No'}"> 
                        Editar
                    </button>
                    <button 
                        type="button"
                        class="citas-btn"
                        onclick="window.location.href='citasPeluquero.html?id=${peluquero.id}&nombre=${encodeURIComponent(peluquero.nombre)}'">
                        Ver Citas
                    </button>
                    <button 
                        type="button"
                        class="eliminar-btn"
                        id="${peluquero.id}">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    root.innerHTML = `
        <div class="contenedor-principal">
            <h2>
                Peluqueros
            </h2>

            <div id="mensajeFeedback" class="mensaje-oculto"></div>

            <div class="contenedor-formulario">
                <h4 id="formularioTitulo">Añadir peluquero</h4>
                
                <input type="hidden" id="peluqueroId" value="">

                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre">

                <input 
                    type="text"
                    id="especialidad"
                    placeholder="Especialidad">

                <input 
                    type="text"
                    id="disponible"
                    placeholder="Disponible (Si/No)">

                <button id="crearBtn">
                    Crear
                </button>
            </div>

            <div class="grupo-lista">
                ${listaPeluqueros}
            </div>
        </div>
    `;

    const crearBtn = document.getElementById('crearBtn');
    const peluqueroIdInput = document.getElementById('peluqueroId');
    const nombreInput = document.getElementById('nombre');
    const especialidadInput = document.getElementById('especialidad');
    const disponibleInput = document.getElementById('disponible');
    const formularioTitulo = document.getElementById('formularioTitulo');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    function mostrarMensaje(texto, tipo = 'error') {
        mensajeFeedback.textContent = texto;
        mensajeFeedback.className = `mensaje-visible ${tipo}`;
    }

    crearBtn.addEventListener('click', async () => {
        const id = peluqueroIdInput.value;
        const nombre = nombreInput.value;
        const specialty = especialidadInput.value;
        const disponible = disponibleInput.value;

        if (!nombre || !specialty || !disponible) {
            mostrarMensaje("Por favor, rellena todos los campos.", "error");
            return;
        }

        try {
            if (id) {
                await PeluquerosAPI.actualizar(id, { nombre, especialidad: specialty, disponible });
                mostrarMensaje("Peluquero actualizado correctamente.", "exito");
            } else {
                await PeluquerosAPI.crear({ nombre, especialidad: specialty, disponible });
                mostrarMensaje("Peluquero creado correctamente.", "exito");
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
            const specialty = btn.getAttribute('data-especialidad');
            const disponible = btn.getAttribute('data-disponible');

            peluqueroIdInput.value = id;
            nombreInput.value = nombre;
            especialidadInput.value = specialty;
            disponibleInput.value = disponible;

            formularioTitulo.textContent = `Editar peluquero: ${nombre}`;
            crearBtn.textContent = "Guardar Cambios";
            crearBtn.className = "btn-guardar-cambios";
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.id;

            try {
                await PeluquerosAPI.eliminar(id);

                mostrarMensaje("Peluquero eliminado correctamente.", "exito");

                setTimeout(() => {
                    location.reload();
                }, 1000);

            } catch (error) {
                mostrarMensaje("No se puede eliminar este peluquero porque tiene citas asignadas.", "error");
                console.error("Error al eliminar:", error);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    });
});