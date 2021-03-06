import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

// export interface LoginInterface {
//   email: string;
//   password: string;
//  }

export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post(this.baseUrl + 'users/authenticate', data);
  }

  register(data: any) {
    return this.http.post(this.baseUrl + 'users/register', data);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
