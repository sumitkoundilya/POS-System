import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopUpService } from '../services/pop-up.service';
import { BillingService } from '../services/billing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  saleNumber: string;
  date: string;
  cartItems: any;

  constructor(public billingService: BillingService, private popUpService: PopUpService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.saleNumber = this.getSaleNo();
    this.date = this.getDateAndTime();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  reduceQuantity(item: any) {
    if (item.value.Quantity == 1) {
      delete this.billingService.cartItems[item.key];
    }
    else {
      this.billingService.cartItems[item.key].Quantity--;
      this.billingService.cartItems[item.key].Total =
        this.billingService.cartItems[item.key].Quantity * this.billingService.cartItems[item.key].Price;
    }

    this.billingService.calculateBill();
  }

  addQuantity(item: any) {
    this.billingService.cartItems[item.key].Quantity++;
    this.billingService.cartItems[item.key].Total =
      this.billingService.cartItems[item.key].Quantity * this.billingService.cartItems[item.key].Price;

    this.billingService.calculateBill();

  }

  removeItem(item: any) {
    delete this.billingService.cartItems[item.key];
    this.billingService.calculateBill();
  }

  reset() {
    this.billingService.resetAllData();
  }

  isCartEmpty(): boolean {
    return Object.keys(this.billingService.cartItems).length == 0;
  }

  openModal(id: string) {
    this.popUpService.open(id);
  }

  closeModal(id: string) {
    this.popUpService.close(id);
  }

  getSaleNo() {
    return (Math.random() * (9999 - 1000) + 1000).toFixed(0);
  }

  getDateAndTime() {
    return new Date().toLocaleString();
  }
}
