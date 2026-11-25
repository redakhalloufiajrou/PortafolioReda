
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Proyeccion {
    private static int numeroDeProyecciones;
    private String codigoProyeccion;
    private LocalDateTime horaInicio;
    private LocalDateTime horaFin;
    private Pelicula pelicula;
    private int filas = 10;
    private int columnas = 20;
    private ArrayList<ArrayList<Butaca>> butacas = new ArrayList<>();

    public Proyeccion(Pelicula pelicula, LocalDateTime horaInicio) {
        setCodigoProyeccion(codigoProyeccion);
        this.pelicula = pelicula;
        setHoraInicio(horaInicio);
        this.butacas = new ArrayList<>();
        asignarButacas();
    }

    public String getCodigoProyeccion() {
        return codigoProyeccion;
    }

    public void setCodigoProyeccion(String codigoProyeccion) {
        if (codigoProyeccion == null || codigoProyeccion.isBlank()) {
            this.codigoProyeccion = "proyec-" + numeroDeProyecciones;
            numeroDeProyecciones++;
        }
    }

    public LocalDateTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalDateTime horaInicio) {
        this.horaInicio = horaInicio;
        if (horaInicio != null) {
            this.horaFin = horaInicio.plusMinutes(pelicula.getDuracionMinutos());
        }
    }

    public LocalDateTime getHoraFin() {
        return horaFin;
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
    }

    public void asignarButacas() {
        char letra;
        String idButaca;

        for (int i = 0; i < filas; i++) {
            ArrayList<Butaca> fila = new ArrayList<>();
            for (int j = 0; j < columnas; j++) {
                letra = (char) ('A' + j);
                idButaca = letra + "" + (i + 1);
                Butaca butaca = new Butaca(idButaca);
                fila.add(butaca);
            }
            butacas.add(fila);
        }
    }

    public String mostrarButacas() {
        String mostrarPorPantalla = "    ";
        final String RESET = "\u001B[0m";
        final String ROJO = "\u001B[31m";

        for (int j = 0; j < butacas.get(0).size(); j++) {
            mostrarPorPantalla += (char) ('A' + j) + " ";

        }
        mostrarPorPantalla += "\n\n";

        for (int i = 0; i < butacas.size(); i++) {
            if (i + 1 < 10) {
                mostrarPorPantalla += (i + 1) + "   ";
            } else {
                mostrarPorPantalla += (i + 1) + "  ";
            }
            for (int j = 0; j < butacas.get(i).size(); j++) {
                if (butacas.get(i).get(j).getCliente() == null) {
                    mostrarPorPantalla += "O " + RESET;
                } else {
                    mostrarPorPantalla += ROJO + "X " + RESET;
                }
            }
            mostrarPorPantalla += "\n";
        }
        return mostrarPorPantalla;
    }

    public boolean comprobarClienteProyeccion(Cliente cliente) {
        boolean clienteExiste = false;
        Butaca butacaActual;
        for (int i = 0; i < filas; i++) {
            for (int j = 0; j < columnas; j++) {
                butacaActual = butacas.get(i).get(j);
                if (butacaActual.getCliente() == cliente) {
                    clienteExiste = true;
                }
            }
        }
        return clienteExiste;
    }

    public boolean registrarAsistente(Cliente cliente, String idButaca) {
        boolean registrado = false;
        if (!comprobarClienteProyeccion(cliente)) {
            for (int i = 0; i < butacas.size(); i++) {
                for (int j = 0; j < butacas.get(i).size(); j++) {
                    Butaca butacaActual = butacas.get(i).get(j);
                    if (butacaActual.getIdButaca().equalsIgnoreCase(idButaca)) {
                        if (!butacaActual.getOcupada()) {
                            butacaActual.setCliente(cliente);
                            registrado = true;
                        }
                    }
                }
            }
        }
        return registrado;
    }

    public boolean cancelarAsistencia(Cliente cliente) {
        boolean cancelado = false;
        LocalDateTime ahora = LocalDateTime.now();

        if (comprobarClienteProyeccion(cliente)) {
            Butaca butacaActual;
            if (horaFin.isAfter(ahora)) {
                for (int i = 0; i < filas; i++) {
                    for (int j = 0; j < columnas; j++) {
                        butacaActual = butacas.get(i).get(j);

                        if (butacaActual.getOcupada()
                                && butacaActual.getCliente().getDni().equalsIgnoreCase(cliente.getDni())) {
                            butacaActual.setOcupada(false);
                            butacaActual.setCliente(null);
                            cancelado = true;
                        }
                    }
                }
            }
        }

        return cancelado;
    }

    public Cliente buscarCliente(String dni) {
        Cliente clienteEncontrado = null;

        for (int i = 0; i < filas && clienteEncontrado == null; i++) {
            for (int j = 0; j < columnas && clienteEncontrado == null; j++) {

                Butaca butacaActual = butacas.get(i).get(j);

                if (butacaActual.getOcupada() && butacaActual.getCliente().getDni().equalsIgnoreCase(dni)) {

                    clienteEncontrado = butacaActual.getCliente();
                }
            }
        }

        return clienteEncontrado;
    }

    public List<Cliente> obtenerListaClientes() {
        List<Cliente> clientes = new ArrayList<>();

        for (ArrayList<Butaca> fila : butacas) {
            for (Butaca butaca : fila) {
                if (butaca != null && butaca.getCliente() != null) {
                    clientes.add(butaca.getCliente());
                }
            }
        }
        return clientes;
    }

    public int totalClientes() {
        int total = 0;

        for (List<Butaca> fila : butacas) {
            for (Butaca butaca : fila) {
                if (butaca != null && butaca.getCliente() != null) {
                    total++;
                }
            }
        }
        return total;
    }

    @Override
    public String toString() {
        return "Codigo proyeccion: " + codigoProyeccion + "\nPelicula: " + pelicula + "\n Hora de inicio --> "
                + horaInicio + "\n Hora de fin --> " + horaFin + "\n\n" + mostrarButacas() + "\n";
    }

}
