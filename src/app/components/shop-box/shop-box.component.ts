import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/trip.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shop-box',
  templateUrl: './shop-box.component.html',
  styleUrls: ['./shop-box.component.css']
})
export class ShopBoxComponent implements OnInit {

  bookTrips: Trip[] = [];
  lack = 'Sorry, lack of free places';
  free = 'Free places are available';
  small = "Hurry up! Last places!";

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.getBookTrips();
  }

  getBookTrips(){
    this.tripService.getTripList().pipe(

      map(changes =>
      
      changes.map(c =>
      
      ({​​ key: c.payload.key, ...c.payload.val() }​​)
      
      )
      .filter(c => c.bookPlaces !== 0)
      )
      
      ).subscribe(
      
      trips => {​​this.bookTrips = trips}​​);
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

    this.tripService.updateBookCancelInformation(trip.key,{freePlaces: trip.freePlaces},{bookPlaces: trip.bookPlaces},{disableButtonCancel: trip.disableButtonCancel},
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

    this.tripService.updateBookCancelInformation(trip.key,{freePlaces: trip.freePlaces},{bookPlaces: trip.bookPlaces},{disableButtonCancel: trip.disableButtonCancel},
                                                          {disableButtonBook: trip.disableButtonBook},{info: trip.info},{smallAmount: trip.smallAmount});
  }

}
