import java.time.LocalDateTime;

public class Faker {

    // ===== Datos base para Películas =====
    private static final String[] prefijosTitulo = {
            "El Señor de", "La Venganza de", "El Misterio de", "Crónicas de",
            "El Ataque de", "La Maldición de", "El Retorno de", "En Busca de",
            "La Noche de", "El Secreto de", "Guardianes de", "El Último Vuelo de"
    };

    private static final String[] sufijosTitulo = {
            "los Anillos", "la Galaxia", "los Zombies", "Marte",
            "los Dragones", "la Montaña", "los Espías", "las Sombras",
            "las Estrellas", "la Selva", "los Océanos", "la Ciudad"
    };

    // Ajustado a los géneros válidos de tu clase Pelicula (sin tildes para evitar fallos)
    private static final String[] generos = {
            "ACCION", "COMEDIA", "DRAMA", "TERROR", "CIENCIA FICCION",
            "FANTASIA", "ROMANCE", "SUSPENSE", "MUSICAL", "AVENTURAS"
    };

    private static final String[] clasificaciones = {
            "TP", "+7", "+12", "+16", "+18"
    };

    // ===== Datos base para Clientes =====
    private static final String[] nombres = {
            "Ana", "Luis", "Carlos", "Marta", "Elena", "Jorge", "Lucía", "Diego", "Sofía", "Miguel"
    };

    private static final String[] apellidos = {
            "García", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Ruiz", "Hernández", "Díaz"
    };

    private static final String[] tiposEntrada = {
            "Normal", "Jubilado", "Estudiante", "VIP", "Día del Espectador"
    };

    // ===== Datos base para Cines =====
    private static final String[] nombresCine = {
            "Cinesa", "Yelmo", "Kinepolis", "Renoir", "Cines Sur", "Artesiete"
    };

    private static final String[] ciudades = {
            "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Puente Genil", "Bilbao"
    };


    // =========================================================
    // Utilidades básicas
    // =========================================================

    /**
     * Genera un número entero aleatorio entre min y max (inclusive).
     */
    public static int entero(int min, int max) {
        return (int) (Math.random() * (max - min + 1) + min);
    }

    /**
     * Devuelve un elemento aleatorio de un array de Strings.
     */
    private static String deLista(String[] lista) {
        return lista[entero(0, lista.length - 1)];
    }

    // =========================================================
    // Generadores específicos para Películas
    // =========================================================

    public static String tituloPelicula() {
        return deLista(prefijosTitulo) + " " + deLista(sufijosTitulo);
    }

    public static String generoPelicula() {
        return deLista(generos);
    }

    // Rango de 80 a 210 minutos (cumple la validación de > 60 min)
    public static int duracionPelicula() {
        return entero(80, 210); 
    }

    public static String clasificacionEdad() {
        return deLista(clasificaciones);
    }

    // =========================================================
    // Generadores específicos para Salas
    // =========================================================

    public static int capacidadSala() {
        return entero(50, 300);
    }

    public static String codigoSala() {
        String letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int numeroSala = entero(1, 9);
        char letraSala = letras.charAt(entero(0, letras.length() - 1));
        return "SALA-" + numeroSala + letraSala;
    }

    // =========================================================
    // Generadores específicos para Clientes
    // =========================================================

    public static String nombreYApellido() {
        return deLista(nombres) + " " + deLista(apellidos);
    }

    public static String dni() {
        int numero = entero(10000000, 99999999);
        String letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        char letra = letras.charAt(numero % 23);
        return String.valueOf(numero) + letra;
    }

    public static int edadCliente() {
        return entero(7, 85);
    }

    public static String tipoEntrada() {
        return deLista(tiposEntrada);
    }

    public static int numeroEntrada() {
        return entero(1, 9999);
    }

    // =========================================================
    // Generadores específicos para Cines
    // =========================================================

    public static String nombreCine() {
        return deLista(nombresCine) + " " + deLista(ciudades);
    }

    public static String ciudadCine() {
        return deLista(ciudades);
    }

    public static String paisCine() {
        return "España";
    }

    public static String codigoCine() {
        return "CINE-" + entero(100, 999);
    }

    // =========================================================
    // Generadores específicos para Proyecciones
    // =========================================================

    /**
     * Genera una fecha/hora de inicio aleatoria para los próximos 7 días,
     * entre las 16:00 y las 22:00 horas.
     */
    public static LocalDateTime horaInicioProyeccion() {
        int diasAAñadir = entero(0, 7);
        int hora = entero(16, 22);
        int minutos = deLista(new String[]{"00", "15", "30", "45"}).equals("00") ? 0 : Integer.parseInt(deLista(new String[]{"00", "15", "30", "45"}));
        
        return LocalDateTime.now().plusDays(diasAAñadir).withHour(hora).withMinute(minutos).withSecond(0).withNano(0);
    }
}