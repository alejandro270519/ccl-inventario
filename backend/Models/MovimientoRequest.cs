namespace CCL.Inventario.Api.Models;

public enum TipoMovimiento
{
    Entrada,
    Salida
}

public class MovimientoRequest
{
    public int ProductoId { get; set; }
    public int Cantidad { get; set; }
    public TipoMovimiento Tipo { get; set; }
}
