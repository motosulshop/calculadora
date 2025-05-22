import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    private apiUrl = 'https://www.abcdefghijklmnopqrstuvxyz123.com.br/api_abcdefghijklmnopqrstuvxyz123';


    getVendasReposicao() {
        return this.http.get<any>(`${this.apiUrl}/lista_vendas_reposicao.php`)
    }

    getTarefasCrm() {
        return this.http.get<any>(`${this.apiUrl}/lista_tarefas_crm.php`)
    }

    deleteVendasReposicao(id: number): Observable<any> {
        const url = `${this.apiUrl}/deletar_vendas_reposicao.php`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
            headers: headers,
            body: { id: id },
        };

        return this.http.delete(url, options);
    }

    deleteTarefasCrm(id: number): Observable<any> {
        const url = `${this.apiUrl}/deletar_tarefas_crm.php`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
            headers: headers,
            body: { id: id },
        };

        return this.http.delete(url, options);
    }


    getProductsSmall() {
        return this.http.get<any>('assets/principal1/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/principal1/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/principal1/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/principal1/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
