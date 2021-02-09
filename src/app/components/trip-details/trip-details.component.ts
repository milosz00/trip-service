import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap ,map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/trip.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {


  tripDetails: Observable<any>;
  keyTrip: string;
  currentUserRole: string;

  lack = 'Sorry, lack of free places';
  free = 'Free places are available';
  small = "Hurry up! Last places!";

  constructor(private tripService: TripService, private route: ActivatedRoute,private authService: AuthService) { }

    
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.tripService.getTrip(this.keyTrip = params.get('key')))
    ).subscribe(trips => {this.tripDetails = trips;});
    this.getCurrentUserRole();
  }
  



  /* komponent star */
  stars = [1,2,3,4,5];

  enter(trip: Trip,value) {
    trip.hoverStarState = value;
  }

  leave(trip: Trip) {
    trip.hoverStarState = 0;
  }

  updateRating(value,trip: Trip) {
    trip.countVotes+=1
    trip.fullRate+=value;
    trip.mark = (trip.fullRate/trip.countVotes);

    this.tripService.updateMark(this.keyTrip,{fullRate: trip.fullRate},{countVotes: trip.countVotes},{ mark: trip.mark });
  }


  // obsługa przycisku anulującego rezerwacje
  cancel(trip: Trip){
    trip.freePlaces += 1;    
    trip.bookPlaces -=1;

  
    if(trip.freePlaces === trip.maxPlaces){
      trip.disableButtonCancel = true;
    }
    else if(trip.freePlaces >= 0){
      trip.disableButtonBook = false;
      trip.info = this.free;
      trip.smallAmount = false;
    }

    
    if(trip.freePlaces>0 && trip.freePlaces<=3){
      trip.smallAmount = true;
      trip.info = this.small;
    }

    this.tripService.updateBookCancelInformation(this.keyTrip,{freePlaces: trip.freePlaces},{bookPlaces: trip.bookPlaces},{disableButtonCancel: trip.disableButtonCancel},
      {disableButtonBook: trip.disableButtonBook},{info: trip.info},{smallAmount: trip.smallAmount});
  }


  //obsługa przycisku, który służy do rezerwowania wycieczek
  book(trip: Trip){
    trip.freePlaces -= 1;
    trip.bookPlaces += 1
    
    if(trip.freePlaces === trip.maxPlaces){
      trip.disableButtonCancel = true;
      trip.info = this.lack;
    }
    else if(trip.freePlaces < trip.maxPlaces){
      trip.disableButtonCancel = false;
      trip.info = this.free;
      trip.smallAmount = false;
    }
    
    if(trip.freePlaces === 0){
      trip.disableButtonBook = true;
      trip.info = this.lack;
    }

    if(trip.freePlaces<=3 && trip.freePlaces>0){
      trip.smallAmount = true;
      trip.info = this.small;
    }

    this.tripService.updateBookCancelInformation(this.keyTrip,{freePlaces: trip.freePlaces},{bookPlaces: trip.bookPlaces},{disableButtonCancel: trip.disableButtonCancel},
                                                          {disableButtonBook: trip.disableButtonBook},{info: trip.info},{smallAmount: trip.smallAmount});
  }

  getCurrentUserRole(){
    if(this.authService.getIsLogged()){
      this.authService.getCurrentUser().subscribe(c => {this.currentUserRole = c[0].role;console.log(this.currentUserRole) } )
    }
    else{
      this.currentUserRole = "reader";
    }
  }

}
