import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// export interface LoginInterface {
//   email: string;
//   password: string;
//  }

export class AuthService {

  constructor(private router: Router) { }

  login(userForm: any) {
    if (userForm.email === 'a' && userForm.password === '123456') {
      // return true;
      localStorage.setItem('currentUser', JSON.stringify(userForm));
      this.router.navigate(['/home']);
  } else {
    return false;
  }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
