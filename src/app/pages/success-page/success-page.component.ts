import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css',
})
export class SuccessPageComponent {
  onShopAgainClicked() {
    this.router.navigate(['/home']);
  }

  constructor(private router: Router) {}
}
