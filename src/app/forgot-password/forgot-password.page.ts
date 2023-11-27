import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public cambioPassword: {
    email: string;
    nuevapassword: string;
  };

  constructor(private router: Router) {
    this.cambioPassword = {
      email: '',
      nuevapassword: '',
    };
  }
  async CambiarPassword() {
    const usuario = await Preferences.get({ key: this.cambioPassword.email });
    if (!usuario.value) {
      alert('Usuario no existe');
    } else {
      const cambioDePassword = JSON.parse(usuario.value);
      cambioDePassword.password = this.cambioPassword.nuevapassword;
      await Preferences.set({
        key: cambioDePassword.email,
        value: JSON.stringify(cambioDePassword),
      });
      alert('Password cambiada con exito');
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit() {}
}
