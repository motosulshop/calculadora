import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaProdutosService {


  private apiUrl = 'https://www.abcdefghijklmnopqrstuvxyz123.com.br/api_abcdefghijklmnopqrstuvxyz123';
  constructor(private http: HttpClient) { }

  getDados(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/tabela_sis.php');
  }

  listarProdutosNova(sku: any): Observable<any> {
    const params = { sku: sku }; 
    return this.http.get<any>(`${this.apiUrl}/lista_produto.php`, { params });
}

  listarProdutos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/lista_precificacao.php');
  }

  updateStatusPrecificacao(id: any, sku: string, status: string): Observable<any> {
    const body = {id, sku, status };
    return this.http.post<any>(this.apiUrl + '/update_status_precificacao.php', body);
  }


}
