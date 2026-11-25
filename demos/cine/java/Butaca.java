public class Butaca {
    private String idButaca;
    private boolean ocupada;
    Cliente cliente;
    
    public Butaca(String idButaca) {
        this.ocupada = false;
        this.idButaca = idButaca;
    }

    public String getIdButaca() {
        return idButaca;
    }

    public void setIdButaca(String idButaca) {
        this.idButaca = idButaca;
    }

    public boolean getOcupada() {
        return ocupada;
    }

    public void setOcupada(boolean ocupada) {
        this.ocupada = ocupada;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
            this.cliente = cliente;
            this.ocupada = true;
    }

    @Override
    public String toString() {
        return "Estado de la butaca --> " + ocupada;
    }

}
