import { CheckCircle, Download, Home, IndianRupee } from 'lucide-react';
import { Booking } from '../types';

interface ConfirmationPageProps {
  booking: Booking;
  onGoHome: () => void;
  onViewBookings: () => void;
}

export default function ConfirmationPage({
  booking,
  onGoHome,
  onViewBookings,
}: ConfirmationPageProps) {
  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-lg opacity-90">Your ticket has been booked successfully</p>
          </div>

          <div className="p-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-600 mb-1">PNR Number</div>
                <div className="text-3xl font-bold text-red-600">{booking.pnr}</div>
                <div className="text-sm text-gray-500 mt-2">Please save this for future reference</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Passenger Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{booking.passengerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{booking.passengerAge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{booking.passengerGender}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Journey Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{booking.fromCity} → {booking.toCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(booking.travelDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{booking.departureTime}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Bus Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bus Number:</span>
                    <span className="font-medium">{booking.busNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{booking.busType}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Seat & Payment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-medium">{booking.seatNumbers.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Fare:</span>
                    <span className="font-medium text-red-600 flex items-center">
                      <IndianRupee className="w-3 h-3" />
                      {booking.totalFare}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600 capitalize">{booking.paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Instructions:</h4>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Please arrive at the boarding point 15 minutes before departure</li>
                <li>Carry a valid ID proof for verification</li>
                <li>PNR number is mandatory for boarding</li>
                <li>Ticket cancellation is subject to MSRTC rules</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onGoHome}
                className="flex-1 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Book Another Ticket
              </button>
              <button
                onClick={onViewBookings}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
