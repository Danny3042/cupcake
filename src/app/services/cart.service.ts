// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  addToCart(product: Product) {
    this.items.push(product);
    console.log("product added to cart", product);

  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }


  removeItem(product: Product): void {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getTotalAmount() {
    return this.items.reduce((total, product) => total + product.price, 0);
  }
}
