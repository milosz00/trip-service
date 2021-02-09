import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = ''; password = ''; 
  

  alertVisible = false;
  errorInfo = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateUser(){
    this.auth.createUser(this.email,this.password).then(()=>
      this.router.navigate(['/home'])
    )
    .catch( err => {this.errorInfo = err.message; this.alertVisible = true;})
  }

  hideAlert(){
    this.alertVisible = false;
  }

}
