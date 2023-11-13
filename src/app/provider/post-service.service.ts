import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://dev.matiivilla.cl/duoc/location';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/region`);
  }

  getCommunes(regionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comuna/${regionId}`);
  }
}
