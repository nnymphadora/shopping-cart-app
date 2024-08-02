import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/Cart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private emptyCart: Cart = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
  private cartSubject = new BehaviorSubject<Cart>(this.emptyCart);
  cart$ = this.cartSubject.asObservable();

  updateCartItem(cartItem: CartItem): void {
    const items = this.cartSubject.value.items;
    const existingItem = items.find(
      (item) => item.product.id === cartItem.product.id
    );
    existingItem.quantity = cartItem.quantity;
    if (existingItem.quantity === 0) {
      this.removeFromCart(existingItem.product.id);
    }

    this.updateCartSubject(items);
  }

  addCartItem(product: Product): void {
    const newItemsArray = this.createNewItemsArray(product);

    this.updateCartSubject(newItemsArray);
  }

  updateCartSubject(items: CartItem[]) {
    this.cartSubject.next({
      items: items,
      totalItems: this.getTotalItems(items),
      totalPrice: this.getTotalPrice(items),
    });
  }

  createNewCartItem(product: Product): CartItem {
    const newCartItem: CartItem = {
      product,
      quantity: product.minimumOrderQuantity,
    };

    return newCartItem;
  }

  createNewItemsArray(product: Product) {
    const newCartItem = this.createNewCartItem(product);

    return [...this.cartSubject.value.items, newCartItem];
  }

  getTotalItems(newItemsArray: CartItem[]) {
    return newItemsArray.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(newItemsArray: CartItem[]) {
    return newItemsArray.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  removeFromCart(productId: number) {
    let filteredItems = this.cartSubject.value.items.filter(
      (item) => item.product.id !== productId
    );

    this.updateCartSubject(filteredItems);
  }

  onQuantityChanged(product: Product, quantity: number) {
    const cartItem: CartItem = {
      product: product,
      quantity: quantity,
    };
    this.updateCartItem(cartItem);
  }

  clearCart() {
    this.cartSubject.next(this.emptyCart);
  }

  constructor() {}
}
