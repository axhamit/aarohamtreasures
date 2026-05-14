import { Category } from "@/sanity.types";
import React, { useState } from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { 
  Tag, 
  Sparkles, 
  RefreshCw, 
  ChevronRight, 
  Clock, 
  TrendingUp,
  Headphones,
  Laptop,
  Smartphone,
  Camera,
  Watch,
  Speaker,
  Gamepad,
  Home,
  Gift
} from "lucide-react";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to get icon for category
  const getCategoryIcon = (title: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      "Headphones": <Headphones className="w-4 h-4" />,
      "Headphone": <Headphones className="w-4 h-4" />,
      "Laptops": <Laptop className="w-4 h-4" />,
      "Laptop": <Laptop className="w-4 h-4" />,
      "Smartphones": <Smartphone className="w-4 h-4" />,
      "Mobile": <Smartphone className="w-4 h-4" />,
      "Cameras": <Camera className="w-4 h-4" />,
      "Camera": <Camera className="w-4 h-4" />,
      "Watches": <Watch className="w-4 h-4" />,
      "Watch": <Watch className="w-4 h-4" />,
      "Speakers": <Speaker className="w-4 h-4" />,
      "Speaker": <Speaker className="w-4 h-4" />,
      "Gaming": <Gamepad className="w-4 h-4" />,
      "Accessories": <Gift className="w-4 h-4" />,
      "Home": <Home className="w-4 h-4" />,
    };
    return icons[title] || <Tag className="w-4 h-4" />;
  };

  const filteredCategories = categories?.filter(category =>
    category?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularCategories = categories?.slice(0, 4);

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
                <Tag className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <Title className="text-base font-bold text-gray-900">Product Categories</Title>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedCategory ? `Selected: ${selectedCategory}` : `${categories?.length} categories available`}
              </p>
            </div>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          
          {/* Search Bar */}
          <div className="px-5 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Popular Categories Section */}
          {!searchTerm && !selectedCategory && (
            <div className="px-5 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularCategories?.map((category) => (
                  <button
                    key={category?._id}
                    onClick={() => setSelectedCategory(category?.slug?.current as string)}
                    className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full text-xs font-medium text-gray-700 hover:from-amber-50 hover:to-amber-100 hover:text-amber-700 transition-all duration-300"
                  >
                    {category?.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Categories List */}
          <div className="p-5 pt-3">
            <RadioGroup value={selectedCategory || ""} className="space-y-2">
              {/* All Categories Option */}
              <div
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 cursor-pointer group hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-transparent ${
                  !selectedCategory ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    !selectedCategory ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-amber-100'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <Label
                    htmlFor="all-categories"
                    className={`text-sm font-medium cursor-pointer transition-colors ${
                      !selectedCategory ? 'text-amber-700 font-semibold' : 'text-gray-700 group-hover:text-gray-900'
                    }`}
                  >
                    All Categories
                  </Label>
                </div>
                {!selectedCategory && (
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Category Items */}
              {filteredCategories?.map((category, index) => (
                <div
                  onClick={() => {
                    setSelectedCategory(category?.slug?.current as string);
                  }}
                  key={category?._id}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 cursor-pointer group hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-transparent ${
                    selectedCategory === category?.slug?.current ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      selectedCategory === category?.slug?.current 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-amber-100 group-hover:text-amber-600'
                    }`}>
                      {getCategoryIcon(category?.title || "")}
                    </div>
                    <Label
                      htmlFor={category?.slug?.current}
                      className={`text-sm cursor-pointer transition-all duration-300 flex-1 ${
                        selectedCategory === category?.slug?.current 
                          ? 'text-amber-700 font-semibold' 
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}
                    >
                      {category?.title}
                    </Label>
                    
                    {/* Product Count (if available) */}
                    {category?.productCount && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {category.productCount}
                      </span>
                    )}
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedCategory === category?.slug?.current && (
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                      <ChevronRight className="w-3 h-3 text-amber-500" />
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>

            {/* No Results */}
            {filteredCategories?.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No categories found</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-xs text-amber-600 hover:text-amber-700"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          {selectedCategory && (
            <div className="px-5 pb-5 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedCategory(null)}
                className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:from-amber-50 hover:to-amber-100 hover:text-amber-700 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                Reset Selection
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

export default CategoryList;