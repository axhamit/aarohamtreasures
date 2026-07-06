"use client";
import { Clock, Mail, MapPin, Phone, Headphones, MessageCircle, ChevronRight } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: string;
  link: string;
}

const data: ContactItemData[] = [
  {
    title: "Visit Our Store",
    subtitle: "Bangalore, India",
    action: "Get Directions",
    link: "#",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Call Support",
    subtitle: "+12 958 648 597",
    action: "Call Now",
    link: "tel:+12958648597",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    title: "Business Hours",
    subtitle: "Mon - Sat: 10AM - 7PM",
    action: "View Schedule",
    link: "#",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Email Us",
    subtitle: "support@aarohamtresure.com",
    action: "Send Message",
    link: "mailto:support@aarohamtresure.com",
    icon: <Mail className="h-5 w-5" />,
  },
];

const FooterTop = () => {
  return (
    <div className="py-12 border-b border-gray-100">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
          <Headphones className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-semibold text-amber-700 uppercase">24/7 Customer Support</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Need Assistance?</h3>
        <p className="text-gray-600 mt-2">Our team is ready to help you</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="group block"
          >
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium text-amber-600 group-hover:gap-2 transition-all">
                    <span>{item.action}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Live Chat Button */}
      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-amber-200 transition-all duration-300 group">
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Start Live Chat</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </button>
        <p className="text-xs text-gray-500 mt-3">Average response time: &lt; 2 minutes</p>
      </div>
    </div>
  );
};

export default FooterTop;