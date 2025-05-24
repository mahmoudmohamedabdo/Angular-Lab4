import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localStorageKey = 'products';
  private products: Product[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const data = localStorage.getItem(this.localStorageKey);
    this.products = data ? JSON.parse(data) : [];
  }

  private saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.products));
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.saveToStorage();
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveToStorage();
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToStorage();
  }

  filterProducts(price: number, type: string): Product[] {
    return this.products.filter(p =>
      (price ? p.price == price : true) &&
      (type ? p.type.toLowerCase().includes(type.toLowerCase()) : true)
    );
  }
}
