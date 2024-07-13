import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Product } from '../../models/Product';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, skip, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrl: './quantity-control.component.css',
})
export class QuantityControlComponent implements OnInit, OnChanges, OnDestroy {
  @Input() quantity: number;
  @Input() product: Product;
  @Output() removeFromCartClicked = new EventEmitter();
  @Output() quantityChanged = new EventEmitter<number>();

  quantityControl = new FormControl(1, [Validators.required]);
  destroyed$ = new Subject<boolean>();

  ngOnInit(): void {
    this.quantityControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroyed$))
      .subscribe((quantity: number) => {
        this.quantityControl.valid
          ? this.cartService.onQuantityChanged(this.product, quantity)
          : this.quantityControl.setValue(
              Math.max(this.product.minimumOrderQuantity, this.product.stock)
            );
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.quantityControl.setValue(this.quantity, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onRemoveFromCart(): void {
    this.removeFromCartClicked.emit();
  }

  onDecreaseQuantity(): void {
    this.quantityControl.value > this.product.minimumOrderQuantity
      ? this.quantityControl.setValue(this.quantityControl.value - 1)
      : alert(
          `Minimim order quantity is ${this.product.minimumOrderQuantity}!`
        );
  }

  onIncreaseQuantity(): void {
    this.quantityControl.value > this.product.stock
      ? alert(`Only ${this.product.stock} in stock!`)
      : this.quantityControl.setValue(this.quantityControl.value + 1);
  }

  constructor(private cartService: CartService) {}
}
