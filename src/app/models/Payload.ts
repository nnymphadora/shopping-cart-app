import { Cart } from './Cart';
import { CheckoutForm } from './CheckoutForm';

export interface Payload {
  checkoutForm: CheckoutForm;
  cart: Cart;
}
