export function crearBarraNavegacion() {
    return `
        <nav class="barra-navegacion">
            <div class="nav-contenedor">
                <a class="nav-logo" href="index.html">Reda Barber Club Cut & Shave</a>
                <button type="button" class="nav-menu-boton">
                    <span class="nav-menu-icono"></span>
                </button>
                <div id="navbarNav" class="nav-menu-contenedor">
                    <ul class="nav-lista">
                        <li class="nav-elemento">
                            <a class="nav-enlace" href="index.html">Inicio</a>
                        </li>
                        <li class="nav-elemento">
                            <a class="nav-enlace" href="pedirCitas.html">Pedir Cita</a>
                        </li>
                        <li class="nav-elemento">
                            <a class="nav-enlace" href="citasLista.html">Citas</a>
                        </li>
                        <li class="nav-elemento">
                            <a class="nav-enlace" href="gestionPeluqueros.html">Peluqueros</a>
                        </li>
                        <li class="nav-elemento">
                            <a class="nav-enlace" href="gestionClientes.html">Clientes</a>
                        </li>
                        <li class="nav-elemento">
                            <a class="nav-enlace" href="gestionServicios.html">Servicios</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}