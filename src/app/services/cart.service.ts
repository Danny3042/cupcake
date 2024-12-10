// src/service/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = new BehaviorSubject<Map<string, number>>(this.loadCart());

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private loadCart(): Map<string, number> {
    if (this.isLocalStorageAvailable()) {
      const cart = localStorage.getItem('cart');
      return cart ? new Map(JSON.parse(cart)) : new Map();
    }
    return new Map();
  }

  private saveCart(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(
        'cart',
        JSON.stringify(Array.from(this.items.getValue().entries()))
      );
    }
  }

  addItem(productId: string): void {
    const currentItems = this.items.getValue();
    if (currentItems.has(String(productId))) {
      currentItems.set(String(productId), currentItems.get(String(productId))! + 1);
    } else {
      currentItems.set(String(productId), 1);
    }
    this.items.next(currentItems);
    this.saveCart();
  }

  decreaseItem(productId: string): void {
    const currentItems = this.items.getValue();
    if (currentItems.has(String(productId)) && currentItems.get(String(productId))! > 1) {
      currentItems.set(String(productId), currentItems.get(String(productId))! - 1);
    }
    this.items.next(currentItems);
    this.saveCart();
  }

  getCartItemCount(): number {
    let count = 0;
    this.items.getValue().forEach((quantity) => (count += quantity));
    return count;
  }

  getCartItemsObservable() {
    return this.items.asObservable();
  }

  getItems(): [string, number][] {
    return Array.from(this.items.getValue().entries());
  }

  removeItem(productId: number): void {
    const currentItems = this.items.getValue();
    if (currentItems.has(String(productId))) {
      currentItems.delete(String(productId));
    }
    this.items.next(currentItems);
    this.saveCart();
  }

  clearCart(): void {
    this.items.next(new Map());
    this.saveCart();
  }

  isInCart(productId: string): boolean {
    return this.items.getValue().has(productId);
  }
}
