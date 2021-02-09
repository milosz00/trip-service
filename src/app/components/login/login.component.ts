import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isLogged = false;
  email: string; password: string;
  persistence: any;
  alert: Alert;

  alertVisible = false;
  errorInfo = '';

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null)
      this.isLogged = true;
    else
      this.isLogged = false;
    this.getPersistence();
  }

  onLogIn(){
    this.auth.logIn(this.email,this.password,this.persistence.value).catch(
      err => {this.errorInfo = err.message; this.alertVisible = true;}
    )
  }
  getPersistence(){
    this.auth.getPersistence().subscribe(c => {this.persistence = c;});
  }


  hideAlert(){
    this.alertVisible = false;
  }

}
