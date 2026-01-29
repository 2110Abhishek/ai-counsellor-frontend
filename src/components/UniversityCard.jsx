import { MapPin, Target, TrendingUp, Users, Lock } from "lucide-react";

export default function UniversityCard({ university, onLock }) {
  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAcceptanceColor = (acceptance) => {
    const percent = parseInt(acceptance);
    if (percent > 50) return "text-green-600";
    if (percent > 25) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* University Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{university.name}</h3>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getRiskColor(university.risk)}`}>
            {university.risk} Risk
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{university.country}</span>
        </div>
      </div>

      {/* University Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{university.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Acceptance</p>
              <p className={`font-bold ${getAcceptanceColor(university.acceptance)}`}>
                {university.acceptance}%
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">QS Ranking</span>
            <span className="font-semibold">#{university.ranking || "250-300"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tuition Range</span>
            <span className="font-semibold">${university.tuition || "15K-25K"}/year</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Popular Programs</span>
            <span className="font-semibold">CS, Engineering, Business</span>
          </div>
        </div>

        {/* Lock Button */}
        <button
          onClick={() => onLock(university.id)}
          className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Lock className="w-5 h-5 mr-2" />
          Lock University
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Locking unlocks application stage
        </p>
      </div>
    </div>
  );
}