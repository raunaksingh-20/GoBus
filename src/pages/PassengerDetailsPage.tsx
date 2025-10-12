import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, IndianRupee } from 'lucide-react';
import { Schedule } from '../types';

interface PassengerDetailsPageProps {
  schedule: Schedule;
  travelDate: string;
  selectedSeats: string[];
  onBack: () => void;
  onContinue: (details: PassengerDetails) => void;
}

export interface PassengerDetails {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
}

export default function PassengerDetailsPage({
  schedule,
  travelDate,
  selectedSeats,
  onBack,
  onContinue,
}: PassengerDetailsPageProps) {
  const [details, setDetails] = useState<PassengerDetails>({
    name: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(details);
  };

  const totalFare = selectedSeats.length * schedule.fare;

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={onBack} className="mb-4 text-white hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Seat Selection
          </button>
          <h2 className="text-3xl font-bold">Passenger Details</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Enter Passenger Information</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Age *</label>
                    <input
                      type="number"
                      value={details.age || ''}
                      onChange={(e) => setDetails({ ...details, age: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                      placeholder="Age"
                      min="1"
                      max="120"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender *</label>
                    <select
                      value={details.gender}
                      onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Journey Summary</h3>

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
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(travelDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{schedule.departureTime}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="text-sm text-gray-600 mb-2">Selected Seats:</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {seat}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seats ({selectedSeats.length}):</span>
                    <span className="font-medium flex items-center">
                      <IndianRupee className="w-3 h-3" />
                      {totalFare}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-red-600 flex items-center">
                    <IndianRupee className="w-6 h-6" />
                    {totalFare}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
