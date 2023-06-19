import { Injectable } from '@angular/core';
import { createClient } from '@urql/core';
import {GET_WORLD} from './Graphqlrequests';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  server = 'http://localhost:4000';
  user ='';
  createClient() { 
    return createClient({ url: this.server + "/graphql", fetchOptions: () => { 
        return { 
          headers: {'x-user': this.user}, 
        }; 
      }, }); 
  }

  getWorld() { 
    return this.createClient().query(GET_WORLD, {}).toPromise(); 
}

  constructor() { }

  setuser(user: string) {
    this.user = user;
    //console.log(this.user);
  }
}
