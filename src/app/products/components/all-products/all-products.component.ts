import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {


  products:any[]=[];
  categories:any[]=[];
  loading:boolean = false;
  cartProducts:any[]=[];
  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts(){
    this.loading = true;
    this.service.getAllProducts().subscribe((res:any)=>{
      this.products = res;
      this.loading = false;
    } , error=>{
      console.log(error.message);
      this.loading = false;
    });
  }

  getAllCategories(){
    this.loading = true;
    this.service.getAllCategories().subscribe((res:any)=>{
     this.categories = res;
      this.loading = false;
     console.log(res)
    } , error=>{
      console.log(error.message);
      this.loading = false;
    } );
  }

  filterCategory(event:any){
    let category = event.target.value;
   
    (category == 'all') ? this.getAllProducts() : this.getProductsByCategory(category);
   
  }

  getProductsByCategory(category:string){
    this.loading = true;
    this.service.getProductsByCategory(category).subscribe((res:any)=>{
      this.products = res;
      this.loading = false;
    } , error=>{
      console.log(error.message);
      this.loading = false;
    } );
  }

  addToCart(product:any){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(p=>p.id == product.id);
      if(exist){
        alert('Product already added to cart');
      }
      else{
        this.cartProducts.push(product);
        localStorage.setItem('cart',JSON.stringify(this.cartProducts));
      }
     
    }
    else{
      this.cartProducts.push(product);
      localStorage.setItem('cart',JSON.stringify(this.cartProducts));
    }
   
  }

}

