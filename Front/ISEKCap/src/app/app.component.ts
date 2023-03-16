import { Component } from '@angular/core';
import { World, Palier, Product } from './world';
import { WebserviceService } from './webservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISEKCap';
  world: World = new World(); 
constructor(private service: WebserviceService) { 
 
  service.getWorld().then( 
    world => { 
      this.world = world.data.getWorld; 
 
    }); 
} 
}

