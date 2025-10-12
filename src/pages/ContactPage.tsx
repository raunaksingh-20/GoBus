import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-3">Contact Us</h2>
          <p className="text-xl opacity-90">We're here to help with your queries</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+91-800-123-4567</p>
            <p className="text-gray-600">+91-800-123-4568</p>
            <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9:00 AM - 7:00 PM</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">support@gobus.com</p>
            <p className="text-gray-600">help@gobus.com</p>
            <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Head Office</h3>
            <p className="text-gray-600">GoBus Technologies Pvt. Ltd.</p>
            <p className="text-gray-600">123 Tech Park, Bangalore</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>

            {submitted ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h4>
                <p className="text-green-700">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none h-40 resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-3">Frequently Asked Questions</h4>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li className="flex gap-2">
                <span className="font-bold">Q:</span>
                <span>How do I book a ticket on GoBus?</span>
              </li>
              <li className="flex gap-2 ml-4">
                <span className="font-bold">A:</span>
                <span>Visit our website, search for a trip, and follow the booking process.</span>
              </li>
              <li className="flex gap-2 mt-3">
                <span className="font-bold">Q:</span>
                <span>What should I do if my payment fails?</span>
              </li>
              <li className="flex gap-2 ml-4">
                <span className="font-bold">A:</span>
                <span>Contact support with your booking ID for assistance.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}