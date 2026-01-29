import { useEffect, useState } from "react";
import api from "../api/api";
import UniversityCard from "../components/UniversityCard";
import { Filter, Search, TrendingUp, Globe } from "lucide-react";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    country: "",
    risk: "",
    category: ""
  });

  useEffect(() => {
    loadUniversities();
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [universities, searchTerm, filters]);

  const loadUniversities = async () => {
    try {
      const res = await api.get("/universities/recommendations");
      setUniversities(res.data);
      setFilteredUniversities(res.data);
    } catch (error) {
      console.error("Failed to load universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUniversities = () => {
    let filtered = universities;

    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.country) {
      filtered = filtered.filter(u => u.country === filters.country);
    }

    if (filters.risk) {
      filtered = filtered.filter(u => u.risk === filters.risk);
    }

    if (filters.category) {
      filtered = filtered.filter(u => u.category === filters.category);
    }

    setFilteredUniversities(filtered);
  };

  const lockUniversity = async (id) => {
    try {
      await api.post(`/universities/lock/${id}`);
      alert("🎉 University locked successfully! Application stage unlocked.");
      loadUniversities();
    } catch (error) {
      alert("Failed to lock university. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const countries = [...new Set(universities.map(u => u.country))];
  const risks = [...new Set(universities.map(u => u.risk))];
  const categories = [...new Set(universities.map(u => u.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              University Recommendations
            </h1>
            <p className="text-gray-600">
              AI-curated list of universities matching your profile
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white rounded-xl border">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="font-semibold">{universities.length}</span>
            <span className="text-gray-600">matches found</span>
          </div>
        </div>
      </div>

      {/* Stats & Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search universities or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.country}
            onChange={(e) => setFilters({...filters, country: e.target.value})}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          
          <select
            value={filters.risk}
            onChange={(e) => setFilters({...filters, risk: e.target.value})}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Risk Levels</option>
            {risks.map(risk => (
              <option key={risk} value={risk}>{risk}</option>
            ))}
          </select>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              Showing {filteredUniversities.length} of {universities.length} universities
            </span>
          </div>
          <button
            onClick={() => setFilters({ country: "", risk: "", category: "" })}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* University Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
            onLock={lockUniversity}
          />
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No universities found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}