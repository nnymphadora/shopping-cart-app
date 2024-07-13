import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cart, CartItem } from '../../models/Cart';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], totalItems: 0, totalPrice: 0 };
  isModal: boolean = false;
  activeModal = inject(NgbActiveModal);
  @Output() removeFromCartClicked = new EventEmitter<Product>();
  @Output() quantityChanged = new EventEmitter<CartItem>();

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => (this.cart = cart));
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
  }

  onProceedToCheckout() {
    this.router.navigate(['/checkout']);
    this.onCloseModal();
  }

  onClearCart(): void {
    this.cartService.clearCart();
    this.onCloseModal();
    this.router.navigate(['/home']);
  }

  onCloseModal() {
    this.activeModal.dismiss('Cross click');
  }

  constructor(private cartService: CartService, private router: Router) {}
}
