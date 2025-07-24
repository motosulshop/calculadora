import { Component } from '@angular/core';
import { ApichapamService } from '../../service/apichapam.service';

@Component({
  selector: 'app-chapam',
  templateUrl: './chapam.component.html',
  styleUrls: ['./chapam.component.scss']
})
export class ChapamComponent {

  products!: any[];

  constructor(private apiService: ApichapamService,) {

  }
  ngOnInit() {
    this.apiService.getProdutos().subscribe({
      next: dados => {
        this.products = dados;
        console.log(this.products);
      },
      error: erro => console.error('Erro ao buscar produtos', erro)
    });
  }

}
