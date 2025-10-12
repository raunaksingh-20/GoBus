import { Bus } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bus className="w-8 h-8" />
          <span className="text-xl font-bold">GoBus</span>
        </div>
        <div className="text-center text-gray-400 text-sm">
          <p className="mb-2">2025, GoBus. All rights reserved.</p>
          <p>Book with Ease, Travel with Peace</p>
        </div>
      </div>
    </footer>
  );
}
