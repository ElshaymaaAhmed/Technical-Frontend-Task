import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  
  constructor(
    private _router:Router,
    private _auth:AuthService
  ) { }

  canActivate(
    route:ActivatedRouteSnapshot, 
    state:RouterStateSnapshot):boolean
    {
   
    if(!this._auth.isLogged){
      this._router.navigate(['/login']);
      return false
    }
    return true;
  }
}

