import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/models/trip';

@Pipe({
  name: 'filterPrice'
})
export class PipePricePipe implements PipeTransform {

  transform(trips: Trip[],searchTripPrice: number): Trip[] {
    if(!trips || !searchTripPrice)
      return trips

    return trips.filter(trip => trip.price <= searchTripPrice);
  }

}
