import { Link } from "react-router-dom";
import { Sparkles, Globe, Target, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Globe className="w-12 h-12 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI Study Abroad Counsellor
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Plan your international education journey with personalized AI guidance, 
          university matching, and step-by-step support.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Target className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Personalized Planning</h3>
            <p className="text-gray-600">Custom roadmap based on your goals</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Globe className="w-10 h-10 text-purple-500 mb-4 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Smart University Match</h3>
            <p className="text-gray-600">AI-powered university recommendations</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Zap className="w-10 h-10 text-pink-500 mb-4 mx-auto" />
            <h3 className="font-bold text-lg mb-2">24/7 AI Support</h3>
            <p className="text-gray-600">Instant answers to your questions</p>
          </div>
        </div>
        
        <Link 
          to="/login" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Start Your Journey
          <Sparkles className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}