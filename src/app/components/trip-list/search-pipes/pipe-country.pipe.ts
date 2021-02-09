import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/models/trip';

@Pipe({
  name: 'FilterCountry'
})
export class PipeCountryPipe implements PipeTransform {

  transform(trips: Trip[],searchTripCountry: string): Trip[] {
    if(!trips || !searchTripCountry)
      return trips

    return trips.filter(trip => trip.country.toLowerCase().indexOf(searchTripCountry.toLowerCase()) !== -1);
  }

}
