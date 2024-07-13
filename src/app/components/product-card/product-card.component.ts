import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/Product';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/Cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCartClicked = new EventEmitter<Product>();
  @Output() cardClicked = new EventEmitter<number>();
  @Output() removeFromCartClicked = new EventEmitter<Product>();
  @Output() quantityChanged = new EventEmitter<CartItem>();

  inCart: boolean = false;
  isAvailableToOrder: boolean = true;

  quantity: number;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  onQuantityChanged(quantity: number) {
    const cartItem: CartItem = {
      product: this.product,
      quantity: quantity,
    };
    this.quantityChanged.emit(cartItem);
  }

  ngOnInit(): void {
    this.isAvailableToOrder =
      this.product.stock >= this.product.minimumOrderQuantity;

    this.cartService.cart$
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((cart) => {
          const cartItem: CartItem = cart.items.find(
            (item) => item.product.id === this.product.id
          );

          if (cartItem) {
            this.inCart = true;
            return of(cartItem.quantity);
          } else {
            this.inCart = false;
            return of(0);
          }
        })
      )
      .subscribe((quantity: number) => (this.quantity = quantity));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onAddToCart(): void {
    this.addToCartClicked.emit(this.product);
  }

  onRemoveFromCart(): void {
    this.removeFromCartClicked.emit(this.product);
  }

  onCardClicked(): void {
    this.cardClicked.emit(this.product.id);
  }

  constructor(private cartService: CartService) {}
}
