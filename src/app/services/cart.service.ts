// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  addToCart(product: Product) {
    this.loadingSubject.next(true);
    setTimeout(() => {
      this.items.push(product);
      this.loadingSubject.next(false);
      console.log('Product added to cart:', product);
    }, 1000);

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
