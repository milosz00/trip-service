import { Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  user: User;

  constructor(private router: Router,private userService: UserService, private authService: AuthService){
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      
      const currentUser = localStorage.getItem('user');
      if(currentUser === null){
        this.router.navigate(['/login']);
        return false;
      }
      const email = this.authService.getCurrentUserEmail();
     

      this.userService.getUsers().pipe(

        map(changes =>
        
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        )
        .filter(c => c.email === email)
        )
        
        ).subscribe(
        
        user => {​​
          this.user = user[0];
          if(next.data.roles && next.data.roles.indexOf(this.user.role) === -1){
            this.router.navigate(['/home']);
            return false;
          }
          else{
            return true;
          }          
        }​​);

  }

}
