export type TipoMovimiento = 0 | 1;

export interface MovimientoRequest {
  productoId: number;
  cantidad: number;
  tipo: TipoMovimiento;
}
