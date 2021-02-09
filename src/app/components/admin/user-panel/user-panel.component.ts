import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {


  users: User[] = [];
  email: string;

  constructor(private userService: UserService,private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getCurrEmail();
  }

  getUsers(){
    this.userService.getUsers().pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
        
      ).subscribe(
        users => {​this.users = users;}​
      );
    
  }

  getCurrEmail(){
    this.email = this.authService.getCurrentUserEmail();
  }

  changeRole(key: string,num: number){
    switch(num){
      case 1:
        this.userService.changeRole(key,"admin");
        break;
      case 2:
        this.userService.changeRole(key,"worker");
        break;
      case 3:
        this.userService.changeRole(key,"VIP");
        break;
      case 4:
        this.userService.changeRole(key,"reader");
        break;
    }
  }

}
