import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { MovimientoRequest } from '../models/movimiento.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly apiUrl = 'http://localhost:5000/productos';

  constructor(private http: HttpClient) {}

  getInventario(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/inventario`);
  }

  registrarMovimiento(request: MovimientoRequest): Observable<{ mensaje: string; producto: Producto }> {
    return this.http.post<{ mensaje: string; producto: Producto }>(`${this.apiUrl}/movimiento`, request);
  }
}
