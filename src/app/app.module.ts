import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListPageComponent} from './list-page/list-page.component';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookingModalComponent} from './booking-modal/booking-modal.component';
import {BookingListComponent} from './booking-list/booking-list.component';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    BookingModalComponent,
    BookingListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
