import { Component } from '@angular/core';
import { LoadingService } from './services/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shopping-cart-app';

  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {}
}
