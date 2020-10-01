import { isPlatformWorkerApp } from '@angular/common';
import { Injectable } from '@angular/core';
import Products from '../../pos.products.json';

export interface ProductInfo {
  Product: string;
  Price: number;
  Quantity: number;
  Total: number;
}

@Injectable({
  providedIn: 'root'
})

export class BillingService {

  cartItems: { [key: string]: ProductInfo } = {};

  subTotal: string = "0.000 INR";
  vatTax: string = "N/A";
  discount: string = "N/A";
  total: string = "0.000 INR";
  items: string = "0 Items";
  taxValue: string = "0.000 INR";
  discountValue: string = "0.000 INR";

  constructor() {
  }

  getProducts() {
    return Products;
  }

  populateCartItems(item: any) {
    if (this.cartItems.hasOwnProperty(item.name)) {
      this.cartItems[item.name].Quantity++;
      this.cartItems[item.name].Total = item.price * this.cartItems[item.name].Quantity;
    }
    else {
      this.cartItems[item.name] = {
        Product: item.name,
        Price: parseFloat(item.price),
        Quantity: 1,
        Total: parseFloat(item.price)
      };
    }
  }

  calculateBill() {
    let subtotal = 0;
    let overallquantity = 0;

    this.vatTax = (Object.keys(this.cartItems).length == 0) ? "N/A" : "10%";
    this.discount = (Object.keys(this.cartItems).length == 0) ? "N/A" : "10%";

    for (let item in this.cartItems) {
      subtotal += this.cartItems[item].Total;
      overallquantity += this.cartItems[item].Quantity;
    }

    let taxAmount = (subtotal / 10);
    let discountAmount = (subtotal / 10);

    this.subTotal = `${subtotal.toFixed(3)} INR`;
    this.items = `${overallquantity} Items`;
    this.taxValue = `${taxAmount.toFixed(3)} INR`;
    this.discountValue = `${discountAmount.toFixed(3)} INR`;
    this.total = `${(subtotal + taxAmount - discountAmount).toFixed(3)} INR`;
  }

  resetAllData() {
    this.cartItems = {};
    this.subTotal = "0.000 INR";
    this.vatTax = "N/A";
    this.discount = "N/A";
    this.total = "0.000 INR";
    this.items = "0 Items";
    this.taxValue = "0.000 INR";
    this.discountValue = "0.000 INR";
  }
}
