import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {CartitemComponent} from '../cartitem/cartitem.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

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
  total: number = 0;
  @Input() cartTotal!: number;
  @Input() cartItems!: Product[];
  @Output() cartItemDeleted = new EventEmitter<{
    productId: number
  }>();
  @Output() cartItemChanged = new EventEmitter<{
    productId: number
  }>();

  onCartItemDeleted(productData:{productId: number}) {
    this.cartItemDeleted.emit({
      productId: productData.productId
    });
  }

  onCartItemChanged(productData:{productId: number}) {
    this.cartItemChanged.emit({
      productId: productData.productId
    });
  }

  constructor() {
  }

  ngOnInit() {
  }

}
