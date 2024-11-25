import { Injectable} from '@angular/core';
import { Product} from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Cupcake',
      price: 2.99,
      description: 'A cupcake is a small cake designed to serve one person, which may be baked in a small thin paper or aluminum cup.',
      imageUrl: 'https://www.publicdomainpictures.net/pictures/30000/velka/plain-cupcake.jpg'
    },
    {
      id: 2,
      name: 'Donut',
      price: 1.99,
      description: 'A doughnut or donut is a type of fried dough confection or dessert food.',
      imageUrl: 'https://www.publicdomainpictures.net/pictures/220000/velka/donut.jpg' },
    ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find(product => product.id === productId);
  }
}
