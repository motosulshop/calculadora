import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://www.abcdefghijklmnopqrstuvxyz123.com.br/api_abcdefghijklmnopqrstuvxyz123';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(user: any): Observable<any> {
    const data = {
      email: user.email,
      fone: user.fone,
      firstname: user.firstname,
      keyuser: user.keyuser,
      cpfcnpj: user.cpfcnpj,
      lastname: user.lastname,
      password: user.password,
      tipo_usuario: user.tipo_usuario.value,
      status: user.status.value,
      username: user.username
    }
    console.log(data)
    return this.http.post<any>(`${this.apiUrl}/cadastro_usuario_service.php`, data);
  }

  cadastrarVendasReposicao(data: any): Observable<any> {
    const dados = { data }    
    console.log(dados)
    return this.http.post<any>(`${this.apiUrl}/cadastro_vendas_reposicao.php`, dados);
  }

  cadastrarAtividadeCrm(data: any): Observable<any> {
    const dados = { data }    
    console.log(dados)
    return this.http.post<any>(`${this.apiUrl}/cadastro_tarefa_crm.php`, dados);
  }
  
  atualizarVendasReposicao(data: any, idP: any): Observable<any> {
   // const dados = { data }
    const dados = { 
      id_principal: idP, // Inclui idP no corpo
      data: data // Inclui o objeto data
    };
    return this.http.put<any>(`${this.apiUrl}/update_vendas_reposicao.php`, dados);
  }

  getClientes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista_clientes.php`);
  }

  getAtividadeCrm(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista_tarefas_crm.php`);
  }

  getVendedores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista_vendedores.php`);
  }

  getGrupos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista_grupo_produto.php`);
  }
  
  getSubGrupos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista_subgrupo_produto.php`);
  }
}
