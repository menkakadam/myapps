import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  modelRegister: any = {};
  loginForm: boolean;
  constructor(private authService: AuthService,
              private loader: LoaderService,
              private route: Router) {}

  ngOnInit() {
    this.loginForm = true;
  }

  onSubmit() {
    this.loader.display(true);
    this.authService.login(this.model).subscribe((res: any) => {
      this.loader.display(false);
      console.log(res.username);
      localStorage.setItem('currentUser', JSON.stringify(res.username));
      this.route.navigate(['/home']);
      },
      error => {
        this.loader.display(false);
        alert(error.error);
      }
    );
  }
  onRegisterSubmit() {
    this.authService.register(this.modelRegister).subscribe((res: any) => {
        alert(res);
      },
      error => {
        alert(error.error);
      }
    );
  }
  registerLink() {
    this.loginForm = false;
  }
  loginLink() {
    this.loginForm = true;
  }
}
