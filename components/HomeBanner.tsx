import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { banner_1 } from "@/images";
import PriceFormatter from "./PriceFormatter";
import { ArrowRight, Star, Headphones } from "lucide-react";

const HomeBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-48 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-48 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>
      
      {/* Decorative Lines */}
      <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>
      <div className="absolute bottom-20 right-10 w-px h-32 bg-gradient-to-t from-transparent via-amber-400/50 to-transparent"></div>
      
      <div className="relative px-6 py-16 md:px-12 lg:px-20 xl:px-28 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-lg md:inline-flex">
            <Headphones className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium tracking-wider text-white/80 uppercase">Limited Time Offer</span>
          </div>
          
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
                Grab Upto 50% off
              </span>
              <br />
              <span className="text-white/90">on Selected</span>
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
          Cloths & Accessories
                </span>
                <svg className="absolute bottom-2 left-0 w-full h-3 -z-0" viewBox="0 0 300 20" preserveAspectRatio="none">
                  <path d="M0,10 Q150,0 300,10" stroke="url(#underlineGradient)" strokeWidth="3" fill="none"/>
                  <defs>
                    <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            
            <p className="text-white/60 text-base md:text-lg max-w-md mx-auto md:mx-0">
              Experience premium sound quality with our luxury collection. 
              Limited stock available.
            </p>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>24-Month Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Free Shipping</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <span className="relative z-10">Shop Now</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105"
            >
              View Collection
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-4 flex items-center gap-6 justify-center md:justify-start text-white/40 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
        
        {/* Right Image Section */}
        <div className="flex-1 relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
          
          {/* Image Container */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-white/5 to-transparent p-2 rounded-2xl backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={banner_1}
                  alt="Luxury Headphones"
                  className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-amber-400/30">
                  <div className="text-center">
                      <div className="text-xs text-white/60 line-through"><PriceFormatter amount={299} /></div>
                      <div className="text-xl font-bold text-amber-400"><PriceFormatter amount={149} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
        </div>
      </div>
      
      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
    </div>
  );
};

export default HomeBanner;