import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Route, Router } from '@angular/router';
import { ApiService } from '../provider/post-service.service';
import { NavController } from '@ionic/angular';
import { Detalle } from '../models/Ciudad';
import { map } from 'rxjs';

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
    ciudad: number;
    comuna: number;
    logeado: boolean;
  };
  regions: any[] = [];
  communes: any[] = [];

  constructor(
    private router: Router,
    public navCtrl: NavController,
    public ApiServices: ApiService
  ) {
    this.usuario = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      ciudad: 0,
      comuna: 0,
      logeado: false,
    };
  }
  ionViewDidEnter() {
    this.loadRegions();
  }
  loadRegions() {
    this.ApiServices.getRegions().subscribe((response) => {
      this.regions = response.data;
    });
  }

  loadCommunes(regionId: number) {
    this.ApiServices.getCommunes(regionId).subscribe((response) => {
      this.communes = response.data;
    });
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
