import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductService} from '../services/product.service';
import { Product} from '../models/product.model';
import {MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardActions,
    MatButton,
    MatCardImage
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(productId);
  }
}
