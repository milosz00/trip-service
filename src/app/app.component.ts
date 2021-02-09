import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  loginState = null;
  logIn = false;
  isAdmin = false;
  isWorker = false;
  currentUserRole: string;


  constructor(private auth: AuthService,private userService: UserService){
  }

  ngOnInit(){
    this.loginState = this.auth.getUserState().subscribe( user => {
      if(user){
        this.getCurrUser();
        this.logIn = true;
      }
      else{
        this.currentUserRole = "reader";
        this.logIn = false;
      }
    });
  }

  onLogOut(){
    this.auth.logOut();
  }

  getCurrUser(){
    this.auth.getCurrentUser().subscribe(c => {
      if(c[0].role === 'admin'){
        this.isAdmin = true;
      }
      else
        this.isAdmin = false;

        if(c[0].role === 'worker'){
          this.isWorker = true;
        }
        else
          this.isWorker = false;
      
      this.currentUserRole = c[0].role
    });
  }



  
}
