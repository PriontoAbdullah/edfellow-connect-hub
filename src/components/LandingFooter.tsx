
import { Heart, GraduationCap } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-[#0B1B4D] text-white border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Edfellow</span>
                <p className="text-sm text-blue-300">Where Education Meets the World</p>
              </div>
            </div>
            <p className="text-blue-200 mb-4">
              Connect with global academic communities, find mentors, and discover educational opportunities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-blue-200 hover:text-white transition-colors">About</a></li>
              <li><a href="/features" className="text-blue-200 hover:text-white transition-colors">Features</a></li>
              <li><a href="/community" className="text-blue-200 hover:text-white transition-colors">Community</a></li>
              <li><a href="/signup" className="text-blue-200 hover:text-white transition-colors">Sign Up</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-sm text-blue-300">
                © 2024 Edfellow. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-blue-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>for global education</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
