import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-trips',
  templateUrl: './filter-trips.component.html',
  styleUrls: ['./filter-trips.component.css']
})
export class FilterTripsComponent implements DoCheck{

  @Output() tripString = new EventEmitter<string[]>();
  @Output() tripNumbers = new EventEmitter<number[]>();

  inputTripName: string;
  inputTripCountry: string;
  inputTripPrice: number;
  inputTripStar: number;
  inputTripEndDate: string;
  inputTripStartDate: string;

  ngDoCheck(): void{
    this.tripString.emit([this.inputTripName,this.inputTripCountry,this.inputTripEndDate,this.inputTripStartDate]);
    this.tripNumbers.emit([this.inputTripPrice,this.inputTripStar]);
  }
}
