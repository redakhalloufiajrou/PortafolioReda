import java.util.ArrayList;

public class Cine {
    private String codigoCine;
    private String nombre;
    private String ciudad;
    private String pais;
    private ArrayList<Sala> salasCine;
    private ArrayList<Pelicula> peliculasCine;

    public Cine(String nombre, String ciudad, String pais, String codigoCine) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.pais = pais;
        this.codigoCine = codigoCine;
        this.salasCine = new ArrayList<>();
        this.peliculasCine = new ArrayList<>();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getCodigoCine() {
        return codigoCine;
    }

    public void setCodigoCine(String codigoCine) {
        this.codigoCine = codigoCine;
    }


    public ArrayList<Sala> getSalasCine() {
        return salasCine;
    }

    public void setSalasCine(ArrayList<Sala> salasCine) {
        this.salasCine = salasCine;
    }

    public ArrayList<Pelicula> getPeliculasCine() {
        return peliculasCine;
    }

    public void setPeliculasCine(ArrayList<Pelicula> peliculasCine) {
        this.peliculasCine = peliculasCine;
    }


    // Metodo buscarPelicula()
    public Pelicula buscarPelicula(String codigoPelicula) {
        Pelicula peliculaBuscar = null;
        for (Pelicula pelicula : peliculasCine) {
            if (codigoPelicula.equalsIgnoreCase(pelicula.getCodigoPelicula())) {
                peliculaBuscar = pelicula;
            }
        }
        return peliculaBuscar;
    }

    // Metodo agregarPelicula()
    public Boolean agregarPelicula(Pelicula p) {
        boolean peliculaAgregada = false;

        if (!peliculasCine.contains(p)) {
            peliculasCine.add(p);
            peliculaAgregada = true;
        }
        return peliculaAgregada;
    }

    // Metodo agregarSala()
    public Boolean agregarSala(Sala s) {
        boolean salaAgregada = false;

        if (!salasCine.contains(s)) {
            salasCine.add(s);
            salaAgregada = true;
        }
        return salaAgregada;
    }

    // Metodo buscarSala()
    public Sala buscarSala(String codigoSala) {
        Sala salaBuscar = null;
        for (Sala sala : salasCine) {
            if (codigoSala.equalsIgnoreCase(sala.getCodigoSala())) {
                salaBuscar = sala;
            }
        }
        return salaBuscar;
    }

    // Metodo mostrarSalas()
    public String mostrarSalas() {
        String mostrarSala = "";
        if (!salasCine.isEmpty()) {
            for (Sala sala : salasCine) {
                mostrarSala += "Codigo --> " + sala + "\n";
            }
        } else {
            mostrarSala = "No hay salas disponibles";
        }
        return mostrarSala;
    }

    // Metodo mostrarPeliculas()
    public String mostrarPeliculas() {  
        String mostrarPelicula = "";
        if (!peliculasCine.isEmpty()) {
            for (Pelicula pelicula : peliculasCine) {
                mostrarPelicula += "Codigo pelicula --> " + pelicula.getCodigoPelicula() + " | " + pelicula.getTitulo() + "\n";
            }
        } else {
            mostrarPelicula = "No hay peliculas disponibles";
        }
        return mostrarPelicula;
    }


    // Metodo totalSalas()
    public int totalSalas() {
        return salasCine.size();
    }

    public String verProyeccionesPelicula(Pelicula pelicula){

        String listadoProyecciones = "";
        ArrayList<Proyeccion> proyeccionesSala;
        for (Sala sala : salasCine) {
            proyeccionesSala = sala.getHistorialProyecciones();
            if (!proyeccionesSala.isEmpty()) {
                for (Proyeccion proyeccion : proyeccionesSala) {
                    if (proyeccion.getPelicula() == pelicula) {
                        listadoProyecciones += "\n\nSALA: " + sala.getCodigoSala() + "\nPelicula: " + pelicula.getTitulo() + "\n Hora de inicio --> " + proyeccion.getHoraInicio()
                    + "\n Hora de fin  --> " + proyeccion.getHoraFin();
                    }
                }
            }
        } 
        return listadoProyecciones;
    }


    @Override
    public String toString() {
        return "Ciudad: " + ciudad + " | Pais: " + pais + " | Codigo identificativo: " + codigoCine + " | Salas: " + totalSalas() ;
    }

}
