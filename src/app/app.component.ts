import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from './core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'medcabinetFront';
  myVersion ='12.5.0';

  accessToken = '';
  refreshToken = '';
  loginError: boolean;
  busy: boolean;
  route: any;
  

  constructor(public authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
  
  }
  
  logout(){
   
   //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
   //localStorage.removeItem('access_token')
  // localStorage.removeItem('refresh_token')
   this.authService
      .logout()
      .pipe(finalize(() => (this.busy = false)))
      .subscribe(
        () => {
                this.router.navigate(['login'], {});
        },
        () => {
          this.loginError = true;
        }
      ); 
    
  }
}
