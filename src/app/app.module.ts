import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbActiveModal,
  NgbCarouselModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { DetailedProductComponent } from './components/detailed-product/detailed-product.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CartComponent } from './components/cart/cart.component';
import { QuantityControlComponent } from './components/quantity-control/quantity-control.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductCardComponent,
    DetailedProductComponent,
    CarouselComponent,
    CartComponent,
    QuantityControlComponent,
    CheckoutPageComponent,
    SuccessPageComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbCarouselModule,
  ],
  providers: [
    HttpClient,
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
