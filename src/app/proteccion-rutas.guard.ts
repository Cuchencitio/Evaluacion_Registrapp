import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ProteccionRutasGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router
  ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.authService.IsLoggedIn();
    if (isAuthenticated) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
