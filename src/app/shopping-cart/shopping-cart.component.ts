import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CartitemComponent } from '../cartitem/cartitem.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  imports: [
    CurrencyPipe,
    NgForOf,
    CartitemComponent,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard
  ],
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Product[] = [];
  cartTotal: number = 0;
  @Output() cartItemDeleted = new EventEmitter<{ productId: number }>();
  @Output() cartItemChanged = new EventEmitter<{ productId: number }>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log('cart service', this.cartService);
    this.getCartItems();
  }

  onCartItemDeleted(productData: { productId: number }) {
    this.cartItemDeleted.emit({
      productId: productData.productId
    });
  }

  onCartItemChanged(productData: { productId: number }) {
    this.cartItemChanged.emit({
      productId: productData.productId
    });
  }

  getCartItems() {
    this.cartItems = this.cartService.getItems();
    this.cartTotal = this.cartService.getCartTotal();
  }
}
