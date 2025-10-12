import { useState } from 'react';
import { Search, ArrowLeftRight } from 'lucide-react';
import { cities } from '../data/mockData';

interface HomePageProps {
  onSearch: (from: string, to: string, date: string) => void;
}

export default function HomePage({ onSearch }: HomePageProps) {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCity && toCity && travelDate) {
      onSearch(fromCity, toCity, travelDate);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-[calc(100vh-280px)]">
      <div className="relative h-96 bg-gradient-to-r from-red-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
          <h2 className="text-5xl font-bold mb-3 text-center">Welcome to GoBus</h2>
          <p className="text-2xl mb-8 text-center opacity-95">Book with Ease, Travel with Peace</p>
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6">
            <form onSubmit={handleSearch}>
              <div className="grid md:grid-cols-[1fr_auto_1fr_1fr_auto] gap-4 items-end">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Leaving From
                  </label>
                  <select
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:border-red-500 focus:outline-none"
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSwap}
                  className="mb-1 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                >
                  <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                </button>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Going To
                  </label>
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:border-red-500 focus:outline-none"
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Date of Departure
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={today}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 transition shadow-lg"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Popular Routes</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { from: 'Mumbai', to: 'Pune' },
            { from: 'Pune', to: 'Nashik' },
            { from: 'Mumbai', to: 'Nashik' },
            { from: 'Pune', to: 'Ahmednagar' },
            { from: 'Mumbai', to: 'Nandurbar' },
            { from: 'Nashik', to: 'Ahmednagar' },
          ].map((route, index) => (
            <button
              key={index}
              onClick={() => {
                setFromCity(route.from);
                setToCity(route.to);
                setTravelDate(today);
              }}
              className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-red-500 hover:shadow-md transition text-left"
            >
              <div className="font-semibold text-gray-800">{route.from} → {route.to}</div>
              <div className="text-sm text-gray-600 mt-1">Click to search</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
