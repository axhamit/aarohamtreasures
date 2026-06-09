"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag, Check, Shield, Sparkles, TrendingUp } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import { useState, useEffect } from "react";

interface Props {
  product: Product;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "luxury";
  size?: "sm" | "default" | "lg";
  showQuantitySelector?: boolean;
}

const AddToCartButton = ({ 
  product, 
  className, 
  variant = "default",
  size = "default",
  showQuantitySelector = true 
}: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState(false);

  const getStockStatus = () => {
    if (isOutOfStock) return { text: "Out of Stock", color: "text-red-600", bg: "bg-red-50" };
    if ((product?.stock as number) < 5) return { text: "Only few left", color: "text-orange-600", bg: "bg-orange-50" };
    if ((product?.stock as number) < 20) return { text: "In Stock", color: "text-green-600", bg: "bg-green-50" };
    return { text: "Available", color: "text-emerald-600", bg: "bg-emerald-50" };
  };

  const stockStatus = getStockStatus();

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      setIsAdded(true);
      setRipple(true);
      
      // Custom toast with animation
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Added to Cart!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {product?.name?.substring(0, 30)}... added successfully
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-amber-600 hover:text-amber-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), { duration: 2000 });
      
      setTimeout(() => setIsAdded(false), 2000);
      setTimeout(() => setRipple(false), 500);
    } else {
      toast.error("Cannot add more than available stock", {
        icon: "⚠️",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm": return "h-9 text-sm";
      case "lg": return "h-12 text-base";
      default: return "h-10 text-sm";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "bg-transparent border-2 border-amber-500 text-amber-600 hover:bg-amber-50 hover:border-amber-600";
      case "ghost":
        return "bg-transparent hover:bg-amber-50 text-gray-700 hover:text-amber-600 shadow-none";
      case "luxury":
        return "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-amber-600 hover:to-amber-700 shadow-xl";
      default:
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-xl";
    }
  };

  if (itemCount && showQuantitySelector) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-gray-600">Quantity</span>
            </div>
            <QuantityButtons product={product} />
          </div>
          
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-medium text-gray-500">
                  Free delivery on ₹999+
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Subtotal</span>
                <PriceFormatter
                  amount={product?.price ? product?.price * itemCount : 0}
                  className="text-sm font-bold text-gray-900 ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Stock Status Indicator */}
      {!isOutOfStock && (
        <div className="mb-2 flex items-center gap-2">
          <div className={cn("px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1", stockStatus.bg, stockStatus.color)}>
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
            {stockStatus.text}
          </div>
          {(product?.stock as number) > 50 && (
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <Sparkles className="w-3 h-3" />
              <span>Premium quality</span>
            </div>
          )}
        </div>
      )}

      {/* Main Button */}
      <div className="relative overflow-hidden">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "relative w-full rounded-xl font-semibold tracking-wide transition-all duration-300",
            getSizeClasses(),
            getVariantClasses(),
            isOutOfStock && "opacity-60 cursor-not-allowed bg-gray-300 hover:bg-gray-300",
            className
          )}
        >
          {/* Ripple Effect */}
          {ripple && (
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute inset-0 bg-white/30 animate-ripple"></span>
            </span>
          )}
          
          {/* Shine Effect on Hover */}
          {isHovered && !isOutOfStock && variant !== "outline" && (
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
          )}
          
          {/* Button Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isAdded ? (
              <>
                <Check className="w-4 h-4 animate-in zoom-in" />
                <span>Added to Cart!</span>
              </>
            ) : isOutOfStock ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Out of Stock</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Add to Cart</span>
                {variant === "luxury" && (
                  <TrendingUp className="w-3.5 h-3.5 opacity-70" />
                )}
              </>
            )}
          </span>
        </Button>
      </div>

      {/* Guarantee Text */}
      {!isOutOfStock && variant !== "ghost" && (
        <p className="text-xs text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" />
          Secure checkout • 30-day returns
        </p>
      )}
    </div>
  );
};

export default AddToCartButton;