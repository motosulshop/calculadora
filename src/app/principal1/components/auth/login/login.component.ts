import { Component } from '@angular/core';
import { AuthService } from 'src/app/layout/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

  valCheck: string[] = ['remember'];

  username = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(data => {
      if (data && data.user) {
        console.log(data.user.tipo_usuario)
        sessionStorage.setItem('permissions', JSON.stringify(data.user.tipo_usuario));

        this.router.navigate(['/']);
      } else {
        this.loginFailed = true;
      }
    });
  }

  



}
