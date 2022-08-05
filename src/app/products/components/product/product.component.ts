import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() item!: Product;
  @Output() addItem = new EventEmitter()

  addBtn:boolean = false
  quentity:number =0;
  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.addItem.emit({item:this.item , quentity:this.quentity})
    this.addBtn = false;
  }
}
