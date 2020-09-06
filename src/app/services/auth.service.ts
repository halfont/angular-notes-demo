import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authd: Observable<boolean>;

  constructor(private store: Store<any>) { 
    this.authd = this.store.select(v =>  {
      let exp = v.authStore.loggedIn.sessionExp 
      return exp >= Date.now()
    })
  }
}

