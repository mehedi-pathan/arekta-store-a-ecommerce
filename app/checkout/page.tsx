"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle,
  Copy,
  ArrowLeft,
  Shield,
  Clock,
  Zap,
  CreditCard,
  MessageCircle,
  Timer,
  Gift,
  Sparkles,
  Check,
  AlertCircle,
  User,
  Mail,
  PhoneIcon,
  Gamepad2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const paymentMethods = [
  {
    id: "bkash",
    name: "bKash",
    type: "Mobile Banking",
    number: "01622839616",
    icon: "📱",
    color: "bg-pink-500",
    borderColor: "border-pink-200",
    bgColor: "bg-pink-50",
    instructions: "Send money to the number above and provide the transaction ID",
    popular: true,
  },
  {
    id: "nagad",
    name: "Nagad",
    type: "Mobile Banking",
    number: "01622839616",
    icon: "💰",
    color: "bg-orange-500",
    borderColor: "border-orange-200",
    bgColor: "bg-orange-50",
    instructions: "Send money to the number above and provide the transaction ID",
    popular: true,
  },
  {
    id: "rocket",
    name: "Rocket",
    type: "Mobile Banking",
    number: "01622839616",
    icon: "🚀",
    color: "bg-purple-500",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50",
    instructions: "Send money to the number above and provide the transaction ID",
    popular: false,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    type: "All Banks & Cards",
    number: "Contact for details",
    icon: "🏦",
    color: "bg-blue-500",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    instructions: "Contact our support for bank transfer details",
    popular: false,
  },
]

