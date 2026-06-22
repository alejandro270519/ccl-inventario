using CCL.Inventario.Api.Data;
using CCL.Inventario.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CCL.Inventario.Api.Controllers;

[ApiController]
[Route("productos")]
[Authorize]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductosController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("movimiento")]
    public async Task<IActionResult> RegistrarMovimiento([FromBody] MovimientoRequest request)
    {
        if (request.Cantidad <= 0)
            return BadRequest(new { mensaje = "La cantidad debe ser mayor a cero" });

        var producto = await _db.Productos.FindAsync(request.ProductoId);

        if (producto is null)
            return NotFound(new { mensaje = "Producto no encontrado" });

        if (request.Tipo == TipoMovimiento.Salida && producto.Cantidad < request.Cantidad)
            return BadRequest(new { mensaje = "Stock insuficiente para realizar la salida" });

        if (request.Tipo == TipoMovimiento.Entrada)
            producto.Cantidad += request.Cantidad;
        else
            producto.Cantidad -= request.Cantidad;

        await _db.SaveChangesAsync();

        return Ok(new { mensaje = "Movimiento registrado correctamente", producto });
    }

    [HttpGet("inventario")]
    public async Task<IActionResult> ObtenerInventario()
    {
        var inventario = await _db.Productos.OrderBy(p => p.Nombre).ToListAsync();
        return Ok(inventario);
    }
}
