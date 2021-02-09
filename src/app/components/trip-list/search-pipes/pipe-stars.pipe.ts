import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/models/trip';

@Pipe({
  name: 'filterStars'
})
export class PipeStarsPipe implements PipeTransform {

  transform(trips: Trip[],searchTripStar: number): Trip[] {
    if(!trips || !searchTripStar)
      return trips

    return trips.filter(trip => trip.mark >= searchTripStar);
  }
}
