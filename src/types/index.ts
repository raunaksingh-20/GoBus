export interface City {
  id: string;
  name: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  busType: 'Sleeper' | 'Semi-Luxury' | 'AC';
  totalSeats: number;
}

export interface Route {
  id: string;
  fromCity: string;
  toCity: string;
  distanceKm: number;
}

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  fromCity: string;
  toCity: string;
  busNumber: string;
  busType: string;
  totalSeats: number;
}

export interface Booking {
  id: string;
  pnr: string;
  scheduleId: string;
  travelDate: string;
  passengerName: string;
  passengerAge: number;
  passengerGender: string;
  seatNumbers: string[];
  totalFare: number;
  status: 'confirmed' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
  fromCity: string;
  toCity: string;
  departureTime: string;
  busNumber: string;
  busType: string;
  createdAt: string;
}

export interface SeatBooking {
  scheduleId: string;
  travelDate: string;
  seatNumber: string;
  bookingId: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
