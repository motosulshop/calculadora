import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApileadService {

  private apiUrl = 'http://localhost/teste/salvalead.php';

  constructor(private http: HttpClient) { }

  inserirLead(leadData: any): Observable<any> {
    console.log(leadData);
    return this.http.post<any>(this.apiUrl, leadData)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  private tratarErro(error: HttpErrorResponse) {
    console.error('Erro no envio do lead:', error);
    return throwError(() => new Error('Erro ao enviar os dados. Tente novamente mais tarde.'));
  }
}
