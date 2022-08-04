import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() item: any = {}
  @Output() addItem = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.addItem.emit(this.item)
  }
}
