import { ClientesAPI } from '../api/clientesAPI.js';
import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('navbar').innerHTML = crearBarraNavegacion();
    document.getElementById('footer').innerHTML = crearFooter();

    const root = document.getElementById('root');

    const clientes = await ClientesAPI.obtenerTodos();

    let listaClientes = '';
    for (const cliente of clientes) {
        listaClientes += `
            <div class="elemento-lista">
                <div>
                    <h5>
                        ${cliente.nombre}
                    </h5>
                    <div>
                        <small><strong>Email: </strong>${cliente.email}</small>
                    </div>
                    <div>
                        <small><strong>Telefono: (+34) </strong>${cliente.telefono}</small>
                    </div>
                </div>
                <div>
                    <button 
                        type="button"
                        class="editar-btn"
                        data-id="${cliente.id}"
                        data-nombre="${cliente.nombre}"
                        data-email="${cliente.email}"
                        data-telefono="${cliente.telefono}">
                        Editar
                    </button>
                    <button 
                        type="button"
                        class="eliminar-btn"
                        id="${cliente.id}">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    root.innerHTML = `
        <div class="contenedor-principal">
            <h2>
                Clientes
            </h2>

            <div id="mensajeFeedback" class="mensaje-oculto"></div>

            <div class="contenedor-formulario">
                <h4 id="formularioTitulo">Añadir cliente</h4>
                
                <input type="hidden" id="clienteId" value="">

                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre">

                <input 
                    type="text"
                    id="email"
                    placeholder="Introduzca su Email">

                <input 
                    type="text"
                    id="telefono"
                    placeholder="Introduzca su Telefono">

                <button id="crearBtn">
                    Crear
                </button>
            </div>

            <div class="grupo-lista">
                ${listaClientes}
            </div>
        </div>
    `;

    const crearBtn = document.getElementById('crearBtn');
    const clienteIdInput = document.getElementById('clienteId');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const formularioTitulo = document.getElementById('formularioTitulo');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    function mostrarMensaje(texto, tipo = 'error') {
        mensajeFeedback.textContent = texto;
        mensajeFeedback.className = `mensaje-visible ${tipo}`;
    }

    crearBtn.addEventListener('click', async () => {
        const id = clienteIdInput.value;
        const nombre = nombreInput.value;
        const email = emailInput.value;
        const telefono = telefonoInput.value;


        if (!nombre || !email || !telefono) {
            mostrarMensaje("Por favor, rellena todos los campos.", "error");
            return;
        }

        try {
            if (id) {
                await ClientesAPI.actualizar(id, { nombre, email, telefono });
                mostrarMensaje("Cliente actualizado correctamente.", "exito");
            } else {
                await ClientesAPI.crear({ nombre, email, telefono });
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
            const email = btn.getAttribute('data-email');
            const telefono = btn.getAttribute('data-telefono');

            clienteIdInput.value = id;
            nombreInput.value = nombre;
            emailInput.value = email;
            telefonoInput.value = telefono;

            formularioTitulo.textContent = `Editar cliente: ${nombre}`;
            crearBtn.textContent = "Guardar Cambios";
            crearBtn.className = "btn-guardar-cambios";
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.id;
            if (confirm('¿Estás seguro de que deseas eliminar al Cliente? Si se elimina el cliente, la cita que tenga se cancelara.')) {
                await ClientesAPI.eliminar(id);

                mostrarMensaje("Cliente eliminado correctamente.", "exito");

                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    });
});