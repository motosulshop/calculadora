import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'https://www.abcdefghijklmnopqrstuvxyz123.com.br/api_abcdefghijklmnopqrstuvxyz123/listar_pedidos.php';

  constructor(private http: HttpClient) {}

  private productSubject = new BehaviorSubject<any | null>(null);
  product$ = this.productSubject.asObservable();

  setProduct(product: any) {
    this.productSubject.next(product);
  }

  getProduct(): any | null {
    return this.productSubject.getValue();
  }
  
  orcamentosabertosgeral(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  private pedidoSelecionado = new BehaviorSubject<any>(null);
  
  // Observable para o pedido selecionado
  pedidoSelecionado$ = this.pedidoSelecionado.asObservable();

  // Método para definir o pedido selecionado
  selecionarPedido(pedido: any) {
    this.pedidoSelecionado.next(pedido);
  }

 

}
