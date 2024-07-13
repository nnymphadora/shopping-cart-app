import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  totalItems: number = 0;

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.totalItems = cart.totalItems;
    });
  }

  onCartClicked() {
    this.modalService.openCartModal();
  }

  onHomeClicked() {
    this.router.navigate(['/home']);
  }

  constructor(
    private router: Router,
    private modalService: ModalService,
    private cartService: CartService
  ) {}
}
