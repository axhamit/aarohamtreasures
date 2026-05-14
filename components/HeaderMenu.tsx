"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Home, ShoppingBag, Grid, Info, Phone, Tag, Crown } from "lucide-react";

const HeaderMenu = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getMenuIcon = (title: string) => {
    const icons: { [key: string]: JSX.Element } = {
      "home": <Home className="w-4 h-4" />,
      "shop": <ShoppingBag className="w-4 h-4" />,
      "collections": <Grid className="w-4 h-4" />,
      "about": <Info className="w-4 h-4" />,
      "contact": <Phone className="w-4 h-4" />,
      "deals": <Tag className="w-4 h-4" />,
    };
    return icons[title.toLowerCase()] || <Sparkles className="w-4 h-4" />;
  };

  if (!mounted) {
    return (
      <div className="hidden md:flex w-1/3 items-center justify-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <nav className="hidden md:flex w-1/3 items-center justify-center">
      <div className="flex items-center gap-1">
        {headerData?.map((item) => {
          const isActive = pathname === item?.href;
          const hasDropdown = item?.dropdown && item.dropdown.length > 0;
          
          return (
            <div
              key={item?.title}
              className="relative"
              onMouseEnter={() => hasDropdown && setActiveDropdown(item?.title)}
              onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
            >
              <Link
                href={item?.href}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-medium 
                  transition-all duration-300 flex items-center gap-1.5
                  ${isActive 
                    ? "text-amber-600" 
                    : "text-gray-700 hover:text-amber-600"
                  }
                `}
              >
                {/* Animated Icon Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-amber-50 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {getMenuIcon(item?.title)}
                  </span>
                  <span>{item?.title}</span>
                  {hasDropdown && (
                    <motion.div
                      animate={{ rotate: activeDropdown === item?.title ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                  )}
                </span>
              </Link>

              {/* Animated Dropdown */}
              <AnimatePresence>
                {hasDropdown && activeDropdown === item?.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem: any, idx: number) => (
                        <motion.div
                          key={dropdownItem.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link
                            href={dropdownItem.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent hover:text-amber-600 transition-all duration-200"
                          >
                            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                              {getMenuIcon(dropdownItem.title)}
                            </span>
                            <span>{dropdownItem.title}</span>
                            {dropdownItem.isNew && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                                New
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default HeaderMenu;