import { Bus, Users, MapPin, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-3">About GoBus</h2>
          <p className="text-xl opacity-90">Your Trusted Online Bus Booking Platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Bus className="w-8 h-8 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">Our Story</h3>
          </div>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              GoBus is an innovative online bus reservation and ticketing system designed to simplify travel
              across India. Born from the need for a seamless, user-friendly platform, GoBus empowers passengers
              to book tickets, manage bookings, and explore trip options with ease, all from the comfort of their homes.
            </p>
            <p className="text-lg leading-relaxed">
              Leveraging a robust backend powered by Spring Boot, PostgreSQL, and Redis, GoBus ensures real-time
              seat availability and secure transactions. Our platform connects users to a growing network of bus routes, making travel accessible and efficient.
            </p>
            <p className="text-lg leading-relaxed">
              "Book with Ease, Travel with Peace" - This motto drives our commitment to delivering a reliable
              and convenient travel experience for every user.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Bus className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">1000+ Trips</h4>
            <p className="text-gray-600">
              Offering a diverse range of bus routes across major cities and towns
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">10,000+ Users</h4>
            <p className="text-gray-600">
              Serving thousands of passengers with a growing community of travelers
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">50+ Cities</h4>
            <p className="text-gray-600">
              Connecting a wide network of destinations for seamless travel
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg">
                Provide a fast, secure, and user-friendly platform for booking bus tickets online
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg">
                Ensure real-time seat availability and reliable transaction processing
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg">
                Expand our network to connect more cities and enhance travel convenience
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg">
                Maintain high standards of customer support and system reliability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
