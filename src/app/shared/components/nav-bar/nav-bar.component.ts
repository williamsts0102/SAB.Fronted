import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  menuActive: boolean = false;

  //constructor(private router: Router) {}

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout() {
    // Lógica para cerrar sesión, por ejemplo, limpiar el almacenamiento local y redirigir al inicio de sesión
    //localStorage.clear();
    //this.router.navigate(['/login']);
  }
}
