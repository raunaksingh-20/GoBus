import { Calendar, MapPin, Clock, IndianRupee, Ticket } from 'lucide-react';
import { getBookings } from '../data/mockData';

interface MyBookingsPageProps {
  onNavigate: (page: string) => void;
}

export default function MyBookingsPage({ onNavigate }: MyBookingsPageProps) {
  const bookings = getBookings();

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold">My Bookings</h2>
          <p className="text-lg mt-2 opacity-90">View all your bus reservations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {sortedBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Ticket className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start planning your journey by booking a bus ticket</p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Book a Ticket
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 md:w-48 flex flex-col justify-center items-center">
                    <div className="text-sm opacity-90 mb-1">PNR</div>
                    <div className="text-2xl font-bold">{booking.pnr}</div>
                    <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}>
                      {booking.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Journey
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="text-gray-600">From:</div>
                          <div className="font-medium">{booking.fromCity}</div>
                          <div className="text-gray-600 mt-2">To:</div>
                          <div className="font-medium">{booking.toCity}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date & Time
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">
                            {new Date(booking.travelDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-3 h-3" />
                            {booking.departureTime}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Bus Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">{booking.busNumber}</div>
                          <div className="text-gray-600">{booking.busType}</div>
                          <div className="mt-2">
                            <span className="text-gray-600">Seats: </span>
                            <span className="font-medium">{booking.seatNumbers.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Passenger</div>
                        <div className="font-medium">{booking.passengerName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Total Fare</div>
                        <div className="text-2xl font-bold text-red-600 flex items-center justify-end">
                          <IndianRupee className="w-5 h-5" />
                          {booking.totalFare}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
