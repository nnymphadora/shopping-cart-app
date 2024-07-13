import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { PageableProducts, Product, ProductFilter } from '../models/Product';
import { DetailedProduct } from '../models/DetailesProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';
  private searchResultsSubject = new BehaviorSubject<any[]>([]);

  total = new BehaviorSubject<number>(0);
  filters = new BehaviorSubject<ProductFilter>({
    page: 0,
    pageSize: 5,
  });

  get searchResults$(): Observable<any[]> {
    return this.searchResultsSubject.asObservable();
  }

  getProducts(filters: ProductFilter): Observable<Product[]> {
    let params = new HttpParams();
    params = params.set('limit', filters.pageSize);
    params = params.set('skip', filters.pageSize * (filters.page - 1));

    return this.http
      .get<PageableProducts>(this.apiUrl, { params: params })
      .pipe(
        tap((response) => this.total.next(response.total)),
        map((response) => this.mapProducts(response))
      );
  }

  searchProductsByName(filters: ProductFilter) {
    let params = new HttpParams();
    params = params.set('limit', filters.pageSize);
    params = params.set('skip', filters.pageSize * (filters.page - 1));

    if (filters.productName) {
      params = params.set('q', filters.productName);
    }

    return this.http
      .get<PageableProducts>(`${this.apiUrl}/search`, { params })
      .pipe(
        tap((response) => this.total.next(response.total)),
        map((response) => this.mapProducts(response))
      );
  }

  mapProducts(response: PageableProducts): Product[] {
    if (!response.products) return [];

    return response.products.map((product: any) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      img: product.thumbnail,
      stock: product.stock,
      minimumOrderQuantity: product.minimumOrderQuantity,
    }));
  }

  getProductById(productId: number): Observable<DetailedProduct> {
    return this.http
      .get(`${this.apiUrl}/${productId}`)
      .pipe(map((response) => this.mapDetailedProduct(response)));
  }

  changePage(page: number) {
    this.filters.next({
      ...this.filters.value,
      page: page,
    });
  }

  searchQueryChanged(searchQuery: string) {
    this.filters.next({
      page: 0,
      pageSize: this.filters.value.pageSize,
      productName: searchQuery,
    });
  }

  mapDetailedProduct(response: any): DetailedProduct {
    return {
      id: response.id,
      name: response.title,
      price: response.price,
      img: response.thumbnail,
      stock: response.stock,
      minimumOrderQuantity: response.minimumOrderQuantity,
      description: response.description,
      category: response.category,
      discountPercentage: response.discountPercentage,
      rating: response.rating,
      tags: response.tags,
      brand: response.brand,
      sku: response.sku,
      weight: response.weight,
      dimensions: response.dimensions,
      warrantyInformation: response.warrantyInformation,
      shippingInformation: response.shippingInformation,
      availabilityStatus: response.availabilityStatus,
      reviews: response.reviews,
      returnPolicy: response.returnPolicy,
      meta: response.meta,
      images: response.images,
      thumbnail: response.thumbnail,
    };
  }

  constructor(private http: HttpClient) {}
}
