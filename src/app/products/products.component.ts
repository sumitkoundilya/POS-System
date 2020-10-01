import { BillingService } from './../services/billing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  selectedProduct: any;

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.products = this.billingService.getProducts();
  }

  addItems(product: any) {
    this.billingService.populateCartItems(product);
    this.billingService.calculateBill();
  }

  getColour(product: any) {
    switch (product.name) {
      case 'sweater':
      case 'chilli hot pizza': return '#45DB5E'

      case 'nivea pocket':
        case 'nivea pocket bleu': return '#0B2635'
    }
  }

}
