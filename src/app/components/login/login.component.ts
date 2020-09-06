import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginUser } from 'src/app/actions/auth.actions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent {
  username: string = undefined
  password: string = undefined
  loginButtonText = "Login";
  public loggedIn: Observable<boolean>;

  constructor(public router: Router, private authService: AuthService, private store: Store<{ authStore }>) {
    this.store.subscribe(v => {
      this.loggedIn = authService.authd;
    })
  }

  onConfirmClick(): void {
    this.username ? this.store.dispatch(loginUser({ username: this.username, password: this.password })) : alert("Please validate your information")
    if (this.loggedIn.pipe(
      take(1),
    )) this.router.navigate(['/notes']);
  }

}
