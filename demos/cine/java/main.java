
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;

public class main {

    public static void mostrarMenu() {
        System.out.println("\n ===== GESTIÓN STEMOS EN EL CINE ====="
                + "\n1: Gestionar Cines"
                + "\n2: Gestionar Salas"
                + "\n3: Gestionar Películas"
                + "\n4: Gestionar Clientes"
                + "\n5: Salir");
    }

    public static void mostrarMenuCines() {
        System.out.println("\n ===== GESTIÓN CINES ====="
                + "\n1: Ver detalles de un cine"
                + "\n2: Volver al menu principal");
    }

    public static void mostrarMenuSalas() {
        System.out.println("\n ===== GESTIÓN SALAS ====="
                + "\n1: Listar salas"
                + "\n2: Consultar disponibilidad en sala"
                + "\n3: Programar pelicula en sala"
                + "\n4: Cancelar proyeccion"
                + "\n5: Volver al menu principal");
    }

    public static void mostrarMenuPeliculas() {
        System.out.println("\n ===== GESTIÓN PELICULAS ====="
                + "\n1: Listar peliculas"
                + "\n2: Ver detalles de una pelicula"
                + "\n3: Ver proyecciones de una pelicula"
                + "\n4: Volver al menu principal");
    }

    public static void mostrarMenuClientes() {
        System.out.println("\n ===== GESTIÓN CLIENTES ====="
                + "\n1: Registrar cliente en proyeccion"
                + "\n2: Cancelar asistencia"
                + "\n3: Ver lista de clientes en una proyeccion"
                + "\n4: Ver numero total de asistentes"
                + "\n5: Volver al menu principal");
    }

    public static void imprimirMensaje(String mensajeAMostrar) {
        System.out.println(mensajeAMostrar);
    }

    public static int comprobarNumeroValido(String mensaje, Scanner sc) {
        int numero = 0;
        boolean correcto = false;

        while (!correcto) {
            try {
                imprimirMensaje(mensaje);
                numero = Integer.parseInt(sc.nextLine());
                correcto = true;
            } catch (NumberFormatException e) {
                imprimirMensaje("Error: introduce un numero entero valido");
            }
        }
        return numero;
    }

    public static int leerOpcionMenu(int min, int max, Scanner sc) {
        int opcion;
        boolean correcta = false;

        do {
            opcion = comprobarNumeroValido("Seleccione una opción:", sc);

            if (opcion >= min && opcion <= max) {
                correcta = true;
            } else {
                imprimirMensaje("Error: la opcion debe estar entre " + min + " y " + max);
            }
        } while (!correcta);
        return opcion;
    }

    // Menu cines
    public static void menuCines(Scanner scanner, Cine cine) {
        int opcionSubMenu = 0;

        while (opcionSubMenu != 2) {
            mostrarMenuCines();
            opcionSubMenu = leerOpcionMenu(1, 2, scanner);

            if (opcionSubMenu == 1) {
                System.out.println(cine);
            }
        }
    }

    // Menu salas
    public static void menuSalas(Scanner scanner, Cine cine) {
        int opcionSubMenu = 0;

        while (opcionSubMenu != 5) {
            mostrarMenuSalas();
            opcionSubMenu = leerOpcionMenu(1, 5, scanner);

            if (opcionSubMenu == 1) {
                listarSalas(cine);
            } else if (opcionSubMenu == 2) {
                consultarDisponibilidadSala(scanner, cine);
            } else if (opcionSubMenu == 3) {
                programarPelicula(scanner, cine);
            } else if (opcionSubMenu == 4) {
                cancelarProyeccion(scanner, cine);
            }
        }
    }

    public static void listarSalas(Cine cine) {
        imprimirMensaje("===================Listado de salas===================");
        System.out.println(cine.mostrarSalas());
    }

    public static void consultarDisponibilidadSala(Scanner scanner, Cine cine) {
        String codigoSala;

        imprimirMensaje("Introduzca el codigo de la sala: ");
        codigoSala = scanner.nextLine();

        Sala sala = cine.buscarSala(codigoSala);

        if (sala.salaOcupada(sala) == true) {
            System.out.println("La " + sala.getCodigoSala() + " esta ocupada");
        } else {
            System.out.println("La " + sala.getCodigoSala() + " esta disponible");
        }
    }

