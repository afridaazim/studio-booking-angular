export interface Booking {
  studioId: number;
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  type: string;
  location: {
    city: string;
    area: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}
