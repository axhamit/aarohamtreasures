"use client";
import React, { useState } from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { 
  Send, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Shield,
  Truck,
  RefreshCw,
  Headphones,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Heart
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  // Working Hours
  const workingHours = {
    weekdays: "10:00 AM - 8:00 PM",
    weekend: "11:00 AM - 6:00 PM"
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      
      <Container>
        <FooterTop />
        
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-5">
            <div className="transform transition-transform hover:scale-105 duration-300">
              <Logo className="text-2xl" />
            </div>
            <SubText className="text-gray-600 leading-relaxed">
              Discover curated furniture collections at Aaroham Treasure, blending
              style and comfort to elevate your living spaces.
            </SubText>
            
            {/* Contact Info - Updated with Bangalore location */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <MapPin className="w-4 h-4 text-amber-600 group-hover:text-white" />
                </div>
                <span className="flex-1">#45, Brigade Road, Bangalore - 560001, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <Phone className="w-4 h-4 text-amber-600 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span>+91 80500 18073</span>
                  <span className="text-xs text-gray-400">(10 AM - 8 PM, Mon-Sat)</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <Mail className="w-4 h-4 text-amber-600 group-hover:text-white" />
                </div>
                <span>care@aarohamtresure.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex flex-col text-xs">
                  <span>Mon-Fri: {workingHours.weekdays}</span>
                  <span>Sat-Sun: {workingHours.weekend}</span>
                </div>
              </div>
            </div>
            
            <SocialMedia
              className="text-darkColor/60 pt-2"
              iconClassName="border-darkColor/60 hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <div className="relative inline-block mb-5">
              <SubTitle className="text-lg font-bold text-gray-900">
                Quick Links
              </SubTitle>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
            </div>
            <ul className="space-y-3 mt-5">
              {quickLinksData?.map((item) => (
                <li key={item?.title} className="group">
                  <Link
                    href={item?.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-all duration-300 group-hover:translate-x-2"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="font-medium">{item?.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Categories */}
          <div>
            <div className="relative inline-block mb-5">
              <SubTitle className="text-lg font-bold text-gray-900">
                Categories
              </SubTitle>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
            </div>
            <ul className="space-y-3 mt-5">
              {categoriesData?.map((item) => (
                <li key={item?.title} className="group">
                  <Link
                    href={`/category/${item?.href}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-all duration-300 group-hover:translate-x-2"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="font-medium">{item?.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div>
            <div className="relative inline-block mb-5">
              <SubTitle className="text-lg font-bold text-gray-900">
                Newsletter
              </SubTitle>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
            </div>
            <SubText className="text-gray-600 mb-5">
              Subscribe to our newsletter to receive updates and exclusive offers
            </SubText>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative group">
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 pr-12 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {isSubscribed && (
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg text-center animate-in fade-in slide-in-from-top-2">
                  Thank you for subscribing! 🎉
                </div>
              )}
            </form>
            
            {/* Trust Badges */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                Why Shop With Us
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-600 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <Shield className="w-3 h-3 text-green-600 group-hover:text-white" />
                  </div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <Truck className="w-3 h-3 text-blue-600 group-hover:text-white" />
                  </div>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                    <RefreshCw className="w-3 h-3 text-purple-600 group-hover:text-white" />
                  </div>
                  <span>30 Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                    <Headphones className="w-3 h-3 text-amber-600 group-hover:text-white" />
                  </div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 text-center md:text-left flex items-center gap-1">
              © {new Date().getFullYear()} <Logo className="inline text-sm" />. 
              All rights reserved. | Crafted with <Heart className="w-3 h-3 text-red-500 inline mx-1" /> for luxury shopping
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Secure payments by</span>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-mono hover:bg-amber-100 transition-colors cursor-pointer">VISA</div>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-mono hover:bg-amber-100 transition-colors cursor-pointer">Mastercard</div>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-mono hover:bg-amber-100 transition-colors cursor-pointer">PayPal</div>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-mono hover:bg-amber-100 transition-colors cursor-pointer">Amex</div>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-mono hover:bg-amber-100 transition-colors cursor-pointer">UPI</div>
              </div>
            </div>
            
            {/* Language/Currency Selector */}
            <div className="flex gap-3">
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="text-xs bg-transparent border border-gray-200 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:border-amber-500 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="INR">INR ₹</option>
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
                <option value="GBP">GBP £</option>
              </select>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-xs bg-transparent border border-gray-200 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:border-amber-500 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
                <option value="Kannada">ಕನ್ನಡ</option>
                <option value="Spanish">Español</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Location Badge - Bangalore Specific */}
        <div className="absolute bottom-20 right-4 md:bottom-24 md:right-8 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-1.5 border border-amber-200">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Now in Bangalore</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;