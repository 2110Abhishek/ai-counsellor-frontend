import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyAbroad AI
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full">
              Stage 1
            </span>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === "/dashboard"
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/counsellor"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === "/counsellor"
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              AI Counsellor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}