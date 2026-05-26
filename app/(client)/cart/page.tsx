"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash, Sparkles, Shield, Truck, Clock, CreditCard, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [upiLoading, setUpiLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("upi");

  // Your UPI ID - Replace with your actual business UPI ID
  const BUSINESS_UPI_ID = "yourstore@okhdfcbank";

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  // Generate UPI Payment Link
  const generateUpiLink = () => {
    const amount = getTotalPrice();
    const orderId = crypto.randomUUID().slice(0, 8);
    const merchantName = encodeURIComponent("LUXURY STORE");
    const note = encodeURIComponent(`Order #${orderId}`);
    
    // Create UPI Intent URL
    const upiUrl = `upi://pay?pa=${BUSINESS_UPI_ID}&pn=${merchantName}&am=${amount}&cu=INR&tn=${note}`;
    
    return upiUrl;
  };

  const handleUpiPayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setUpiLoading(true);
    
    try {
      const upiLink = generateUpiLink();
      
      // For mobile devices - open UPI app directly
      if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = upiLink;
        
        // Show success message after short delay (user will complete payment in UPI app)
        setTimeout(() => {
          toast.success(
            <div className="flex flex-col gap-1">
              <span>UPI app opened! Complete payment to confirm order.</span>
              <span className="text-xs">Order will be confirmed after payment verification.</span>
            </div>,
            { duration: 5000 }
          );
        }, 1000);
      } else {
        // For desktop - show QR code modal
        const qrModal = document.createElement("dialog");
        qrModal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50";
        qrModal.innerHTML = `
          <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <h3 class="text-2xl font-bold mb-4">Scan to Pay</h3>
            <div id="qr-code" class="flex justify-center mb-4"></div>
            <p class="text-sm text-gray-600 mb-4">Amount: ₹${getTotalPrice()}</p>
            <button class="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800" onclick="this.closest('dialog').close()">Close</button>
          </div>
        `;
        document.body.appendChild(qrModal);
        
        // Dynamically import QR code library
        const QRCode = (await import("qrcode")).default;
        const qrCanvas = document.createElement("canvas");
        await QRCode.toCanvas(qrCanvas, upiLink, { width: 200 });
        qrModal.querySelector("#qr-code")?.appendChild(qrCanvas);
        
        qrModal.showModal();
        qrModal.onclose = () => qrModal.remove();
        
        toast.success("Scan QR code with any UPI app to pay");
      }
      
      // Here you would typically save the order to your database with "pending" status
      // and then verify payment via webhook or polling
      
    } catch (error) {
      console.error("UPI payment error:", error);
      toast.error("Failed to initiate UPI payment. Please try again.");
    } finally {
      setUpiLoading(false);
    }
  };

  const handleCardCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    
    if (paymentMethod === "upi") {
      handleUpiPayment();
    } else {
      handleCardCheckout();
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-52 md:pb-16">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              {/* Luxury Header */}
              <div className="flex items-center justify-between py-8 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl shadow-lg">
                    <ShoppingBag className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <Title className="text-3xl md:text-4xl font-light tracking-wide">
                      Shopping Cart
                    </Title>
                    <p className="text-sm text-gray-500 mt-1">
                      {getItemCount()} {getItemCount() === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleResetCart}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <Trash className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 py-6 border-b border-gray-100">
                {[
                  { icon: Truck, text: "Free Shipping", subtext: "On orders ₹999+" },
                  { icon: Shield, text: "Secure Payments", subtext: "100% Protected" },
                  { icon: Clock, text: "Easy Returns", subtext: "30 Days Policy" },
                  { icon: Sparkles, text: "Premium Quality", subtext: "Authentic Products" },
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <badge.icon className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs font-medium">{badge.text}</p>
                      <p className="text-[10px] text-gray-400">{badge.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mt-8">
                {/* Cart Items - Luxury Styling */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                          <div className="p-4 md:p-6 flex items-center justify-between gap-4">
                            <div className="flex flex-1 gap-4">
                              {product?.images && (
                                <Link
                                  href={`/product/${product?.slug?.current}`}
                                  className="shrink-0"
                                >
                                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-50">
                                    <Image
                                      src={urlFor(product?.images[0]).url()}
                                      alt="productImage"
                                      fill
                                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                  </div>
                                </Link>
                              )}
                              <div className="flex flex-col justify-between py-1">
                                <div>
                                  <h2 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
                                    {product?.name}
                                  </h2>
                                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                                    {product?.variant}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    SKU: {product?._id?.slice(-6)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                                          <ProductSideMenu
                                            product={product}
                                            className="relative top-0 right-0"
                                          />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>Save for later</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => {
                                            deleteCartProduct(product?._id);
                                            toast.success("Removed from cart");
                                          }}
                                          className="p-1.5 rounded-full hover:bg-red-50 transition-colors"
                                        >
                                          <Trash className="w-4 h-4 text-gray-400 hover:text-red-500" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-red-500">
                                        Remove item
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                              <PriceFormatter
                                amount={(product?.price as number) * itemCount}
                                className="font-bold text-xl text-gray-900"
                              />
                              <QuantityButtons product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Summary - Luxury Sidebar */}
                <div>
                  <div className="sticky top-24">
                    {/* Payment Method Selection */}
                    <Card className="mb-6 border-0 shadow-lg rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                        <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Method
                        </CardTitle>
                      </div>
                      <CardContent className="p-6">
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={(val) => setPaymentMethod(val as "card" | "upi")}
                          className="space-y-3"
                        >
                          <div
                            className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              paymentMethod === "upi"
                                ? "border-gray-900 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setPaymentMethod("upi")}
                          >
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="flex items-center gap-3 flex-1 cursor-pointer">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <QrCode className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">UPI / QR Code</p>
                                <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm & more</p>
                              </div>
                            </Label>
                          </div>
                          
                          <div
                            className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              paymentMethod === "card"
                                ? "border-gray-900 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setPaymentMethod("card")}
                          >
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                              <div className="p-2 bg-purple-50 rounded-lg">
                                <CreditCard className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Credit / Debit Card</p>
                                <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>

                    {/* Order Total Card */}
                    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                        <CardTitle className="text-white text-lg font-semibold">
                          Order Summary
                        </CardTitle>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <PriceFormatter amount={getSubTotalPrice()} />
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-</span>
                            <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-lg font-semibold text-gray-900">Total</span>
                            <div className="text-right">
                              <PriceFormatter
                                amount={getTotalPrice()}
                                className="text-2xl font-bold text-gray-900"
                              />
                              <p className="text-xs text-gray-400">Inclusive of all taxes</p>
                            </div>
                          </div>
                        </div>

                        <Button
                          className="w-full rounded-full py-6 text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                          size="lg"
                          disabled={loading || upiLoading || !selectedAddress}
                          onClick={handleCheckout}
                        >
                          {loading || upiLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              {paymentMethod === "upi" ? "Opening UPI..." : "Processing..."}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {paymentMethod === "upi" ? (
                                <>
                                  <QrCode className="w-5 h-5" />
                                  Pay with UPI
                                </>
                              ) : (
                                <>
                                  <CreditCard className="w-5 h-5" />
                                  Pay with Card
                                </>
                              )}
                            </div>
                          )}
                        </Button>

                        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3" />
                          Secure encrypted payment
                        </p>
                      </CardContent>
                    </Card>

                    {/* Delivery Address Card */}
                    {addresses && addresses.length > 0 && (
                      <Card className="mt-6 border-0 shadow-lg rounded-2xl overflow-hidden">
                        <div className="bg-white px-6 py-4 border-b border-gray-100">
                          <CardTitle className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                            <Truck className="w-5 h-5 text-gray-600" />
                            Delivery Address
                          </CardTitle>
                        </div>
                        <CardContent className="p-6">
                          <RadioGroup
                            defaultValue={addresses?.find((addr) => addr.default)?._id.toString()}
                            className="space-y-3"
                          >
                            {addresses?.map((address) => (
                              <div
                                key={address?._id}
                                onClick={() => setSelectedAddress(address)}
                                className={`flex items-start space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                  selectedAddress?._id === address?._id
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <RadioGroupItem value={address?._id.toString()} id={address?._id.toString()} />
                                <Label
                                  htmlFor={`address-${address?._id}`}
                                  className="grid gap-1 flex-1 cursor-pointer"
                                >
                                  <span className="font-semibold text-gray-900">{address?.name}</span>
                                  <span className="text-sm text-gray-600">
                                    {address.address}, {address.city}, {address.state} {address.zip}
                                  </span>
                                  {address.default && (
                                    <span className="text-xs text-green-600 font-medium mt-1">Default</span>
                                  )}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button variant="outline" className="w-full mt-6 rounded-full border-gray-300 hover:border-gray-900 hover:bg-transparent">
                            + Add New Address
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Order Summary */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
                <div className="bg-white/95 backdrop-blur-lg rounded-t-2xl shadow-2xl p-5 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Total Amount</span>
                    <PriceFormatter amount={getTotalPrice()} className="text-xl font-bold text-gray-900" />
                  </div>
                  <Button
                    className="w-full rounded-full py-5 text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-700"
                    disabled={loading || upiLoading}
                    onClick={handleCheckout}
                  >
                    {loading || upiLoading ? "Processing..." : paymentMethod === "upi" ? "Pay with UPI" : "Proceed to Pay"}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;