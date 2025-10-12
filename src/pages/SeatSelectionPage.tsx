import { useState, useEffect } from 'react';
import { ArrowLeft, Armchair, IndianRupee } from 'lucide-react';
import { Schedule } from '../types';
import { getSeatBookings } from '../data/mockData';

interface SeatSelectionPageProps {
  schedule: Schedule;
  travelDate: string;
  onBack: () => void;
  onContinue: (selectedSeats: string[]) => void;
}

export default function SeatSelectionPage({
  schedule,
  travelDate,
  onBack,
  onContinue,
}: SeatSelectionPageProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  useEffect(() => {
    const seatBookings = getSeatBookings();
    const booked = seatBookings
      .filter(
        (booking) =>
          booking.scheduleId === schedule.id && booking.travelDate === travelDate
      )
      .map((booking) => booking.seatNumber);
    setBookedSeats(booked);
  }, [schedule.id, travelDate]);

  const generateSeats = () => {
    const rows = schedule.busType === 'Sleeper' ? 10 : schedule.busType === 'AC' ? 9 : 11;
    const seatsPerRow = schedule.busType === 'Sleeper' ? 4 : 4;
    const seats: string[] = [];

    for (let i = 0; i < rows; i++) {
      const rowLetter = String.fromCharCode(65 + i);
      for (let j = 1; j <= seatsPerRow; j++) {
        seats.push(`${rowLetter}${j}`);
      }
    }

    return seats.slice(0, schedule.totalSeats);
  };

  const seats = generateSeats();

  const toggleSeat = (seatNumber: string) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const getSeatClass = (seatNumber: string) => {
    if (bookedSeats.includes(seatNumber)) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    if (selectedSeats.includes(seatNumber)) {
      return 'bg-green-500 text-white border-green-600';
    }
    return 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300';
  };

  const totalFare = selectedSeats.length * schedule.fare;

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={onBack} className="mb-4 text-white hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>
          <h2 className="text-3xl font-bold mb-2">Select Your Seats</h2>
          <div className="flex items-center gap-4 text-lg">
            <span>{schedule.busNumber}</span>
            <span>•</span>
            <span>{schedule.fromCity} → {schedule.toCity}</span>
            <span>•</span>
            <span>{schedule.busType}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Bus Layout</h3>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 border-2 border-green-600 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <div className="text-center mb-4 pb-4 border-b-2 border-gray-300">
                  <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-t-lg">
                    Driver
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                  {seats.map((seat) => (
                    <button
                      key={seat}
                      onClick={() => toggleSeat(seat)}
                      disabled={bookedSeats.includes(seat)}
                      className={`aspect-square flex flex-col items-center justify-center border-2 rounded-lg font-semibold text-sm transition ${getSeatClass(
                        seat
                      )}`}
                    >
                      <Armchair className="w-5 h-5 mb-1" />
                      {seat}
                    </button>
                  ))}
                </div>
              </div>

              {selectedSeats.length >= 6 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-800 text-sm">
                  Maximum 6 seats can be selected at a time.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{schedule.fromCity} → {schedule.toCity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bus:</span>
                  <span className="font-medium">{schedule.busNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{schedule.busType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-medium">{schedule.departureTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(travelDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="mb-3">
                  <div className="text-sm text-gray-600 mb-2">Selected Seats:</div>
                  {selectedSeats.length === 0 ? (
                    <div className="text-gray-400 text-sm">No seats selected</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((seat) => (
                        <span
                          key={seat}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Fare per seat:</span>
                  <span className="font-medium flex items-center">
                    <IndianRupee className="w-3 h-3" />
                    {schedule.fare}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Number of seats:</span>
                  <span className="font-medium">{selectedSeats.length}</span>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-red-600 flex items-center">
                    <IndianRupee className="w-6 h-6" />
                    {totalFare}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onContinue(selectedSeats)}
                disabled={selectedSeats.length === 0}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
              >
                Continue to Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
