import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ApichapamService } from '../../service/apichapam.service';

@Component({
  selector: 'app-chapam',
  templateUrl: './chapam.component.html',
  styleUrls: ['./chapam.component.scss']
})
export class ChapamComponent implements OnInit {

  products!: any[];

  constructor(private productService: ApichapamService) { }

 ngOnInit() {
  this.productService.getProdutos().subscribe((data) => {
    this.products = data.success.response.data.slice(0, 5);
    console.log(this.products);
  });
}


  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };
}