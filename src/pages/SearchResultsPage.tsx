import { Clock, MapPin, IndianRupee } from 'lucide-react';
import { schedules } from '../data/mockData';
import { Schedule } from '../types';

interface SearchResultsPageProps {
  fromCity: string;
  toCity: string;
  travelDate: string;
  onSelectBus: (schedule: Schedule) => void;
  onBack: () => void;
}

export default function SearchResultsPage({
  fromCity,
  toCity,
  travelDate,
  onSelectBus,
  onBack,
}: SearchResultsPageProps) {
  const availableBuses = schedules.filter(
    (schedule) =>
      schedule.fromCity === fromCity && schedule.toCity === toCity
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getBusTypeColor = (busType: string) => {
    switch (busType) {
      case 'AC':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Semi-Luxury':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Sleeper':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={onBack}
            className="mb-4 text-white hover:underline flex items-center gap-2"
          >
            ← Back to Search
          </button>
          <h2 className="text-3xl font-bold mb-2">Available Buses</h2>
          <div className="flex items-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{fromCity} → {toCity}</span>
            </div>
            <span>•</span>
            <span>{formatDate(travelDate)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {availableBuses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600">No buses available for this route.</p>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Search Another Route
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {availableBuses.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {schedule.busNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBusTypeColor(
                            schedule.busType
                          )}`}
                        >
                          {schedule.busType}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Departure</div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-2xl font-bold text-gray-800">
                              {schedule.departureTime}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{fromCity}</div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="h-px w-24 bg-gray-300 relative">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              {Math.floor(
                                (new Date(`2000-01-01 ${schedule.arrivalTime}`).getTime() -
                                  new Date(`2000-01-01 ${schedule.departureTime}`).getTime()) /
                                  3600000
                              )}h{' '}
                              {Math.floor(
                                ((new Date(`2000-01-01 ${schedule.arrivalTime}`).getTime() -
                                  new Date(`2000-01-01 ${schedule.departureTime}`).getTime()) %
                                  3600000) /
                                  60000
                              )}
                              m
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500 mb-1">Arrival</div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-2xl font-bold text-gray-800">
                              {schedule.arrivalTime}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{toCity}</div>
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-600">
                        <span className="font-medium">{schedule.totalSeats} seats</span> available
                      </div>
                    </div>

                    <div className="ml-6 text-right">
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Fare</div>
                        <div className="flex items-center justify-end gap-1 text-3xl font-bold text-red-600">
                          <IndianRupee className="w-7 h-7" />
                          <span>{schedule.fare}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectBus(schedule)}
                        className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
                      >
                        Select Seats
                      </button>
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
