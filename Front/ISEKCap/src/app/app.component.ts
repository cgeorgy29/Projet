import { Component, Input } from '@angular/core';
import { World, Palier, Product } from './world';
import { WebserviceService } from './webservice.service';
import { ComponentType } from '@angular/cdk/portal';
import { ManagerComponent } from './modal/manager/manager.component';
import { UpgradeComponent } from './modal/upgrade/upgrade.component';
import { AngelComponent } from './modal/angel/angel.component';
import { UnlockComponent } from './modal/unlock/unlock.component';
import{MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  server =''
  title = 'ISEKCap';
  world: World = new World(); 
  qtmulti = '1x';
  username =''

constructor(private service: WebserviceService, private dialog: MatDialog) {
  this.service.setuser(localStorage.getItem("username")!); 
   service.getWorld().then( 
    world => { 
      this.world = world.data.getWorld; 
    }); 
    this.server = service.server; 
}


ngAfterViewInit(){
    this.verifyUsername();
  }

//bouton multiplicateur de quantité
BTNmulti() {
  let bt = document.getElementById("btnmulti")!.innerHTML;
  //console.log(bt);
  switch(bt) {
    case 'x1':
      this.qtmulti = 'x10';
      document.getElementById("btnmulti")!.innerHTML = "x10";
      break;
    case 'x10':
      this.qtmulti = 'x100';
      document.getElementById("btnmulti")!.innerHTML = 'x100';
      break;
    case 'x100':
      this.qtmulti = 'xMax';
      document.getElementById("btnmulti")!.innerHTML = 'xMax';
      break;
    case 'xMax':
      this.qtmulti = 'x1';
      document.getElementById("btnmulti")!.innerHTML = 'x1';
      break;
  }
}

openModal(type: string) {
  let modal: ComponentType<any>;
  switch (type) {
    case 'manager':
      modal = ManagerComponent;
      break;
    case 'unlock':
      modal = UnlockComponent;
      break;
    case 'upgrade':
      modal = UpgradeComponent;
      break;
    case 'angel':
      modal = AngelComponent;
      break;
    default:
      throw 'mauvais modal';
  }
  this.dialog.open(modal, {
    panelClass: '',
    data: this.world
  });

}

onProductionDone(product: Product) {
    console.log("notifyProduction");
    this.world.money += product.revenu * product.quantite;
    this.world.score += product.revenu * product.quantite;
  }

  onBuy(nbachat: number) {
    console.log("notifyAchat");
    this.world.money -= nbachat;
  }

  onUsernameChanged(){
    let input = document.getElementById("InputID") as HTMLInputElement;
    if (this.username  == "" || this.username == null){
      localStorage.setItem("username", input.value);
      this.username = input.value;
      this.service.setuser(this.username);
      window.location.reload();
    }
    if (input.value != this.username){
      localStorage.setItem("username", input.value);
      this.username = input.value;
      this.service.setuser(this.username);
      window.location.reload();
      // console.log( this.username)
      // console.log(this.service.user)
    }


  }

  verifyUsername(){
    console.log("verifyUsername");
    let input = document.getElementById("InputID") as HTMLInputElement;
    if (localStorage.getItem("username") == null || localStorage.getItem("username") == ""){
        localStorage.setItem("username", "Ano"+ Math.floor(Math.random() * 1000));  
        this.username = localStorage.getItem("username")!;
        input.value = this.username;
    }
    else{
      this.username = localStorage.getItem("username")!;
      input.value = this.username;
    }
    this.service.setuser(this.username);
  }


}




