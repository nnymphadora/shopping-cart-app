import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  checkoutForm: FormGroup;
  cartEmpty = true;

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[\p{L}\s]*$/u)]],
      adress: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.cartService.cart$.subscribe((cart) => {
      this.cartEmpty = cart.items?.length == 0;
    });

    this.cartEmpty;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.checkoutService.checkout(this.checkoutForm.getRawValue());
  }

  get phone() {
    return this.checkoutForm.get('phone');
  }

  get name() {
    return this.checkoutForm.get('name');
  }

  get email() {
    return this.checkoutForm.get('email');
  }
  get adress() {
    return this.checkoutForm.get('adress');
  }

  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private cartService: CartService
  ) {}
}
