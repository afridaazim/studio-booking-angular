import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Studio} from '../studio';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudioService} from '../studio.service';



@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.css'
})
export class BookingModalComponent {
  @Input() studio!: Studio;
  @Output() close = new EventEmitter<void>();
  bookingForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private studioService: StudioService) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const form = this.bookingForm.value;
    const existingBookings = this.studioService.getBookings().filter(b => b.studioId === this.studio.id && b.date === form.date && b.timeSlot === form.timeSlot);
    if (existingBookings.length > 0) {
      this.errorMessage = 'The selected time slot is not available. Please choose another time.';
      this.successMessage = '';
      return;
    }

    this.studioService.saveBooking({
      studioId: this.studio.id,
      name: form.name,
      email: form.email,
      date: form.date,
      timeSlot: form.timeSlot,
      type: this.studio.type,
      location: {
        city: this.studio.location.city,
        area: this.studio.location.area,
        address: this.studio.location.address,
        latitude: this.studio.location.latitude,
        longitude: this.studio.location.longitude,
      }
    });
    this.successMessage = 'Booking confirmed!';
    this.errorMessage = '';
    this.bookingForm.reset();

    setTimeout(() => this.close.emit(), 1500);
  }
  closeModal(): void {
    this.close.emit();
  }
}
