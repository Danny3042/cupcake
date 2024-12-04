// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  addToCart(product: Product) {
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    this.items.push(productWithQuantity);
    console.log('product added to cart', productWithQuantity);
    console.log('current items', this.items);
  }

  getItems(): Product[] {
    console.log('items', this.items);
    return this.items;
  }

  getCartTotal(): number {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
