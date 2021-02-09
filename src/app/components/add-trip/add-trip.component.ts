import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/trip.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  nameTrip = '';
  country = '';
  start = '';
  finish = '';
  price = null;
  places = null;
  description = '';
  trips: Trip[] = [];

  info="";

  free = 'Free places are available';
  photoUrl = ['assets/images2/photo1.jpg','assets/images2/photo2.jpg','assets/images2/photo3.jpg',
              'assets/images2/photo4.jpg','assets/images2/photo5.jpg','assets/images2/photo6.jpg','assets/images2/photo7.jpg'];

  constructor(private tripService: TripService) { }

  ngOnInit(){
    this.getTripList();
  }

  getTripList(){
    this.tripService.getTripList().pipe(

      map(changes =>

      changes.map(c =>

      ({​​ key: c.payload.key, ...c.payload.val() }​​)

      ))

      ).subscribe(

      trips => {​​this.trips = trips;console.log(trips)}​​);
  }

  //sprawdzamy czy formularz dotyczący dodania wycieczki jest wypełniony w każdym polu
  validate(){
    if(this.nameTrip === '' || this.country === '' || this.start === '' || this.finish === '' || this.price === null || this.places === null || this.description === '')
      return true;
    else
      return false;
  }


  //funkcja do tworzenia nowej wycieczki
  async createTrip(){
    const newTrip: Trip = {
      name: this.nameTrip,
      country: this.country,
      startDate: this.start,
      endDate: this.finish,
      price: this.price,
      maxPlaces: this.places,
      description: this.description,
      photo: this.photoUrl[this.getRandomInt(0,6)],
      mark: 0,
      countVotes: 0,
      fullRate: 0,
      bookPlaces: 0,
      freePlaces: this.places,
      disableButtonCancel: true,
      disableButtonBook: false,
      smallAmount: false,
      info: this.free,
      hoverStarState: 0,
      canRead: 'no',
    };

    this.nameTrip = '';
    this.country = '';
    this.start = '';
    this.finish = '';
    this.price = null;
    this.places = null;
    this.description = '';

    this.tripService.createTrip(newTrip);

    this.info = "The trip has been added successfully";
    await this.delay(2000);
    this.info = "";

  }


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
