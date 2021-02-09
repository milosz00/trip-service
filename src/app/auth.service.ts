import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Alert } from './models/alert';
import { User } from './models/user';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  public currentUser: any;
  users: any[] = [];
  persistance = 'session';
  currentEmail: string;
  currentUserRole: any;

  alert: Alert;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService,private db: AngularFireDatabase) {
    this.currentEmail = this.getCurrentUserEmail();
  }

  getUserState(){
    return this.afAuth.authState;
  }


  createUser(email: string, password: string){
   return this.afAuth.createUserWithEmailAndPassword(email,password).then(user => {
      this.loggedIn = true;
      localStorage.setItem('user',JSON.stringify(user.user));
      this.currentEmail = email;
      let newUser: User = {
        uid: user.user.uid,
        email: user.user.email,
        role: 'VIP',
      }

      this.db.list("users").push(newUser);

      this.router.navigate(['/home']);
    })
  }


  logIn(email: string, password: string,persistance: string){
    return this.afAuth.setPersistence(persistance).then(() =>{
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then( (user) => {
      this.loggedIn = true;
      this.currentEmail = email;
      localStorage.setItem('user' , JSON.stringify(user.user))

      this.router.navigate(['/home']);
    })
  })
  }

  logOut(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    })

    localStorage.removeItem('user');
  }


  getIsLogged(){
    if(localStorage.getItem('user') !== null)
      return true;
    else
      return false;
  }

  getCurrentUserEmail(){
    const currentUser = localStorage.getItem('user');
    if(currentUser === null)
      return null;

    let index = currentUser.search("email") + 8;
    let email = "";

      while(currentUser[index] !== '\"'){
        email+=currentUser[index];
        index+=1;
      }


    return email;
  }

  getCurrentUser(){
    
    return this.userService.getUsers().pipe(

      map(changes =>

      changes.map(c =>

      ({​​ key: c.payload.key, ...c.payload.val() }​​)

      )
      .filter(c => c.email === this.currentEmail)
      )
      )
  }

  setPersistance(persistance: string){
    this.db.object('persistence').update({value : persistance});
  }

  getPersistence(){
    return this.db.object('persistence').valueChanges();
  }


}
