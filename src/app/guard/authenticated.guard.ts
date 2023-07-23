import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, ObservableInput, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.authenticated().pipe(
      map(e => {
        if (e == true) {
          return true;
        }
        else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((err: any, caught: Observable<boolean>): ObservableInput<any> => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

}