import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PassengerDetailsPage from './pages/PassengerDetailsPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { Schedule, Booking } from './types';
import { PassengerDetails } from './pages/PassengerDetailsPage';
import { saveBooking, saveSeatBookings, getSeatBookings, generatePNR } from './data/mockData';

type Page =
  | 'home'
  | 'search-results'
  | 'seat-selection'
  | 'passenger-details'
  | 'payment'
  | 'confirmation'
  | 'bookings'
  | 'about'
  | 'contact';

interface BookingState {
  fromCity: string;
  toCity: string;
  travelDate: string;
  selectedSchedule: Schedule | null;
  selectedSeats: string[];
  passengerDetails: PassengerDetails | null;
  confirmedBooking: Booking | null;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [bookingState, setBookingState] = useState<BookingState>({
    fromCity: '',
    toCity: '',
    travelDate: '',
    selectedSchedule: null,
    selectedSeats: [],
    passengerDetails: null,
    confirmedBooking: null,
  });

  const handleSearch = (from: string, to: string, date: string) => {
    setBookingState({
      ...bookingState,
      fromCity: from,
      toCity: to,
      travelDate: date,
    });
    setCurrentPage('search-results');
  };

  const handleSelectBus = (schedule: Schedule) => {
    setBookingState({
      ...bookingState,
      selectedSchedule: schedule,
    });
    setCurrentPage('seat-selection');
  };

  const handleSeatContinue = (seats: string[]) => {
    setBookingState({
      ...bookingState,
      selectedSeats: seats,
    });
    setCurrentPage('passenger-details');
  };

  const handlePassengerContinue = (details: PassengerDetails) => {
    setBookingState({
      ...bookingState,
      passengerDetails: details,
    });
    setCurrentPage('payment');
  };

  const handlePaymentComplete = () => {
    if (!bookingState.selectedSchedule || !bookingState.passengerDetails) return;

    const pnr = generatePNR();
    const booking: Booking = {
      id: Date.now().toString(),
      pnr,
      scheduleId: bookingState.selectedSchedule.id,
      travelDate: bookingState.travelDate,
      passengerName: bookingState.passengerDetails.name,
      passengerAge: bookingState.passengerDetails.age,
      passengerGender: bookingState.passengerDetails.gender,
      seatNumbers: bookingState.selectedSeats,
      totalFare: bookingState.selectedSeats.length * bookingState.selectedSchedule.fare,
      status: 'confirmed',
      paymentStatus: 'paid',
      fromCity: bookingState.selectedSchedule.fromCity,
      toCity: bookingState.selectedSchedule.toCity,
      departureTime: bookingState.selectedSchedule.departureTime,
      busNumber: bookingState.selectedSchedule.busNumber,
      busType: bookingState.selectedSchedule.busType,
      createdAt: new Date().toISOString(),
    };

    saveBooking(booking);

    const existingSeatBookings = getSeatBookings();
    const newSeatBookings = bookingState.selectedSeats.map(seat => ({
      scheduleId: bookingState.selectedSchedule!.id,
      travelDate: bookingState.travelDate,
      seatNumber: seat,
      bookingId: booking.id,
    }));
    saveSeatBookings([...existingSeatBookings, ...newSeatBookings]);

    setBookingState({
      ...bookingState,
      confirmedBooking: booking,
    });
    setCurrentPage('confirmation');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    if (page === 'home') {
      setBookingState({
        fromCity: '',
        toCity: '',
        travelDate: '',
        selectedSchedule: null,
        selectedSeats: [],
        passengerDetails: null,
        confirmedBooking: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onSearch={handleSearch} />
        )}

        {currentPage === 'search-results' && bookingState.selectedSchedule === null && (
          <SearchResultsPage
            fromCity={bookingState.fromCity}
            toCity={bookingState.toCity}
            travelDate={bookingState.travelDate}
            onSelectBus={handleSelectBus}
            onBack={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'seat-selection' && bookingState.selectedSchedule && (
          <SeatSelectionPage
            schedule={bookingState.selectedSchedule}
            travelDate={bookingState.travelDate}
            onBack={() => setCurrentPage('search-results')}
            onContinue={handleSeatContinue}
          />
        )}

        {currentPage === 'passenger-details' && bookingState.selectedSchedule && (
          <PassengerDetailsPage
            schedule={bookingState.selectedSchedule}
            travelDate={bookingState.travelDate}
            selectedSeats={bookingState.selectedSeats}
            onBack={() => setCurrentPage('seat-selection')}
            onContinue={handlePassengerContinue}
          />
        )}

        {currentPage === 'payment' &&
          bookingState.selectedSchedule &&
          bookingState.passengerDetails && (
          <PaymentPage
            schedule={bookingState.selectedSchedule}
            travelDate={bookingState.travelDate}
            selectedSeats={bookingState.selectedSeats}
            passengerDetails={bookingState.passengerDetails}
            onBack={() => setCurrentPage('passenger-details')}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {currentPage === 'confirmation' && bookingState.confirmedBooking && (
          <ConfirmationPage
            booking={bookingState.confirmedBooking}
            onGoHome={() => handleNavigate('home')}
            onViewBookings={() => handleNavigate('bookings')}
          />
        )}

        {currentPage === 'bookings' && (
          <MyBookingsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
