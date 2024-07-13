import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { DetailedProduct } from '../../models/DetailesProduct';
import { ModalService } from '../../services/modal.service';
import { CartItem } from '../../models/Cart';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../services/loading-service.service';
import { Product, ProductFilter } from '../../models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedProduct: DetailedProduct;
  searchControl = new FormControl();
  page: number;
  pageSize: number;
  destroyed$ = new Subject<boolean>();

  ngOnInit(): void {
    this.productService.filters.next({
      pageSize: 5,
      page: 0,
      productName: null,
    });

    this.productService.filters
      .pipe(
        takeUntil(this.destroyed$),
        tap((filters: ProductFilter) => {
          this.page = filters.page;
          this.pageSize = filters.pageSize;
        }),
        switchMap((filters: ProductFilter) => {
          this.loadingService.setLoader(true);
          return filters.productName
            ? this.productService.searchProductsByName(filters)
            : this.productService.getProducts(filters);
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.loadingService.setLoader(false);
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroyed$))
      .subscribe((searchQuery) => {
        this.productService.searchQueryChanged(searchQuery);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onAddToCart(product: Product): void {
    this.cartService.addCartItem(product);
  }

  onRemoveFromCart(product: Product): void {
    this.cartService.removeFromCart(product.id);
  }

  onQuantityChange(event: CartItem): void {
    this.cartService.updateCartItem(event);
  }

  onCardClicked(productId: number) {
    this.modalService.openDetailedProductModal(productId);
  }

  constructor(
    public productService: ProductService,
    private cartService: CartService,
    private modalService: ModalService,
    private loadingService: LoadingService
  ) {}
}
