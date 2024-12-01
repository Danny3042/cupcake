import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor() {
    this.loadItems();
  }

  private saveItems(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart-items', JSON.stringify(this.items));
    }
  }

  private loadItems(): void {
    if (typeof localStorage !== 'undefined') {
      const savedItems = localStorage.getItem('cart-items');
      if (savedItems) {
        this.items = JSON.parse(savedItems);
      }
    }
  }

  addToCart(product: Product): void {
    console.log("product added to cart", product);
    this.items.push(product);
    console.log("current items in cart: ", this.items);
    this.saveItems();
  }

  getItems(): Product[] {
    console.log("Getting items from cart: ", this.items);
    return this.items;
  }

  clearCart(): Product[] {
    this.items = [];
    this.saveItems();
    return this.items;
  }

  removeItem(product: Product): void {
    const index = this.items.indexOf(product);
    if (index > 0) {
      this.items.splice(index, 1);
      this.saveItems();
    }
  }

  getTotalAmount(): number {
    return this.items.reduce((total, product) => total + product.price, 0);
  }
}
