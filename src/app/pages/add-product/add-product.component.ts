import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,          
   imports: [FormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    type: ''
  };

  isEdit: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('editId');
    if (id) {
      const found = this.productService.getProductById(+id);
      if (found) {
        this.product = { ...found };
        this.isEdit = true;
      }
    }
  }

  saveProduct() {
    if (!this.product.name || this.product.quantity <= 0 || this.product.price <= 0 || !this.product.type) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (this.isEdit) {
      this.productService.updateProduct(this.product);
    } else {
      const allProducts = this.productService.getAllProducts();
      const lastId = allProducts.length > 0 ? allProducts[allProducts.length - 1].id : 0;
      this.product.id = lastId + 1;
      this.productService.addProduct({ ...this.product });
    }

    this.router.navigate(['/products']);
  }
}
