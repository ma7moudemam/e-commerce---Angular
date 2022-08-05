import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartProducts:any[] = [];
  totalPrice:any = 0;
  success: boolean=false;
  constructor(private cartService:CartsService) { }

  ngOnInit(): void {
    this.getCartProducts();   
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    } 
    this.getCartTotal();
  }

  getCartTotal(){
    this.totalPrice = 0;
    this.cartProducts.forEach(product => {
      this.totalPrice += (product.item.price * product.quentity);
    });
    this.totalPrice = this.totalPrice.toFixed(2);
  }

  decreaseAmount(index:number){
    this.cartProducts[index].quentity--;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  increaseAmount(index:number){
    this.cartProducts[index].quentity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  detectChange(){
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); 
    this.getCartTotal();
  }

  deleteProduct(index:number){
    this.cartProducts.splice(this.cartProducts.indexOf(index), 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  clearCart(){
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  addCart(){
    let products = this.cartProducts.map(product => {
      return {
        item: product.item.id,
        quentity: product.quentity
      }
    }
    );
    let Model = {
      userId:5,
      date:new Date(),
      products:[
        products
      ]
    }
    this.cartService.createNewCart(Model).subscribe(res=>{
      this.success = true;
      this.clearCart();
    }
    )
  }

}
