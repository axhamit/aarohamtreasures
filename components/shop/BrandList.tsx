import { BRANDS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { 
  Building2, 
  Sparkles, 
  RefreshCw, 
  ChevronRight, 
  Search,
  Award,
  TrendingUp,
  Star,
  Crown,
  CheckCircle2
} from "lucide-react";

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Sample featured brands - you can mark specific brands as featured in your data
  const featuredBrands = ["Apple", "Sony", "Bose", "Samsung", "Dyson"];
  
  const filteredBrands = brands?.filter(brand => {
    const matchesSearch = brand?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = showFeaturedOnly ? featuredBrands.includes(brand?.title || "") : true;
    return matchesSearch && matchesFeatured;
  });

  const getBrandIcon = (brandName: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      "Apple": <span className="text-sm">🍎</span>,
      "Sony": <span className="text-sm">🎮</span>,
      "Samsung": <span className="text-sm">📱</span>,
      "Bose": <span className="text-sm">🎧</span>,
      "Dyson": <span className="text-sm">🌀</span>,
      "LG": <span className="text-sm">📺</span>,
      "Panasonic": <span className="text-sm">📷</span>,
      "Philips": <span className="text-sm">💡</span>,
    };
    return icons[brandName] || <Building2 className="w-4 h-4" />;
  };

  const getBrandColor = (brandName: string) => {
    const colors: { [key: string]: string } = {
      "Apple": "from-gray-700 to-gray-900",
      "Sony": "from-blue-600 to-blue-800",
      "Samsung": "from-blue-500 to-blue-700",
      "Bose": "from-red-600 to-red-800",
      "Dyson": "from-purple-600 to-purple-800",
    };
    return colors[brandName] || "from-amber-500 to-amber-600";
  };

  return (
    <div className="relative group">
      {/* Main Container */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        
        {/* Header Section */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-transparent transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-30"></div>
              <div className="relative w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <Title className="text-base font-bold text-gray-900">Premium Brands</Title>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedBrand ? `Selected: ${selectedBrand}` : `${brands?.length} luxury brands available`}
              </p>
            </div>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          
          {/* Search and Filter Bar */}
          <div className="px-5 pb-3 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Featured Toggle */}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                showFeaturedOnly 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Featured Brands Only
            </button>
          </div>

          {/* Featured Brands Section (when not searching) */}
          {!searchTerm && !showFeaturedOnly && !selectedBrand && (
            <div className="px-5 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Luxury Brands</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {brands?.slice(0, 6).map((brand) => (
                  <button
                    key={brand?._id}
                    onClick={() => setSelectedBrand(brand?.slug?.current as string)}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-xs font-medium text-gray-700 hover:from-amber-50 hover:to-amber-100 hover:text-amber-700 transition-all duration-300 group"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getBrandColor(brand?.title || "")} flex items-center justify-center text-white text-xs`}>
                      {brand?.title?.charAt(0)}
                    </div>
                    <span className="flex-1 text-left">{brand?.title}</span>
                    <TrendingUp className="w-3 h-3 text-gray-400 group-hover:text-amber-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Brands List */}
          <div className="p-5 pt-3">
            <RadioGroup value={selectedBrand || ""} className="space-y-2">
              {/* All Brands Option */}
              <div
                onClick={() => setSelectedBrand(null)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer group hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-transparent ${
                  !selectedBrand ? 'bg-gradient-to-r from-amber-50/50 to-transparent border-l-4 border-amber-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    !selectedBrand ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-amber-100'
                  }`}>
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <Label
                      htmlFor="all-brands"
                      className={`text-sm font-medium cursor-pointer transition-colors ${
                        !selectedBrand ? 'text-amber-700 font-semibold' : 'text-gray-700 group-hover:text-gray-900'
                      }`}
                    >
                      All Brands
                    </Label>
                    <p className="text-xs text-gray-400 mt-0.5">View all products</p>
                  </div>
                </div>
                {!selectedBrand && (
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                )}
              </div>

              {/* Brand Items */}
              {filteredBrands?.map((brand, index) => {
                const isFeatured = featuredBrands.includes(brand?.title || "");
                const isSelected = selectedBrand === brand?.slug?.current;
                
                return (
                  <div
                    key={brand?._id}
                    onClick={() => setSelectedBrand(brand?.slug?.current as string)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer group hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-transparent ${
                      isSelected ? 'bg-gradient-to-r from-amber-50/50 to-transparent border-l-4 border-amber-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-r ${getBrandColor(brand?.title || "")} text-white shadow-md` 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-amber-100 group-hover:text-amber-600'
                      }`}>
                        {getBrandIcon(brand?.title || "")}
                        {isFeatured && !isSelected && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor={brand?.slug?.current}
                            className={`text-sm font-medium cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? 'text-amber-700 font-semibold' 
                                : 'text-gray-700 group-hover:text-gray-900'
                            }`}
                          >
                            {brand?.title}
                          </Label>
                          {isFeatured && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Premium quality products
                        </p>
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-amber-500" />
                      </div>
                    )}
                    
                    {/* Hover Arrow */}
                    {!isSelected && (
                      <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    )}
                  </div>
                );
              })}
            </RadioGroup>

            {/* No Results */}
            {filteredBrands?.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No brands found</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setShowFeaturedOnly(false);
                  }}
                  className="mt-2 text-xs text-amber-600 hover:text-amber-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          {selectedBrand && (
            <div className="px-5 pb-5 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedBrand(null)}
                className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:from-amber-50 hover:to-amber-100 hover:text-amber-700 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                Reset Brand Selection
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-amber-100 rounded-full blur-2xl opacity-30 -z-10"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-amber-50 rounded-full blur-2xl opacity-30 -z-10"></div>
    </div>
  );
};

export default BrandList;