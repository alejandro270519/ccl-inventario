import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];
  error = '';
  loading = true;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.loading = true;
    this.productosService.getInventario().subscribe({
      next: data => { this.productos = data; this.loading = false; },
      error: () => { this.error = 'No se pudo cargar el inventario'; this.loading = false; },
    });
  }

  get maxCantidad(): number {
    return Math.max(...this.productos.map(p => p.cantidad), 1);
  }

  stockPct(cantidad: number): number {
    return Math.round((cantidad / this.maxCantidad) * 100);
  }
}
