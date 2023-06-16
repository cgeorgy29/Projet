import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { World, Product } from '../world';
import { WebserviceService } from '../webservice.service';
import { MyProgressBarComponent, Orientation } from '../my-progress-bar/my-progress-bar.component';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  product = new Product();
  server = '';
  run = false;
  auto = false;
  horizontal = Orientation.horizontal;
  lastupdate = Date.now();
  nbProd = 0;
  _qtmulti!: string; 
  _Wmoney = 0.0;
  coutReel : number = this.product.cout;
  qteAchat = 1;
  ngOnInit() {
    setInterval(() => {
      //console.log("tick");
      this.calcScore();
      this.calcMaxCanBuy();
    },50);
    }
  @Input()
   set prod(value: Product) {
      this.product = value;
  }
  @Input() 
  set qtmulti(value: string) { 
    this._qtmulti = value; 
    if (this._qtmulti && this.product) this.calcMaxCanBuy(); 
  } 

  @Input()
  set Wmoney(value: number) {
    this._Wmoney = value;
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyAchat = new EventEmitter<number>();

  constructor(service: WebserviceService) {
    this.server = service.server;
  }


  calcScore() {
    var now = Date.now();
    var delta = now - this.lastupdate;
    this.lastupdate = now;
    
    if(this.product.timeleft > 0) {
      this.product.timeleft -= delta;
      if(this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.nbProd += this.product.revenu * this.product.quantite;
        //console.log("nbProd = " +this.product.name + "  " + this.nbProd);
        this.notifyProduction.emit(this.product);
        if (this.auto) this.startFabrication();
        }
    }  
    if (this.product.quantite > 0 && this.product.managerUnlocked && !this.run) {
      this.auto = true;
      this.run = true;
      this.product.timeleft = this.product.vitesse;
      
    }  
    
  }

  calcMaxCanBuy() {
    let c = this.product.croissance;
    let x0 = this.product.cout;
    this.coutReel  = this.product.cout;

    switch(this._qtmulti) {
      case 'x1':
        this.coutReel = x0;
        this.qteAchat = 1;
        break;
      case 'x10':
        this.coutReel = x0 * (1 - Math.pow(c,10))/(1-c);
        this.qteAchat = 10;
        break;
      case 'x100':
        this.coutReel = x0 * (1 - Math.pow(c,100))/(1-c);
        this.qteAchat = 100;
        break;
      case 'xMax':
        if (this.coutReel > this._Wmoney) break;
        else {
          let n = Math.floor(Math.log(1 - (this._Wmoney * (1 - c) / x0)) / Math.log(c));
          this.qteAchat = n;
          this.coutReel = x0 * (1 - Math.pow(c,n))/(1-c);
        } 
       break;
    }  
  }
  
  buyProduct() {
    if (this._Wmoney >= this.coutReel) {
      this._Wmoney -= this.coutReel;
      this.product.quantite += this.qteAchat;
      this.notifyAchat.emit(this.coutReel);
      this.product.cout = this.product.cout * Math.pow(this.product.croissance,this.qteAchat);
      this.calcMaxCanBuy();
    }
  }

  startFabrication() { 
    if (this.product.quantite>0){
      //console.log("startFabrication");
      this.product.timeleft = this.product.vitesse;
      this.run = true;
      if (!this.auto){
        setTimeout(() => {
          this.run = false;
        },this.product.vitesse);
      }
    }

  }
}


