
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../core';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  busy = false;
  username = '';
  password = '';
  loginError = false;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((x) => {
      if (this.route.snapshot.url[0].path === 'login') {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (x && accessToken && refreshToken) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigate([returnUrl]);
        }
      } // optional touch-up: if a tab shows login page, then refresh the page to reduce duplicate login
    });
  }

  login() {
    if (!this.username || !this.password) {
      return;
    }
    this.busy = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.authService
      .login(this.username, this.password)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe(
        () => {
          this.router.navigate([returnUrl]);
        },
        () => {
          this.loginError = true;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
