import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Studio} from './studio';
import {environment} from '../environments/environment';
import {Booking} from './booking';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  private dataUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  // getStudios(): Observable<Studio[]> {
  //   return this.http.get<Studio[]>(this.dataUrl);
  // }
  // getStudios(): Observable<Studio[]> {
  //   return this.http.get<{ Studios: Studio[] }>(this.dataUrl).pipe(
  //     map(response => response.Studios)
  //   );
  // }


  getStudios(): Observable<Studio[]> {
    return this.http.get<{ Studios: any[] }>(this.dataUrl).pipe(
      map(response =>
        response.Studios.map(studio => {
          const openTime = studio.Availability?.Open;
          const closeTime = studio.Availability?.Close;
          const availableSlots = this.generateTimeSlots(openTime, closeTime);

          return {
            id: studio.Id,
            name: studio.Name,
            type: studio.Type,
            location: {
              city: studio.Location?.City,
              area: studio.Location?.Area,
              address: studio.Location?.Address,
              latitude: studio.Location?.Coordinates?.Latitude || 0,
              longitude: studio.Location?.Coordinates?.Longitude || 0
            },
            amenities: studio.Amenities || [],
            pricePerHour: studio.PricePerHour,
            rating: studio.Rating,
            availability: {
              open: openTime,
              close: closeTime
            },
            availableSlots
          };
        })
      )
    );
  }



  saveBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  getBookings(): Booking[] {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }

  private generateTimeSlots(open: string, close: string): string[] {
    const slots: string[] = [];
    const [openHour, openMin] = open.split(':').map(Number);
    const [closeHour, closeMin] = close.split(':').map(Number);

    let current = new Date();
    current.setHours(openHour, openMin, 0, 0);

    const end = new Date();
    end.setHours(closeHour, closeMin, 0, 0);

    while (current < end) {
      const timeStr = current.toTimeString().slice(0, 5);
      slots.push(timeStr);
      current.setMinutes(current.getMinutes() + 60); // 1-hour interval
    }

    return slots;
  }

}
