import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/models/trip';

@Pipe({
  name: 'filterDate'
})
export class PipeDatePipe implements PipeTransform {

  transform(trips: Trip[],searchTripStartDate,searchTripEndDate: string): Trip[] {
    if(!trips || !searchTripEndDate || !searchTripStartDate)
      return trips

    return trips.filter(trip => (new Date(searchTripStartDate).valueOf() <= new Date(trip.startDate).valueOf() ) && 
                                (new Date(trip.endDate).valueOf() <= new Date(searchTripEndDate).valueOf() ));
  }

}
