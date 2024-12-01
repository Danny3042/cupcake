import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ActivatedRoute, Route, Router, RouterOutlet} from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { products } from '../products';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'cupcake';
  isHandset$: Observable<boolean>;
  products = products;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    private router : Router,
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  addToCart(products: Product) {
    this.cartService.addToCart(products);
    window.alert('Your product has been added to the cart!');
    this.router.navigate(['/cart']);

  }

  loadCart(): void {
    this.products = this.cartService.getItems();
  }

  loadProducts(): void {
    this.products = products;
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  }
