export interface Studio {
  id: number;
  name: string;
  type: string;
  location: {
    city: string;
    area: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  pricePerHour: number;
  rating: number;
  availability: {
    open: string;
    close: string;
  };
  availableSlots: string[];
}
