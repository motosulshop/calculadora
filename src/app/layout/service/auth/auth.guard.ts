import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const allowedRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn() && allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
