import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit{

  trips: Trip[] = [];
  lack = 'Sorry, lack of free places';
  free = 'Free places are available';
  small = "Hurry up! Last places!";

  validation = true;
  maxMinPrice = [];

  currentUserRole: string;


  constructor(private tripService: TripService,private authService: AuthService){}

  ngOnInit(){
    this.getTripList();
    this.getCurrentUserRole();
  }


  getTripList(){
    this.tripService.getTripList().pipe(

      map(changes =>
      
      changes.map(c =>
      
      ({​​ key: c.payload.key, ...c.payload.val() }​​)
      
      ))
      
      ).subscribe(
      
      trips => {​​this.trips = trips;this.maxMinPrice = this.maxMin()}​​);
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
    this.tripService.updateMark(trip.key,{fullRate: trip.fullRate},{countVotes: trip.countVotes},{ mark: trip.mark });
  }


  /* ----------------------- */
  
  /*komponent trip-filters*/

  searchTripName: string;
  searchTripCountry: string;
  searchTripPrice: number;
  searchTripEndDate: string;
  searchTripStartDate: string;
  searchTripStar: number;

  fillStringInput(values: string[]){
    this.searchTripName = values[0];
    this.searchTripCountry = values[1];
    this.searchTripEndDate = values[2];
    this.searchTripStartDate = values[3];
  }

  fillNumberInput(values: number[]){
    this.searchTripPrice = values[0];
    this.searchTripStar = values[1];
  }

  /*------------------------ */




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

    this.tripService.updateBookCancelInformation(trip.key,{freePlaces: trip.freePlaces},{bookPlaces: trip.bookPlaces},{disableButtonCancel: trip.disableButtonCancel},
      {disableButtonBook: trip.disableButtonBook},{info: trip.info},{smallAmount: trip.smallAmount});

    if(trip.freePlaces > 0){
      this.tripService.updateCanRead(trip.key,'no');
    }
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

    this.tripService.updateBookCancelInformation(trip.key,{freePlaces: trip.freePlaces},{bookPlaces: trip.bookPlaces},{disableButtonCancel: trip.disableButtonCancel},
                                                          {disableButtonBook: trip.disableButtonBook},{info: trip.info},{smallAmount: trip.smallAmount});

    if(trip.freePlaces === 0){
      this.tripService.updateCanRead(trip.key,'user');
    }
  }

  // funkcja która szuka najdroższej i najtańszej wycieczki 
  maxMin(){
    var max = 0;
    var min = Number.MAX_SAFE_INTEGER;
    for(let trip of this.trips){
      if(trip.price>max)
        max = trip.price;
      if(trip.price<min)
        min = trip.price;
    }
    
    return [max,min];
  }


  // funkcja do usuwania wycieczki
  deleteTrip(trip: Trip){
    this.trips = this.trips.filter(e => e!==trip);
    this.maxMinPrice = this.maxMin();

    this.tripService.deleteTrip(trip.key);
  }


  getCurrentUserRole(){
    if(this.authService.getIsLogged()){
      this.authService.getCurrentUser().subscribe(c => {this.currentUserRole = c[0].role; } )
    }
    else{
      this.currentUserRole = "reader";
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



}
