import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Target, Globe, DollarSign, FileText, CheckCircle } from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const submit = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/complete", {
        education: "Bachelor",
        major: "CS",
        graduationYear: 2024,
        targetDegree: "Masters",
        field: "CS",
        countries: ["Germany", "USA", "Canada"],
        budget: 15000,
        fundingType: "Self",
        ieltsStatus: "Not Started",
        greStatus: "Not Started",
        sopStatus: "Not Started"
      });
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to complete onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, icon: GraduationCap, title: "Education Background" },
    { number: 2, icon: Target, title: "Study Goals" },
    { number: 3, icon: Globe, title: "Preferences" },
    { number: 4, icon: CheckCircle, title: "Complete" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Complete Your Profile
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Help us personalize your study abroad journey
        </p>
        
        {/* Progress Steps */}
        <div className="relative">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
          <div 
            className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
          
          <div className="flex justify-between relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3
                  ${currentStep >= step.number 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-300 text-gray-400'}
                `}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education Background</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Degree</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Major/Field</label>
                <input 
                  type="text" 
                  defaultValue="Computer Science"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                <input 
                  type="number" 
                  defaultValue="2024"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">GPA/CGPA</label>
                <input 
                  type="text" 
                  placeholder="e.g., 3.5/4.0"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Goals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Target Degree</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Master's</option>
                  <option>PhD</option>
                  <option>Bachelor's</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Field of Interest</label>
                <input 
                  type="text" 
                  defaultValue="Computer Science"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <input 
                  type="text" 
                  placeholder="e.g., AI, Data Science"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preferred Start</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Fall 2024</option>
                  <option>Spring 2025</option>
                  <option>Fall 2025</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences & Budget</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Countries</label>
                <div className="flex flex-wrap gap-2">
                  {["Germany", "USA", "Canada", "UK", "Australia", "Netherlands"].map(country => (
                    <label key={country} className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
                      <input type="checkbox" defaultChecked={["Germany", "USA", "Canada"].includes(country)} />
                      <span>{country}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Annual Budget (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      defaultValue="15000"
                      className="w-full pl-10 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Funding Type</label>
                  <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Self-funded</option>
                    <option>Scholarship</option>
                    <option>Loan</option>
                    <option>Sponsorship</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Complete!</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Your profile is complete. Click below to start your personalized study abroad journey.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          
          <div className="ml-auto flex space-x-4">
            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Completing...
                  </>
                ) : (
                  "Complete Onboarding"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}