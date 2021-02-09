import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from './models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  maxMinPrice: number[] = [0,0];

  constructor(private db: AngularFireDatabase) { }


  getTripList(): Observable<any>{
    return this.db.list('trips').snapshotChanges();
  }

  updateMark(key: string,fullRate: any, countVotes: any, mark: any){
    this.db.list('trips').update(key,fullRate);
    this.db.list('trips').update(key,countVotes);
    this.db.list('trips').update(key,mark);
  }

  getTrip(key: string): Observable<any>{
    return this.db.object('trips/' + key).valueChanges();
  }


  updateBookCancelInformation(key: string,freePlaces: any, bookPlaces: any, disBtnCancel: any, disBtnBook: any, info: any, smallAmount: any){
    this.db.list('trips').update(key,freePlaces);
    this.db.list('trips').update(key,bookPlaces);
    this.db.list('trips').update(key,disBtnCancel);
    this.db.list('trips').update(key,disBtnBook);
    this.db.list('trips').update(key,info);
    this.db.list('trips').update(key,smallAmount);
  }

  createTrip(trip: Trip){
    this.db.list('trips').push(trip);
  }


  deleteTrip(key: string){
    this.db.list('trips').remove(key);
  }

  updateCanRead(key:string,role: string){
    this.db.list('trips').update(key,{canRead: role});
  }

  updateStartDate(key: string, date: string){
    this.db.list('trips').update(key,{startDate: date});
  }
  
  updateEndDate(key: string, date: string){
    this.db.list('trips').update(key,{endDate: date});
  }

  updateDescription(key: string, desc: string){
    this.db.list('trips').update(key,{description: desc});
  }

  updatePrice(key: string, price: number){
    this.db.list('trips').update(key,{price: price});
  }

  updateMaxPlaces(key: string, places: number){
    this.db.list('trips').update(key,{maxPlaces: places});
  }

}
