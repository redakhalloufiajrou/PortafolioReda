import java.util.Arrays;
import java.util.List;

public class Pelicula {
    private static int numeroDePeliculas;
    private String codigoPelicula;
    private String titulo;
    private int duracionMinutos;
    private String clasificacionEdad;
    private String genero;
    List<String> generosValidos = Arrays.asList("ACCION","COMEDIA","DRAMA","TERROR","CIENCIA FICCION","FANTASIA","ROMANCE","SUSPENSE","MUSICAL","AVENTURAS"); 

    public Pelicula(String titulo, String genero, String clasificacionEdad, int duracionMinutos) {
        setCodigoPelicula(codigoPelicula);
        this.titulo = titulo;
        setGenero(genero);
        this.clasificacionEdad = clasificacionEdad;
        setDuracionMinutos(duracionMinutos);
    }

    public String getCodigoPelicula() {
        return codigoPelicula;
    }

    public void setCodigoPelicula(String codigoPelicula) {
        if (codigoPelicula == null || codigoPelicula.isBlank()) {
            this.codigoPelicula = "p-" + numeroDePeliculas;
            numeroDePeliculas++;
        }
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public int getDuracionMinutos() {
        return duracionMinutos;
    }

    public Boolean setDuracionMinutos(int duracionMinutos) {
        Boolean duracionCorrecta = false;
        if (duracionMinutos > 60) {
            this.duracionMinutos = duracionMinutos;
            duracionCorrecta = true;
        }
        return duracionCorrecta;
    }

    public String getClasificacionEdad() {
        return clasificacionEdad;
    }

    public void setClasificacionEdad(String clasificacionEdad) {
        this.clasificacionEdad = clasificacionEdad;
    }

    public String getGenero() {
        return genero;
    }

    public Boolean setGenero(String genero) {
        Boolean generoCorrecto = false;
        
        if (generosValidos.contains(genero.toUpperCase())) {
            this.genero = genero;
            generoCorrecto = true;
        }
        return generoCorrecto;
    }


    @Override
    public String toString() {
        return titulo + " | Duracion en minutos: " + duracionMinutos + " min | Clasificacion por edades: " + clasificacionEdad + " | Genero: " + genero;
    }



}
