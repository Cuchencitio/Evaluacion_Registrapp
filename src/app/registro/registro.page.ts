import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public usuario: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
  };

  constructor(private router: Router) {
    this.usuario = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    };
  }
  async registro() {
    await Preferences.set({
      key: this.usuario.email,
      value: JSON.stringify(this.usuario),
    });
    alert('Usuario registrado de forma exitosa');
    this.router.navigateByUrl('login');
  }
  ngOnInit() {}
}
