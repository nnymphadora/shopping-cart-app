import { Injectable } from '@angular/core';
import { DetailedProduct } from '../models/DetailesProduct';
import { DetailedProductComponent } from '../components/detailed-product/detailed-product.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './product.service';
import { CartComponent } from '../components/cart/cart.component';
import { LoadingService } from './loading-service.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef: NgbModalRef;

  openDetailedProductModal(productId: number): void {
    this.modalRef = this.modalService.open(DetailedProductComponent, {
      centered: true,
      scrollable: true,
      size: 'md',
    });

    this.loadingService.setLoader(true);
    this.productService
      .getProductById(productId)
      .subscribe((product: DetailedProduct) => {
        this.modalRef.componentInstance.detailedProduct = product;
        this.loadingService.setLoader(false);
      });
  }

  openCartModal() {
    this.modalRef = this.modalService.open(CartComponent, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });

    this.modalRef.componentInstance.isModal = true;
  }

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private loadingService: LoadingService
  ) {}
}
