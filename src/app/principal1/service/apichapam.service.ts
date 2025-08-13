import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApichapamService {

  private apiUrl = 'https://painel.chapam.com.br/api/v1/produtos?limit=100&page=1&order-field=sequencia&order-direction=DESC&filters[status]=1';
  private token = '175158674003z4ibk1x6spk3tzo5rgihkhs5';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
