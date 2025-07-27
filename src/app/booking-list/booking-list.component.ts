import {Component, OnInit} from '@angular/core';
import {Booking} from '../booking';
import {StudioService} from '../studio.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit{
  bookings: Booking[] = [];

  constructor(private studioService: StudioService) {}

  ngOnInit(): void {
    this.bookings = this.studioService.getBookings();
    console.log("Booking", this.bookings);
  }
}
