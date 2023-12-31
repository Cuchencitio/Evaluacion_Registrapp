import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProteccionRutasGuard } from './proteccion-rutas.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./registro/registro.module').then((m) => m.RegistroPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./lector-qr/scanner.module').then((m) => m.ScannerPageModule),
    canActivate: [ProteccionRutasGuard],
  },
  {
    path: 'error404',
    loadChildren: () =>
      import('./error404/error404.module').then((m) => m.Error404PageModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error404/error404.module').then((m) => m.Error404PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
