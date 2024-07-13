import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() addToCartClicked = new EventEmitter<Product>();
  @Output() cardClicked = new EventEmitter<number>();
  @Output() removeFromCartClicked = new EventEmitter<Product>();
  @Output() quantityChanged = new EventEmitter<{
    product: Product;
    quantity: number;
  }>();

  onAddToCart(product: Product): void {
    this.addToCartClicked.emit(product);
  }

  onRemoveFromCart(product: Product): void {
    this.removeFromCartClicked.emit(product);
  }

  onQuantityChange(event: any): void {
    this.quantityChanged.emit(event);
  }

  onCardClicked(productId: number): void {
    this.cardClicked.emit(productId);
  }
}
