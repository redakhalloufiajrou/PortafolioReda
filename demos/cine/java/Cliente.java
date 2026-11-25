public class Cliente {
    private String nombreYApellido;
    private String dni;
    private int edad;
    private String tipoEntrada;
    private int numeroEntrada;

    public Cliente(String nombreYApellido, String dni, int edad, String tipoEntrada, int numeroEntrada) {
        this.nombreYApellido = nombreYApellido;
        this.dni = dni;
        this.edad = edad;
        this.tipoEntrada = tipoEntrada;
        this.numeroEntrada = numeroEntrada;
    }

    public String getNombreYApellido() {
        return nombreYApellido;
    }

    public void setNombreYApellido(String nombreYApellido) {
        this.nombreYApellido = nombreYApellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public String getTipoEntrada() {
        return tipoEntrada;
    }

    public void setTipoEntrada(String tipoEntrada) {
        this.tipoEntrada = tipoEntrada;
    }

    public int getNumeroEntrada() {
        return numeroEntrada;
    }

    public void setNumeroEntrada(int numeroEntrada) {
        this.numeroEntrada = numeroEntrada;
    }

    @Override
    public String toString() { 
        return "Cliente: " + nombreYApellido + " | DNI: " + dni + " | Edad: " + edad + " años | Tipo de Entrada: "
                + tipoEntrada + " | Numero de Entrada: " + numeroEntrada;
    }

}
