// src/app/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {MatToolbar} from '@angular/material/toolbar';
import {MatFormField, MatError, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle, MatCardSubtitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatToolbar, MatFormField, MatInput, MatCard, MatCardHeader, MatCardContent, MatIcon, MatIconButton, MatCardImage, MatButton, MatError, MatLabel, MatCardTitle, MatCardSubtitle],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  checkoutForm: FormGroup;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)],
      ],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    const cart = this.cartService.getItems();
    this.cartItems = [];

    cart.forEach(([productId, quantity]) => {
      this.productService.getProduct(productId).subscribe((product) => {
        this.cartItems.push({ product, quantity });
        this.total += product.price * quantity;
      });
    });
  }

  increaseQuantity(productId: string): void {
    this.cartService.addItem(String(productId));
    this.updateCart();
  }

  decreaseQuantity(productId: string): void {
    this.cartService.decreaseItem(String(productId));
    this.updateCart();
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

  totalCost(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      // Handle successful form submission
      console.log('Form Submitted', this.checkoutForm.value);
      // Clear cart and redirect to home
      this.cartService.clearCart();
      this.cartItems = [];
      this.total = 0;
      alert('Checkout complete. Thank you for your purchase!');

      this.router.navigate(['/']);
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
      alert('Form data is invalid');
    }
  }

  checkout(): void {
    // Placeholder for potential checkout logic
  }
}
