import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movimiento.component.html',
})
export class MovimientoComponent implements OnInit {
  form: FormGroup;
  productos: Producto[] = [];
  mensaje = '';
  error = '';
  loading = false;

  constructor(fb: FormBuilder, private productosService: ProductosService) {
    this.form = fb.group({
      productoId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      tipo: ['0', Validators.required],
    });
  }

  ngOnInit(): void {
    this.recargarProductos();
  }

  recargarProductos(): void {
    this.productosService.getInventario().subscribe({
      next: data => (this.productos = data),
      error: () => (this.error = 'No se pudo cargar la lista de productos'),
    });
  }

  setTipo(valor: string): void {
    this.form.patchValue({ tipo: valor });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.mensaje = '';
    this.error = '';

    const { productoId, cantidad, tipo } = this.form.value;

    this.productosService.registrarMovimiento({
      productoId: +productoId,
      cantidad: +cantidad,
      tipo: +tipo as 0 | 1,
    }).subscribe({
      next: res => {
        this.mensaje = res.mensaje;
        this.form.reset({ tipo: '0' });
        this.loading = false;
        this.recargarProductos();
      },
      error: err => {
        this.error = err.error?.mensaje || 'Error al registrar el movimiento';
        this.loading = false;
      },
    });
  }
}
