import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  id:any;
  data:any;
  loading:boolean = false;
  constructor(private route:ActivatedRoute , private productService:ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
   this.getProduct();
  }

  getProduct(){
    this.loading = true;
    this.productService.getProductById(this.id).subscribe(data=>{
      this.data = data;
      setTimeout(()=>{
        this.loading = false;
      },1000);
      
    }
    ,error=>{
      console.log(error.message);
    }
    );
  }

}
