import { Component, inject, Input } from '@angular/core';
import { DetailedProduct } from '../../models/DetailesProduct';
import { CartService } from '../../services/cart.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrl: './detailed-product.component.css',
  host: { '[style.overflow-y]': '"scroll"' },
})
export class DetailedProductComponent {
  activeModal = inject(NgbActiveModal);
  @Input() detailedProduct: DetailedProduct;
}