    public static void programarPelicula(Scanner scanner, Cine cine) {
        String peliculaAProgramar;
        String codigoSala;
        String horaInicioString;

        imprimirMensaje("============Peliculas disponibles============");
        System.out.println(cine.mostrarPeliculas());

        imprimirMensaje("Introduzca el codigo de la pelicula a programar: ");
        peliculaAProgramar = scanner.nextLine();
        Pelicula pelicula = cine.buscarPelicula(peliculaAProgramar);

        if (pelicula != null) {
            imprimirMensaje("Introduzca el codigo de la sala: ");
            codigoSala = scanner.nextLine();
            Sala sala = cine.buscarSala(codigoSala);

            if (sala != null) {
                imprimirMensaje("Introduzca la hora de inicio (Ej: 2026-03-19T17:49): ");
                horaInicioString = scanner.nextLine();
                LocalDateTime horaInicio = LocalDateTime.parse(horaInicioString);

                Proyeccion proyeccion = new Proyeccion(pelicula, horaInicio);

                if (sala.agregarProyeccion(proyeccion)) {
                    System.out.println("La pelicula " + pelicula.getTitulo() +
                            " se ha programado en la sala " + sala.getCodigoSala());
                } else {
                    imprimirMensaje("No se ha podido programar la pelicula");
                }
            } else {
                imprimirMensaje("No se ha encontrado la sala");
            }
        } else {
            imprimirMensaje("No se ha encontrado la pelicula");
        }
    }

    public static void cancelarProyeccion(Scanner scanner, Cine cine) {
        String codigoSala;
        String codigoProyeccion;

        imprimirMensaje("Introduzca el codigo de la sala: ");
        codigoSala = scanner.nextLine();

        Sala sala = cine.buscarSala(codigoSala);

        if (sala != null) {
            if (!sala.getHistorialProyecciones().isEmpty()) {
                System.out.println(sala.mostrarProyecciones());

                imprimirMensaje("Introduzca el codigo de la proyeccion: ");
                codigoProyeccion = scanner.nextLine();
                LocalDateTime horaActual = LocalDateTime.now();
                Proyeccion proyeccion = sala.buscarProyeccion(codigoProyeccion);
                if (proyeccion != null) {
                    if (proyeccion.getHoraFin().isAfter(horaActual)) {
                        sala.getHistorialProyecciones().remove(proyeccion);
                        imprimirMensaje("Proyeccion cancelada");
                    } else {
                        imprimirMensaje("La proyeccion ya ha terminado, no se puede cancelar");
                    }
                } else {
                    imprimirMensaje("No encontrada");
                }
            } else {
                imprimirMensaje("No hay proyecciones");
            }
        } else {
            imprimirMensaje("No hay ninguna sala con el codigo introducido");
        }
    }

    // Menu peliculas
    public static void menuPeliculas(Scanner scanner, Cine cine) {
        int opcionSubMenu = 0;

        while (opcionSubMenu != 4) {
            mostrarMenuPeliculas();
            opcionSubMenu = leerOpcionMenu(1, 4, scanner);

            if (opcionSubMenu == 1) {
                System.out.println(cine.mostrarPeliculas());
            } else if (opcionSubMenu == 2) {
                verPelicula(scanner, cine);
            } else if (opcionSubMenu == 3) {
                verProyeccionesPelicula(scanner, cine);
            }
        }
    }

    public static void verPelicula(Scanner scanner, Cine cine) {
        String codigo;
        imprimirMensaje("Introduzca el codigo de la pelicula: ");
        codigo = scanner.nextLine();

        Pelicula pelicula = cine.buscarPelicula(codigo);

        if (pelicula != null) {
            System.out.println(pelicula);
        }
    }

    public static void verProyeccionesPelicula(Scanner scanner, Cine cine) {
        String codigo;
        imprimirMensaje("Introduzca el codigo de la pelicula: ");
        codigo = scanner.nextLine();

        Pelicula pelicula = cine.buscarPelicula(codigo);

        if (pelicula != null) {
            System.out.println(cine.verProyeccionesPelicula(pelicula));
        } else {
            imprimirMensaje("No encontrada");
        }
    }

