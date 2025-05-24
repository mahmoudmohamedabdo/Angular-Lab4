import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filterPrice: number | null = null;
  filterType: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getAllProducts();
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  viewProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  editProduct(id: number) {
    this.router.navigate(['/add-product'], { queryParams: { editId: id } });
  }

  deleteProduct(id: number) {
    if (confirm('you need delete product')) {
      this.productService.deleteProduct(id);
      this.loadProducts(); 
    }
  }

  filter() {
    if (this.filterPrice || this.filterType) {
      this.products = this.productService.filterProducts(
         this.filterPrice ?? 0,
        this.filterType
      );
    } else {
      this.loadProducts(); 
    }
  }

  clearFilters() {
    this.filterPrice = null;
    this.filterType = '';
    this.loadProducts();
  }
}