// Generate order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `SOB-${timestamp}-${randomStr}`.toUpperCase()
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    gameId: "",
    transactionId: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [promoTimeLeft, setPromoTimeLeft] = useState(3600) // 1 hour in seconds
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) {
      router.push("/products")
    }
  }, [items, router])

  // Promo countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setPromoTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied! 📋",
      description: "Payment number copied to clipboard",
    })
  }

  // Apply promo code
  const applyPromoCode = () => {
    const validCodes = {
      WELCOME10: 10,
      SAVE15: 15,
      NEWUSER: 20,
      SPECIAL25: 25,
    }

    if (validCodes[promoCode.toUpperCase() as keyof typeof validCodes]) {
      const discountPercent = validCodes[promoCode.toUpperCase() as keyof typeof validCodes]
      setDiscount(discountPercent)
      toast({
        title: "Promo Code Applied! 🎉",
        description: `You saved ${discountPercent}% on your order!`,
      })
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  const finalTotal = total - (total * discount) / 100

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Generate order and verification number
    const orderId = generateOrderId()
    const verificationNumber = Math.random().toString(36).substring(2, 8).toUpperCase()

    const orderData = {
      id: orderId,
      verificationNumber: verificationNumber,
      items: items,
      customerInfo: customerInfo,
      paymentMethod: selectedPayment,
      subtotal: total,
      discount: discount,
      discountAmount: (total * discount) / 100,
      total: finalTotal,
      status: "pending_verification",
      adminApproved: false,
      approvalNumber: "",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    }

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("sobgamecoin_orders") || "[]")
    existingOrders.push(orderData)
    localStorage.setItem("sobgamecoin_orders", JSON.stringify(existingOrders))

    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Order ID: ${orderId} - Please verify with admin to complete your order`,
      })
      clearCart()
      router.push(`/order-verification/${orderId}`)
      setIsProcessing(false)
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate customer info
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        toast({
          title: "Please fill in all required fields",
          description: "Name, email, and phone are required to continue.",
          variant: "destructive",
        })
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      // Validate payment method
      if (!selectedPayment) {
        toast({
          title: "Please select a payment method",
          description: "Choose your preferred payment method to continue.",
          variant: "destructive",
        })
        return
      }
      if (selectedPayment !== "bank" && !customerInfo.transactionId) {
        toast({
          title: "Transaction ID required",
          description: "Please provide the transaction ID after making payment.",
          variant: "destructive",
        })
        return
      }
      setCurrentStep(3)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = [
    { id: 1, name: "Information", icon: User },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Confirmation", icon: CheckCircle },
  ]

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 animate-spin" />
                  Special Promo Code Available!
                </h3>
                <p className="text-white/90 text-sm">Get exclusive discounts on your order - Limited time offer!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="flex items-center space-x-1 text-white/90 text-sm mb-1">
                  <Timer className="h-4 w-4" />
                  <span>Offer ends in:</span>
                </div>
                <div className="font-mono text-xl font-bold bg-white/20 px-3 py-1 rounded-lg">
                  {formatTime(promoTimeLeft)}
                </div>
              </div>

              <Button
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link
                  href="https://wa.me/8801622839616?text=Hi! I want to get the promo code for my order"
                  target="_blank"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Promo Code
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>

          <div className="text-center mb-8 ">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase safely and securely</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center flex-col lg:flex-row mb-8">
            <div className="flex items-center space-x-0 lg:space-x-4 flex-col lg:flex-row gap-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-col lg:flex-row">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <span className={`ml-2 font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"}`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="professional-card sticky top-24 shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover shadow-sm"
                        />
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.sellerId}</p>
                        <p className="font-bold text-blue-600">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Section */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                  <Label htmlFor="promoCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Promo Code
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="promoCode"
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyPromoCode} variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 mt-2 font-semibold">✅ {discount}% discount applied!</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%):</span>
                      <span>-৳{((total * discount) / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-600">
                    <span>Delivery:</span>
                    <span className="font-semibold">Free ✨</span>
                  </div>
                  <div className="flex justify-between text-orange-600">
                    <span>Processing Fee:</span>
                    <span className="font-semibold">Free 🎉</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total:</span>
                    <span className="text-blue-600">৳{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center text-sm text-blue-700">
                    <Zap className="h-4 w-4 mr-2 text-emerald-500" />
                    <span className="font-medium">Instant delivery (5-15 minutes)</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="font-medium">100% authentic products</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Clock className="h-4 w-4 mr-2 text-orange-500" />
                    <span className="font-medium">24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <Card className="professional-card shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gameId" className="text-sm font-semibold text-gray-700 flex items-center">
                          <Gamepad2 className="h-4 w-4 mr-2 text-gray-500" />
                          Game ID (if applicable)
                        </Label>
                        <Input
                          id="gameId"
                          type="text"
                          placeholder="PUBG ID, Apple ID, etc."
                          value={customerInfo.gameId}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, gameId: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <Card className="professional-card shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      Payment Method
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-2">Choose your preferred payment method</p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            selectedPayment === method.id
                              ? `${method.borderColor} ${method.bgColor} shadow-lg scale-105`
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          {method.popular && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              Popular
                            </div>
                          )}

                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}
                            >
                              {method.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.type}</p>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 transition-all ${
                                selectedPayment === method.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                              }`}
                            >
                              {selectedPayment === method.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Details */}
                    {selectedPayment && (
                      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-blue-200 shadow-inner">
                        <CardContent className="p-6">
                          {(() => {
                            const method = paymentMethods.find((m) => m.id === selectedPayment)
                            return (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                  <span className="font-semibold text-gray-700">Payment Number:</span>
                                  <div className="flex items-center space-x-3">
                                    <Badge
                                      variant="outline"
                                      className="font-mono text-lg px-3 py-1 bg-blue-50 border-blue-200"
                                    >
                                      {method?.number}
                                    </Badge>
                                    {method?.number !== "Contact for details" && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(method?.number || "")}
                                        className="hover:bg-blue-100"
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                  <div className="flex items-start space-x-3">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-700 leading-relaxed">{method?.instructions}</p>
                                  </div>
                                </div>

                                {selectedPayment !== "bank" && (
                                  <div className="space-y-2">
                                    <Label htmlFor="transactionId" className="text-sm font-semibold text-gray-700">
                                      Transaction ID *
                                    </Label>
                                    <Input
                                      id="transactionId"
                                      type="text"
                                      placeholder="Enter transaction ID after payment"
                                      value={customerInfo.transactionId}
                                      onChange={(e) =>
                                        setCustomerInfo({ ...customerInfo, transactionId: e.target.value })
                                      }
                                      className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                                      required={selectedPayment !== "bank"}
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          })()}
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex justify-between flex-col lg:flex-row">
                      <Button type="button" onClick={prevStep} variant="outline">
                        Back
                      </Button>
                      <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 mt-8 lg:mt-auto">
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Order Confirmation */}
              {currentStep === 3 && (
                <Card className="professional-card shadow-xl border-0 bg-gradient-to-r from-blue-50 to-emerald-50">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      Order Confirmation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Order Summary */}
                      <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 mb-4 text-lg">Order Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>
                              <strong>Name:</strong> {customerInfo.name}
                            </p>
                            <p>
                              <strong>Email:</strong> {customerInfo.email}
                            </p>
                            <p>
                              <strong>Phone:</strong> {customerInfo.phone}
                            </p>
                            {customerInfo.gameId && (
                              <p>
                                <strong>Game ID:</strong> {customerInfo.gameId}
                              </p>
                            )}
                          </div>
                          <div>
                            <p>
                              <strong>Payment Method:</strong>{" "}
                              {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                            </p>
                            {customerInfo.transactionId && (
                              <p>
                                <strong>Transaction ID:</strong> {customerInfo.transactionId}
                              </p>
                            )}
                            <p>
                              <strong>Total Amount:</strong> ৳{finalTotal.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border-2 border-emerald-200 rounded-xl p-6">
                        <h3 className="font-bold text-emerald-800 mb-4 flex items-center text-lg">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Order Processing Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <Zap className="h-4 w-4 text-emerald-600" />
                            </div>
                            <span className="text-sm text-emerald-700">Order processed within 5-15 minutes</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Mail className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-emerald-700">Confirmation via email and SMS</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Gift className="h-4 w-4 text-orange-600" />
                            </div>
                            <span className="text-sm text-emerald-700">Digital products delivered instantly</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <MessageCircle className="h-4 w-4 text-purple-600" />
                            </div>
                            <span className="text-sm text-emerald-700">24/7 support available</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between flex-col lg:flex-row">
                        <Button type="button" onClick={prevStep} variant="outline">
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mt-8 lg:mt-0"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              Processing Order...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-5 w-5 mr-3" />
                              Complete Order - ৳{finalTotal.toLocaleString()}
                              <Sparkles className="h-5 w-5 ml-3" />
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500 text-center leading-relaxed">
                        By placing this order, you agree to our{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
