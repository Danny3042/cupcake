import {Component, Input, OnInit, Output} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Product} from '../models/product.model';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cartitem',
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput
  ],
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.css'
})
export class CartitemComponent implements OnInit {
  @Input() cartItem!: Product;
  @Output() cartItemDeleted = new EventEmitter<{
    productId: number
  }>();
  @Output() cartItemChanged = new EventEmitter<{
    productId: number
  }>();

  onCartItemDeleted(event: Event) {
    const id = (event.target as HTMLElement).getAttribute('id');
    this.cartItemDeleted.emit({
      productId: Number(id)
    });
  }

  onCartItemChanged(event: Event) {
    const id = (event.target as HTMLElement).getAttribute('id');
    this.cartItemChanged.emit({
      productId: Number(id)
    });
  }

  constructor() {
  }

  ngOnInit() {

  }


}
