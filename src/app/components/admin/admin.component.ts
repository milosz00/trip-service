import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/trip.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  trips: Trip[] = [];
  currentUserRole: string;

  constructor(private authService: AuthService,private tripService: TripService,private userService: UserService) { }

  ngOnInit(): void {
    this.getTripList();
    this.getCurrUserRole();
  }

  setSession(){
    this.authService.setPersistance('session');
  }

  setLocal(){
    this.authService.setPersistance('local');
  }

  setNone(){
    this.authService.setPersistance('none');
  }


  getTripList(){
    this.tripService.getTripList().pipe(

      map(changes =>
      
      changes.map(c =>
      
      ({​​ key: c.payload.key, ...c.payload.val() }​​)
      
      ))
      
      ).subscribe(
      
      trips => {​​this.trips = trips;});
  }

  getCurrUserRole(){
    this.authService.getCurrentUser().subscribe(c => {
      this.currentUserRole = c[0].role
    })
  }


  delete(key: string){
    this.tripService.deleteTrip(key);
  }

}
