import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TripService } from 'src/app/trip.service';

@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.css']
})
export class UpdateTripComponent implements OnInit {

  keyTrip: string;
  tripDetails: Observable<any>;
  start = '';
  finish = '';
  price = null;
  places = null;
  description = '';


  constructor(private tripService: TripService, private route: ActivatedRoute) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.tripService.getTrip(this.keyTrip = params.get('key')))
    ).subscribe(trips => {this.tripDetails = trips;});
   }

  ngOnInit(): void {
  }

  
  change(number: number){
    switch(number){
      case 1:
        this.tripService.updateStartDate(this.keyTrip,this.start);
        break;
      case 2:
        this.tripService.updateEndDate(this.keyTrip,this.finish);
        break;
      case 3:
        this.tripService.updatePrice(this.keyTrip,this.price);
        break;
      case 4:
       this.tripService.updateMaxPlaces(this.keyTrip,this.places);
        break;
      case 5:
        this.tripService.updateDescription(this.keyTrip,this.description);
        break;
    }

    this.start = '';
    this.finish = '';
    this.price = null;
    this.places = null;
    this.description = '';
  }
  

}
