import { Component, OnInit } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';
import { NavController } from '@ionic/angular';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { DataService } from '../data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scannedQRCode: string = '';
  currentLocation: string = '';
  authenticatedUser: any; // Variable para almacenar los detalles del usuario autenticado
  fotoURL: SafeResourceUrl | null = null;
  public usuario: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    ciudad: number;
    comuna: number;
    logeado: boolean;
  };

  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private sanitizer: DomSanitizer
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

  async ngOnInit() {
    const fotoURLFromLocalStorage = localStorage.getItem('foto');
    if (fotoURLFromLocalStorage) {
      this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        fotoURLFromLocalStorage
      );
    }

    const codeReader = new BrowserQRCodeReader();
    const videoElement = document.getElementById(
      'videoElement'
    ) as HTMLVideoElement;

    codeReader
      .decodeFromVideoDevice(undefined, videoElement, (result, err) => {
        if (result) {
          this.scannedQRCode = result.getText();
          console.log('Código QR escaneado:', this.scannedQRCode);
        }
        if (err) {
          console.error('Error al escanear:', err);
        }
      })
      .catch((err) => {
        console.error('Error al iniciar la cámara:', err);
      });

    this.getCurrentLocation();
    const usuario = await Preferences.get({ key: 'logedUser' });
    if (!usuario.value) {
      alert('Usuario no existe');
    } else {
      let pass = JSON.parse(usuario.value);
      const usuarioRegistro = await Preferences.get({ key: pass.email });
      if (!usuarioRegistro.value) {
        alert('No se ha registrado el usuario');
      } else {
        let usr = JSON.parse(usuarioRegistro.value);
        this.authenticatedUser = usr;
      }
    }
    //this.authenticatedUser = this.dataService.getAuthenticatedUser(); // Obtén los detalles del usuario autenticado
  }

  async getCurrentLocation() {
    try {
      const coordinates: GeolocationPosition =
        await Geolocation.getCurrentPosition();
      this.currentLocation = `Latitud: ${coordinates.coords.latitude}, Longitud: ${coordinates.coords.longitude}`;
      console.log('Ubicación actual:', this.currentLocation);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  navigateLeft() {
    this.navCtrl.back();
  }

  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
      Preferences.remove({ key: 'logedUser' });
    }
  }
}