    // Menu Clientes
    public static void menuClientes(Scanner scanner, Cine cine) {
        int opcionSubMenu = 0;

        while (opcionSubMenu != 5) {
            mostrarMenuClientes();
            opcionSubMenu = leerOpcionMenu(1, 5, scanner);

            if (opcionSubMenu == 1) {
                registrarCliente(scanner, cine);
            } else if (opcionSubMenu == 2) {
                cancelarAsistencia(scanner, cine);
            } else if (opcionSubMenu == 3) {
                listaClientes(scanner, cine);
            } else if (opcionSubMenu == 4) {
                cantidaClientes(scanner, cine);
            }
        }
    }

    public static void registrarCliente(Scanner scanner, Cine cine) {
        String nombre;
        String dni;
        int edad;
        String tipo;
        int numero;
        String codigoSala;
        String codigoProyeccion;
        String butaca;

        imprimirMensaje("Nombre: ");
        nombre = scanner.nextLine();

        imprimirMensaje("DNI: ");
        dni = scanner.nextLine();

        imprimirMensaje("Edad: ");
        edad = Integer.parseInt(scanner.nextLine());

        imprimirMensaje("Tipo entrada: ");
        tipo = scanner.nextLine();

        imprimirMensaje("Numero entrada: ");
        numero = Integer.parseInt(scanner.nextLine());

        Cliente cliente = new Cliente(nombre, dni, edad, tipo, numero);

        imprimirMensaje("Codigo sala: ");
        codigoSala = scanner.nextLine();

        Sala sala = cine.buscarSala(codigoSala);

        if (!sala.getHistorialProyecciones().isEmpty()) {
            System.out.println(sala.mostrarProyecciones());

            imprimirMensaje("Codigo proyeccion: ");
            codigoProyeccion = scanner.nextLine();

            Proyeccion proyeccion = sala.buscarProyeccion(codigoProyeccion);

            if (proyeccion != null) {
                imprimirMensaje("Introduzca la Butaca: ");
                butaca = scanner.nextLine();

                if (proyeccion.registrarAsistente(cliente, butaca)) {
                    imprimirMensaje("Registrado");
                } else {
                    imprimirMensaje("Butaca ocupada");
                }
            }
        }
    }

    public static void cancelarAsistencia(Scanner scanner, Cine cine) {
        String codigoSala;
        String dni;
        String codigoProyeccion;

        System.out.println("Codigo sala: ");
        codigoSala = scanner.nextLine();

        System.out.println("DNI cliente: ");
        dni = scanner.nextLine();

        Sala sala = cine.buscarSala(codigoSala);

        if (!sala.getHistorialProyecciones().isEmpty()) {
            imprimirMensaje("Codigo proyeccion: ");
            codigoProyeccion = scanner.nextLine();

            Proyeccion proyeccion = sala.buscarProyeccion(codigoProyeccion);

            if (proyeccion != null) {
                Cliente cliente = proyeccion.buscarCliente(dni);

                if (cliente != null) {
                    if (proyeccion.cancelarAsistencia(cliente)) {
                        imprimirMensaje("Cliente Cancelado con exito");
                    }
                }
            }
        }
    }

    public static void listaClientes(Scanner scanner, Cine cine) {
        String codigoSala;
        String codigoProyeccion;

        imprimirMensaje("Codigo sala: ");
        codigoSala = scanner.nextLine();

        Sala sala = cine.buscarSala(codigoSala);

        if (sala == null) {
            imprimirMensaje("Error: La sala no existe.");
        }

        if (!sala.getHistorialProyecciones().isEmpty()) {
            imprimirMensaje("Codigo proyeccion: ");
            codigoProyeccion = scanner.nextLine();

            Proyeccion proyeccion = sala.buscarProyeccion(codigoProyeccion);

            if (proyeccion != null) {
                List<Cliente> clientes = proyeccion.obtenerListaClientes();

                if (clientes.isEmpty()) {
                    imprimirMensaje("No hay clientes registrados en esta proyección.");
                } else {
                    imprimirMensaje("--- Lista de Clientes ---");
                    for (Cliente cliente : clientes) {
                        imprimirMensaje("- " + cliente.toString());
                    }
                }
            } else {
                imprimirMensaje("La proyeccion no existe.");
            }
        } else {
            imprimirMensaje("Esta sala no tiene proyecciones en su historial.");
        }
    }

