import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  currentUser: User;
  currentUserRole: string;
  constructor(private db: AngularFireDatabase) { }


  getUsers(): Observable<any>{
    return this.db.list("users").snapshotChanges();
  }

  changeRole(key: string, role: string){
    this.db.list("users").update(key,{role: role});
  }

}
