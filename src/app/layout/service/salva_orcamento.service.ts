import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalvaOrcamento {

  private apiUrl = 'https://www.abcdefghijklmnopqrstuvxyz123.com.br/api_abcdefghijklmnopqrstuvxyz123'; // 

  constructor(private http: HttpClient) { }
  
  salvarPedido(pedido: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + '/cadastro_pedido.php', pedido, { headers });
  };

  salvarPreco(orcamento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/cadastro_precificacao.php', orcamento);
  };

  salvarGrupo(grupo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/cadastro_grupo_produto.php', grupo);
  };

  salvarSubGrupo(grupo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/cadastro_subgrupo_produto.php', grupo);
  };
}
