import { Bus, Home, Info, Mail, Calendar } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Bus className="w-10 h-10" /> 
            <div>
              <h1 className="text-xl font-bold">GoBus</h1>
              {/* <p className="text-sm opacity-90"></p> */}
            </div>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="bg-white text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Login
          </button>
        </div>
      </div>
      <nav className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-1">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                  currentPage === 'home'
                    ? 'bg-white text-red-700'
                    : 'text-white hover:bg-orange-600'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('bookings')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                  currentPage === 'bookings'
                    ? 'bg-white text-red-700'
                    : 'text-white hover:bg-orange-600'
                }`}
              >
                <Calendar className="w-4 h-4" />
                My Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                  currentPage === 'about'
                    ? 'bg-white text-red-700'
                    : 'text-white hover:bg-orange-600'
                }`}
              >
                <Info className="w-4 h-4" />
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                  currentPage === 'contact'
                    ? 'bg-white text-red-700'
                    : 'text-white hover:bg-orange-600'
                }`}
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
