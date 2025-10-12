import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building, IndianRupee } from 'lucide-react';
import { Schedule } from '../types';
import { PassengerDetails } from './PassengerDetailsPage';

interface PaymentPageProps {
  schedule: Schedule;
  travelDate: string;
  selectedSeats: string[];
  passengerDetails: PassengerDetails;
  onBack: () => void;
  onPaymentComplete: () => void;
}

export default function PaymentPage({
  schedule,
  travelDate,
  selectedSeats,
  passengerDetails,
  onBack,
  onPaymentComplete,
}: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const totalFare = selectedSeats.length * schedule.fare;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={onBack} className="mb-4 text-white hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Passenger Details
          </button>
          <h2 className="text-3xl font-bold">Payment</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Select Payment Method</h3>

              <div className="space-y-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition ${
                    paymentMethod === 'card'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Credit / Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, Rupay</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition ${
                    paymentMethod === 'upi'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">UPI</div>
                      <div className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition ${
                    paymentMethod === 'netbanking'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Net Banking</div>
                      <div className="text-sm text-gray-600">All major banks</div>
                    </div>
                  </div>
                </button>
              </div>

              <form onSubmit={handlePayment} className="border-t pt-6">
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                        placeholder="Name on card"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">UPI ID</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                      placeholder="yourname@upi"
                      required
                    />
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Select Bank</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                      required
                    >
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                >
                  {processing ? 'Processing Payment...' : `Pay ${totalFare.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}`}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  This is a demo payment. No real transaction will occur.
                </p>
              </form>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h3>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passenger:</span>
                  <span className="font-medium">{passengerDetails.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{schedule.fromCity} → {schedule.toCity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bus:</span>
                  <span className="font-medium">{schedule.busNumber}</span>
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

              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Seats:</div>
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
