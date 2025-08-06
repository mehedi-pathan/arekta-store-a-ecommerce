"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Clock,
  MessageCircle,
  Copy,
  ArrowLeft,
  Shield,
  AlertCircle,
  Phone,
  Mail,
  Gift,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  sellerId: string
}

interface Order {
  id: string
  verificationNumber: string
  items: OrderItem[]
  customerInfo: {
    name: string
    email: string
    phone: string
    gameId: string
    transactionId: string
  }
  paymentMethod: string
  subtotal: number
  discount: number
  discountAmount: number
  total: number
  status: string
  adminApproved: boolean
  approvalNumber: string
  createdAt: string
  estimatedDelivery: string
}

export default function OrderVerificationPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<Order | null>(null)
  const [approvalCode, setApprovalCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("sobgamecoin_orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === params.orderId)

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push("/products")
    }
  }, [params.orderId, router])

  const copyVerificationNumber = () => {
    if (order) {
      navigator.clipboard.writeText(order.verificationNumber)
      toast({
        title: "Verification Number Copied! 📋",
        description: "Send this number to admin via WhatsApp",
      })
    }
  }

  const handleVerification = () => {
    if (!order || !approvalCode.trim()) {
      toast({
        title: "Please enter approval code",
        description: "Enter the approval code provided by admin",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      // Update order in localStorage
      const orders = JSON.parse(localStorage.getItem("sobgamecoin_orders") || "[]")
      const updatedOrders = orders.map((o: Order) => {
        if (o.id === order.id) {
          return {
            ...o,
            adminApproved: true,
            approvalNumber: approvalCode,
            status: "verified",
          }
        }
        return o
      })
      localStorage.setItem("sobgamecoin_orders", JSON.stringify(updatedOrders))

      toast({
        title: "Order Verified Successfully! 🎉",
        description: "Your order has been approved and is now being processed",
      })

      router.push(`/order-success/${order.id}`)
      setIsVerifying(false)
    }, 2000)
  }

  const paymentMethods = {
    bkash: { name: "bKash", icon: "📱", color: "bg-pink-500" },
    nagad: { name: "Nagad", icon: "💰", color: "bg-orange-500" },
    rocket: { name: "Rocket", icon: "🚀", color: "bg-purple-500" },
    bank: { name: "Bank Transfer", icon: "🏦", color: "bg-blue-500" },
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Verification Required</h1>
          <p className="text-gray-600 text-lg">Please verify your order with our admin to proceed</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Verification Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Send Verification Number */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  Step 1: Send Verification Number
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-orange-800 text-lg">Your Verification Number</h3>
                      <p className="text-orange-600 text-sm">Send this number to admin via WhatsApp</p>
                    </div>
                    <Button
                      onClick={copyVerificationNumber}
                      variant="outline"
                      className="border-orange-300 hover:bg-orange-100 bg-transparent"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-white border-2 border-orange-300 rounded-lg p-4 text-center">
                    <span className="font-mono text-3xl font-bold text-orange-600 tracking-wider">
                      {order.verificationNumber}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">What to send to admin:</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>
                          • Your verification number: <strong>{order.verificationNumber}</strong>
                        </p>
                        <p>
                          • Your order ID: <strong>{order.id}</strong>
                        </p>
                        <p>
                          • Your transaction ID: <strong>{order.customerInfo.transactionId}</strong>
                        </p>
                        <p>
                          • Payment method:{" "}
                          <strong>{paymentMethods[order.paymentMethod as keyof typeof paymentMethods]?.name}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link
                    href={`https://wa.me/8801622839616?text=Hi! I need verification for my order.%0A%0AVerification Number: ${order.verificationNumber}%0AOrder ID: ${order.id}%0ATransaction ID: ${order.customerInfo.transactionId}%0APayment Method: ${paymentMethods[order.paymentMethod as keyof typeof paymentMethods]?.name}%0ATotal Amount: ৳${order.total.toLocaleString()}`}
                    target="_blank"
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    Send to Admin via WhatsApp
                    <Phone className="h-5 w-5 ml-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Step 2: Enter Approval Code */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  Step 2: Enter Approval Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Waiting for Admin Approval</h4>
                      <p className="text-sm text-green-700">
                        After sending your verification number, the admin will check your payment and provide you with
                        an approval code. Enter that code below to complete your order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="approvalCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Approval Code from Admin *
                    </Label>
                    <Input
                      id="approvalCode"
                      type="text"
                      placeholder="Enter approval code from admin"
                      value={approvalCode}
                      onChange={(e) => setApprovalCode(e.target.value.toUpperCase())}
                      className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-lg text-center font-mono text-lg"
                    />
                  </div>

                  <Button
                    onClick={handleVerification}
                    disabled={!approvalCode.trim() || isVerifying}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isVerifying ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Verifying Order...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-3" />
                        Verify Order
                        <Star className="h-5 w-5 ml-3" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Order ID:</span>
                    <Badge variant="outline" className="font-mono">
                      {order.id}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Items:</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method:</span>
                    <span>{paymentMethods[order.paymentMethod as keyof typeof paymentMethods]?.name}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">৳{order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-yellow-700 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">Pending Verification</span>
                  </div>
                  <p className="text-sm text-yellow-600">Your order is waiting for admin approval</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                    <Gift className="h-4 w-4 text-white" />
                  </div>
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.sellerId}</p>
                        <p className="font-bold text-blue-600 text-sm">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  Admin Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>+880 1622-839616</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>admin@sobgamecoin.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Available 24/7</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> Admin typically responds within 5-15 minutes during business hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
