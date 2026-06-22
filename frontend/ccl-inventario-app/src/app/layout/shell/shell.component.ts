import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  nav = [
    { label: 'Dashboard',   route: '/dashboard' },
    { label: 'Inventario',  route: '/inventario' },
    { label: 'Movimientos', route: '/movimiento' },
  ];

  constructor(private auth: AuthService) {}
  logout(): void { this.auth.logout(); }
}
