import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { CheckoutForm } from '../models/CheckoutForm';
import { take } from 'rxjs';
import { Payload } from '../models/Payload';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from './loading-service.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'https://dummyjson.com/http/200';

  checkout(checkoutForm: CheckoutForm) {
    const payload = this.createPayload(checkoutForm);

    this.loadingService.setLoader(true);
    this.http.post(this.apiUrl, payload).subscribe((result) => {
      this.cartService.clearCart();
      this.loadingService.setLoader(false);
      this.router.navigate(['/success']);
    });
  }

  createPayload(checkoutForm: CheckoutForm): Payload {
    let cart;

    this.cartService.cart$.pipe(take(1)).subscribe((cart) => (cart = cart));

    const payload: Payload = {
      checkoutForm,
      cart,
    };

    return payload;
  }

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private loadingService: LoadingService,
    private router: Router
  ) {}
}
