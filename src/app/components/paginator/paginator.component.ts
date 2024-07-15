import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent implements OnInit {
  @Input() page: number;
  @Input() pageSize: number;
  total: number = 0;

  ngOnInit(): void {
    this.productService.total.subscribe((total) => (this.total = total));
  }

  changePage(page: number) {
    this.productService.changePage(page);
  }

  changePageSize(pageSize: string) {
    this.productService.changePageSize(pageSize);
  }

  constructor(public productService: ProductService) {}
}
