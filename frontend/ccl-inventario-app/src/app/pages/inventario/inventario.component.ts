import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { AuthService } from '../../core/services/auth.service';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventario.component.html',
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];
  error = '';
  loading = true;

  constructor(private productosService: ProductosService, private auth: AuthService) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.loading = true;
    this.productosService.getInventario().subscribe({
      next: data => {
        this.productos = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el inventario';
        this.loading = false;
      },
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
