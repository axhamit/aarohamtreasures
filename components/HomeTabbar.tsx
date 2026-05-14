"use client";
import { productType } from "@/constants/data";
import Link from "next/link";
import { Sparkles, ArrowRight, Diamond, Star, TrendingUp, Clock } from "lucide-react";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="relative">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100">
        
        {/* Top Decorative Line */}
        <div className="h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-t-2xl"></div>
        
        <div className="px-6 py-5 md:px-8 md:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left Section */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Label */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                  <Diamond className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Categories
                  </span>
                </div>

                {/* Tab Buttons */}
                <div className="flex flex-wrap gap-2">
                  {productType?.map((item) => (
                    <button
                      onClick={() => onTabSelect(item?.title)}
                      key={item?.title}
                      className={`
                        relative px-5 py-2 rounded-full text-sm font-medium
                        transition-all duration-300 transform hover:scale-105
                        ${selectedTab === item?.title
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-200"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }
                      `}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {selectedTab === item?.title && (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                        {item?.title}
                        {selectedTab === item?.title && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Stats */}
              <div className="hidden sm:flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Rating</div>
                    <div className="text-sm font-semibold text-gray-900">4.9</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Sale ends in</div>
                    <div className="text-sm font-semibold text-gray-900">02:15:33</div>
                  </div>
                </div>
              </div>

              <div className="w-px h-8 bg-gray-200 hidden lg:block"></div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:shadow-lg hover:shadow-amber-200"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Decorative Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default HomeTabbar;