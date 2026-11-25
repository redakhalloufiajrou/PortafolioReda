
import java.time.LocalDateTime;
import java.util.ArrayList;

public class Sala {
    private static int numeroDeSalas;
    private String codigoSala;
    private int capacidadMaxima;
    private String tipoProyeccion;
    ArrayList<Proyeccion> historialProyecciones;

    public Sala(int capacidadMaxima) {
        setCodigoSala(codigoSala);
        setCapacidadMaxima(capacidadMaxima);
        this.historialProyecciones = new ArrayList<>();
    }

    public String getCodigoSala() {
        return codigoSala;
    }

    public void setCodigoSala(String codigoSala) {
        if (codigoSala == null || codigoSala.isBlank()) {
            this.codigoSala = "sala-" + numeroDeSalas;
            numeroDeSalas++;
        }
    }

    public int getCapacidadMaxima() {
        return capacidadMaxima;
    }

    public void setCapacidadMaxima(int capacidadMaxima) {
        if (capacidadMaxima > 0) {
            this.capacidadMaxima = capacidadMaxima;
        }
    }

    public String getTipoProyeccion() {
        return tipoProyeccion;
    }

    public void setTipoProyeccion(String tipoProyeccion) {
        this.tipoProyeccion = tipoProyeccion;
    }

    public ArrayList<Proyeccion> getHistorialProyecciones() {
        return historialProyecciones;
    }

    public void setHistorialProyecciones(ArrayList<Proyeccion> historialProyecciones) {
        this.historialProyecciones = historialProyecciones;
    }

    // Metodo agregarProyeccion()
    public Boolean agregarProyeccion(Proyeccion p) {
        boolean proyeccionAgregada = false;

        if (!historialProyecciones.contains(p)) {
            historialProyecciones.add(p);
            proyeccionAgregada = true;
        }
        return proyeccionAgregada;
    }


      // Metodo mostrarProyecciones()
    public String mostrarProyecciones() {  
        String mostrarProyeccion = "";
        if (!historialProyecciones.isEmpty()) {
            mostrarProyeccion += "------------------Proyecciones------------------\n";
            for (Proyeccion proyeccion : historialProyecciones) {
                mostrarProyeccion += proyeccion + "\n";
            }
        }
        return mostrarProyeccion;
    }

    // Metodo salaOcupada()
    public boolean salaOcupada(Sala sala) {
        boolean ocupada = false;
        LocalDateTime ahora = LocalDateTime.now();
        if (!historialProyecciones.isEmpty()) {
            for (int i = 0; i < historialProyecciones.size() && !ocupada; i++) {
                if (historialProyecciones.get(i).getHoraInicio().isBefore(ahora)
                        && historialProyecciones.get(i).getHoraFin().isAfter(ahora)) {
                    ocupada = true;
                }
            }
        }
        return ocupada;
    }

    // Metodo programarPelicula()   
    public Boolean programarPelicula(Pelicula p, LocalDateTime horaInicio, LocalDateTime horaFin) {
        boolean peliculaProgramada = false;
        Proyeccion proyeccionProgramada = new Proyeccion(p, horaInicio);
        proyeccionProgramada.setHoraInicio(horaInicio);
        if (salaOcupada(this) == false) {
            agregarProyeccion(proyeccionProgramada);
            peliculaProgramada = true;
        }
        return peliculaProgramada;
    }
    // Metodo buscarProyeccion()
    public Proyeccion buscarProyeccion(String codigo){
        Proyeccion proyeccionABuscar = null;
        for (Proyeccion proyeccion : historialProyecciones) {
            if (proyeccion.getCodigoProyeccion().equalsIgnoreCase(codigo)) {
                proyeccionABuscar = proyeccion;
            }
        }
        return proyeccionABuscar;
    }

    // Metodo cancelarProyeccion()
    public Boolean cancelarProyeccion(Proyeccion p) {
        boolean proyeccionCancelada = false;
        if (historialProyecciones.contains(p)) {
            historialProyecciones.remove(p);
            proyeccionCancelada = true;
        }
        return proyeccionCancelada;
    }

    @Override
    public String toString() {
        String proyeccionesAMostrar = mostrarProyecciones();

        return codigoSala + " | Aforo maximo --> " + capacidadMaxima + " personas\n\n" + proyeccionesAMostrar;
    }

}
