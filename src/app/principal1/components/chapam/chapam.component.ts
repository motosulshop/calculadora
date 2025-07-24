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

    this.apiService.getProdutos().subscribe(
      dados => this.products = dados,
      erro => console.error('Erro ao buscar produtos', erro)      
    );
    console.log(this.products)
    
  }

}
