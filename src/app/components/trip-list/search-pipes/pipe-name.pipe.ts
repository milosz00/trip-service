import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/models/trip';

@Pipe({
  name: 'filterName'
})
export class PipeNamePipe implements PipeTransform {

  transform(trips: Trip[],searchTripName: string): Trip[] {
    if(!trips || !searchTripName)
      return trips

    return trips.filter(trip => trip.name.toLowerCase().indexOf(searchTripName.toLowerCase()) !== -1);
  }

}
