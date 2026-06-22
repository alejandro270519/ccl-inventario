import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  productos: Producto[] = [];
  loading = true;

  get totalProductos(): number { return this.productos.length; }
  get totalUnidades(): number  { return this.productos.reduce((a, p) => a + p.cantidad, 0); }
  get stockBajo(): number      { return this.productos.filter(p => p.cantidad <= 5).length; }
  get disponibilidad(): string {
    if (!this.totalProductos) return '100';
    return (((this.totalProductos - this.stockBajo) / this.totalProductos) * 100).toFixed(0);
  }

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getInventario().subscribe({
      next: data => { this.productos = data; this.loading = false; },
      error: ()   => { this.loading = false; },
    });
  }
}
