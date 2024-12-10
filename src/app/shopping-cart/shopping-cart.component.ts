// shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import {
  MatCell, MatCellDef,
  MatHeaderCell, MatHeaderCellDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  imports: [
    NgIf,
    MatHeaderCell,
    MatRow,
    MatCell,
    MatIconButton,
    MatIcon,
    MatButton,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef
  ],
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total', 'actions'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    const cart = this.cartService.getItems();
    this.cartItems = [];

    cart.forEach(([productId, quantity]) => {
      this.productService.getProduct(productId).subscribe((product) => {
        this.cartItems.push({ product, quantity });
      });
    });
  }

  increaseQuantity(productId: string): void {
    this.cartService.addItem(productId);
    this.updateCart();
  }

  decreaseQuantity(productId: string): void {
    this.cartService.decreaseItem(productId);
    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeItem(productId);
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
  }

  get items(): any[] {
    return this.cartService.getItems();
  }

  totalCost(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  hasItems(): boolean {
    return this.cartItems.length > 0;
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }

  private updateCart(): void {
    const cart = this.cartService.getItems();
    this.cartItems = [];
    cart.forEach(([productId, quantity]) => {
      this.productService.getProduct(productId).subscribe((product) => {
        this.cartItems.push({ product, quantity });
      });
    });
  }
}
