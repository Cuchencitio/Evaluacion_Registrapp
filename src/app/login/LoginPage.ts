import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginUser: {
    email: string;
    password: string;
  };
  public logedUser: {
    email: string;
    logeado: boolean;
  };

  constructor(private router: Router) {
    this.loginUser = {
      email: '',
      password: '',
    };
    this.logedUser = {
      email: '',
      logeado: false,
    };
  }

  async login() {
    const usuario = await Preferences.get({ key: this.loginUser.email });
    if (!usuario.value) {
      alert('Usuario no existe');
    } else {
      const pass = JSON.parse(usuario.value);
      if (this.loginUser.password === pass.password) {
        this.logedUser.logeado = true;
        this.logedUser.email = this.loginUser.email;
        await Preferences.set({
          key: 'logedUser',
          value: JSON.stringify(this.logedUser),
        });
        this.router.navigateByUrl('scanner');
      } else {
        this.logedUser.logeado = false;
      }
    }
  }
  ngOnInit() {}
}
