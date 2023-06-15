import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GET_WORLD } from 'src/app/Graphqlrequests';
import { WebserviceService } from 'src/app/webservice.service';
import { Palier, World } from 'src/app/world';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
server = '';


  constructor(@Inject(MAT_DIALOG_DATA) public world: World, private service: WebserviceService) {
    this.server = service.server;
    console.log(this.world);
  }
  

  hireManager(manager: Palier) {
    if (this.world.money >= manager.seuil) {
      this.world.money -= manager.seuil;
      manager.unlocked = true;
      this.world.products[manager.idcible-1].managerUnlocked = true;
    }
  }
}


