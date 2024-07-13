export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  stock: number;
  minimumOrderQuantity: number;
}

export interface ProductFilter {
  page: number;
  pageSize: number;
  productName?: string;
}

export interface PageableProducts {
  products: Product[];
  total: number;
}
