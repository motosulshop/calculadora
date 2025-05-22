import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoLivreService {
  //private apiUrl = 'https://api.mercadolibre.com';

  private apiUrl = 'https://api.mercadolibre.com/users/test_user';
  private accessToken = 'clgJPFT5C6pGa5iB2iwH0fQuPPafE5mU';  // Obtenha seu access token

  constructor(private http: HttpClient) {}


}