    public static void cantidaClientes(Scanner scanner, Cine cine) {
        String codigoSala;
        String codigoProyeccion;
        int clientes = 0;

        imprimirMensaje("Codigo sala: ");
        codigoSala = scanner.nextLine();

        Sala sala = cine.buscarSala(codigoSala);

        if (sala == null) {
            imprimirMensaje("Error: La sala no existe.");
        }

        if (!sala.getHistorialProyecciones().isEmpty()) {
            imprimirMensaje("Codigo proyeccion: ");
            codigoProyeccion = scanner.nextLine();

            Proyeccion proyeccion = sala.buscarProyeccion(codigoProyeccion);

            if (proyeccion != null) {
                clientes = proyeccion.totalClientes();
                if (clientes == 0) {
                    imprimirMensaje("No hay clientes");
                } else {
                    imprimirMensaje("Total clientes: " + clientes);
                }
            }
        }
    }

    public static void poblarCine(Cine cine) {
        String idButaca;
        for (Sala sala : cine.getSalasCine()) {
            for (Proyeccion proyeccion : sala.getHistorialProyecciones()) {
                int asistentes = Faker.entero(20, 40);
                for (int i = 0; i < asistentes; i++) {
                    Cliente cliente = new Cliente(Faker.nombreYApellido(), Faker.dni(), Faker.edadCliente(),
                            Faker.tipoEntrada(), Faker.numeroEntrada());
                    idButaca = (char) ('A' + Faker.entero(0, 19)) + "" + Faker.entero(1, 10);

                    proyeccion.registrarAsistente(cliente, idButaca);
                }
            }
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int opcion = 0;
        int indiceAleatorio;
        LocalDateTime horaInicio;
        LocalDateTime horaFin;

        final int UNO = 1;
        final int DOS = 2;
        final int TRES = 3;
        final int CUATRO = 4;
        final int CINCO = 5;

        final int CANTIDAD_PELICULAS = 10;
        final int CANTIDAD_SALAS = 5;
        final int PROYECCIONES_POR_SALA = 3;

        Cine Kinepolis = new Cine(Faker.nombreCine(), Faker.ciudadCine(), Faker.paisCine(), Faker.codigoCine());

        for (int i = 0; i < CANTIDAD_PELICULAS; i++) {
            Pelicula peliculas = new Pelicula(Faker.tituloPelicula(), Faker.generoPelicula(), Faker.clasificacionEdad(),
                    Faker.duracionPelicula());
            Kinepolis.getPeliculasCine().add(peliculas);
        }

        for (int i = 0; i < CANTIDAD_SALAS; i++) {
            Sala salas = new Sala(Faker.capacidadSala());
            Kinepolis.getSalasCine().add(salas);
        }

        for (Sala sala : Kinepolis.getSalasCine()) {
            for (int i = 0; i < PROYECCIONES_POR_SALA; i++) {

                indiceAleatorio = Faker.entero(0, Kinepolis.getPeliculasCine().size() - 1);
                Pelicula peliculaAleatoria = Kinepolis.getPeliculasCine().get(indiceAleatorio);

                horaInicio = Faker.horaInicioProyeccion();
                horaFin = horaInicio.plusMinutes(peliculaAleatoria.getDuracionMinutos());

                sala.programarPelicula(peliculaAleatoria, horaInicio, horaFin);
            }
        }

        poblarCine(Kinepolis);

        while (opcion != CINCO) {
            mostrarMenu();
            opcion = leerOpcionMenu(UNO, CINCO, scanner);

            if (opcion == UNO) {
                menuCines(scanner, Kinepolis);
            }

            if (opcion == DOS) {
                menuSalas(scanner, Kinepolis);
            }

            if (opcion == TRES) {
                menuPeliculas(scanner, Kinepolis);
            }

            if (opcion == CUATRO) {
                menuClientes(scanner, Kinepolis);
            }
        }
        System.out.println("Programa Finalizado");
    }
}
