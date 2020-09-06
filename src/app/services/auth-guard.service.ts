import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public router: Router, private authService: AuthService) {}

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> {
    return this.authService.authd.pipe(map( (e) => {
      !e ? this.router.navigate(['/login']) : e
      return e
    }))
  }

}