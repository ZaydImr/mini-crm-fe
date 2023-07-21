import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/JwtResponse';
import { environment } from 'src/environments/environment.development';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private tokenStrorageService: TokenStorageService) { }

  public login(username: string, password: string): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(environment.apiUrl + 'login', { username, password });
  }
  
  public authenticated(): Observable<boolean> {
    let user: JwtResponse | null = this.tokenStrorageService.getUserJwtResponse();
    let token: string | null = this.tokenStrorageService.getToken();

    return this.http.post<boolean>(`${environment.apiUrl}authenticated`, { username: user?.username, accessToken: token });
  }

  public logout(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
