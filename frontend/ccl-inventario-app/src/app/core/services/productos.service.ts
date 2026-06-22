import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { MovimientoRequest } from '../models/movimiento.model';

const DEMO_PRODUCTOS: Producto[] = [
  { id: 1, nombre: 'Laptop Dell',         cantidad: 10 },
  { id: 2, nombre: 'Monitor Samsung',     cantidad: 15 },
  { id: 3, nombre: 'Teclado Logitech',    cantidad: 25 },
  { id: 4, nombre: 'Mouse Inalámbrico',   cantidad: 30 },
  { id: 5, nombre: 'Auriculares Sony',    cantidad: 8  },
];

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly apiUrl = 'http://localhost:5000/productos';

  constructor(private http: HttpClient) {}

  getInventario(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/inventario`).pipe(
      catchError(() => of(DEMO_PRODUCTOS))
    );
  }

  registrarMovimiento(request: MovimientoRequest): Observable<{ mensaje: string; producto: Producto }> {
    const demo = DEMO_PRODUCTOS.find(p => p.id === request.productoId);
    return this.http.post<{ mensaje: string; producto: Producto }>(`${this.apiUrl}/movimiento`, request).pipe(
      catchError(() => of({
        mensaje: `Movimiento registrado (demo): ${request.tipo === 0 ? 'Entrada' : 'Salida'} de ${request.cantidad} unidad(es) de ${demo?.nombre ?? 'producto'}`,
        producto: demo ?? DEMO_PRODUCTOS[0],
      }))
    );
  }
}
