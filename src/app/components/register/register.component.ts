import { Component, OnInit } from '@angular/core';
import { User } from '../../models/auth.model';
import { Store } from '@ngrx/store';
import { addUser } from 'src/app/actions/auth.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent {
  user: User ;
  registerButtonText: string = "Register";
  public loggedIn: Observable<boolean>;

  constructor(
    public router: Router,
    private authService: AuthService,
    private store: Store<{ authStore }>) {
      this.user = { username: undefined, email: undefined, password: undefined }
      this.store.subscribe(v => {
        this.loggedIn = authService.authd;
      })
  }

  onConfirmClick(): void {
    this.user.username ? this.store.dispatch(addUser({ user: this.user })) : alert("Please validate your information")
    if (this.loggedIn.pipe(
      take(1),
    )) this.router.navigate(['/notes']);
  }

}
