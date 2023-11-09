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

  constructor(private router: Router) {
    this.loginUser = {
      email: '',
      password: '',
    };
  }
  async login() {
    const usuario = await Preferences.get({ key: this.loginUser.email });
    if (!usuario.value) {
      alert('Usuario no existe');
    } else {
      const pass = JSON.parse(usuario.value);
      console.log(pass);
      if (this.loginUser.password === pass.password) {
        console.log('Logeado');
        this.router.navigateByUrl('lector-qr');
      } else {
        console.log('Password incorrecta');
      }
    }
  }
  ngOnInit() {}
}
