import { Component, EventEmitter, Input , Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {

  @Input() starId;
  @Input() rating;


  @Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  @Output() bigClick: EventEmitter<number> = new EventEmitter();


  onEnter() {
    this.enter.emit(this.starId);
  }

  onLeave() {
    this.leave.emit(0);
  }

  starClicked() {
    this.bigClick.emit(this.starId);
  }

}
