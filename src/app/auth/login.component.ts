import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../security/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    this.authService.login(this.usuario, this.clave).subscribe(response => {
      if (response.resultado) {
        console.log('Login successful, token:', response.token);
        this.router.navigate(['/alerta']);
      } else {
        console.log('Login failed:', response.message);
      }
    });
  }
}