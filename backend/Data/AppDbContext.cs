using CCL.Inventario.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CCL.Inventario.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Producto> Productos => Set<Producto>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Producto>().ToTable("productos");

        modelBuilder.Entity<Producto>().HasData(
            new Producto { Id = 1, Nombre = "Laptop Dell", Cantidad = 10 },
            new Producto { Id = 2, Nombre = "Monitor Samsung", Cantidad = 15 },
            new Producto { Id = 3, Nombre = "Teclado Logitech", Cantidad = 25 },
            new Producto { Id = 4, Nombre = "Mouse Inalámbrico", Cantidad = 30 },
            new Producto { Id = 5, Nombre = "Auriculares Sony", Cantidad = 8 }
        );
    }
}
