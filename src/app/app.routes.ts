import { Routes } from '@angular/router';
import {ListPageComponent} from './list-page/list-page.component';
import {BookingListComponent} from './booking-list/booking-list.component';


export const routes: Routes = [
  { path: '', redirectTo: '/studios', pathMatch: 'full' },
  { path: 'studios', component: ListPageComponent },
  { path: 'bookings', component: BookingListComponent }
];
