"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Star,
  Gift,
  Zap,
  Download,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  Trophy,
  Heart,
  Package,
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

export default function OrderSuccessPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<Order | null>(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("sobgamecoin_orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === params.orderId)

    if (foundOrder && foundOrder.adminApproved) {
      setOrder(foundOrder)

      // Update order status to processing
      const updatedOrders = orders.map((o: Order) => {
        if (o.id === foundOrder.id) {
          return { ...o, status: "processing" }
        }
        return o
      })
      localStorage.setItem("sobgamecoin_orders", JSON.stringify(updatedOrders))
    } else {
      router.push("/products")
    }

    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000)
  }, [params.orderId, router])

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-bounce text-2xl ${
                i % 4 === 0
                  ? "text-yellow-400"
                  : i % 4 === 1
                    ? "text-green-400"
                    : i % 4 === 2
                      ? "text-blue-400"
                      : "text-purple-400"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {i % 4 === 0 ? "🎉" : i % 4 === 1 ? "✨" : i % 4 === 2 ? "🎊" : "⭐"}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
              <Trophy className="h-16 w-16 text-white animate-bounce" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
              <Heart className="h-5 w-5 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🎉 Congratulations! 🎉
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Verified Successfully!</h2>
          <p className="text-gray-600 text-xl">Your order has been approved and is now being processed</p>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <Badge className="bg-green-100 text-green-800 border-green-300 text-lg px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Verified & Approved
            </Badge>
          </div>
        </div>

        {/* Success Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-green-800 text-lg mb-2">Payment Verified</h3>
              <p className="text-green-600 text-sm">Your payment has been confirmed by our admin</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-blue-800 text-lg mb-2">Processing Started</h3>
              <p className="text-blue-600 text-sm">Your order is now being prepared for delivery</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-purple-800 text-lg mb-2">Ready Soon</h3>
              <p className="text-purple-600 text-sm">Digital products will be delivered within 5-15 minutes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Order Details</h3>
                      <p className="text-sm text-gray-600">Your verified order information</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono text-lg px-3 py-1">
                    {order.id}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-600 font-semibold">Verification Number</p>
                      <p className="font-mono text-lg text-green-800">{order.verificationNumber}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-semibold">Approval Code</p>
                      <p className="font-mono text-lg text-blue-800">{order.approvalNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-semibold">Customer Name</p>
                      <p className="font-semibold text-purple-800">{order.customerInfo.name}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-orange-600 font-semibold">Total Amount</p>
                      <p className="font-bold text-xl text-orange-800">৳{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">Order Items:</h4>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover shadow-md"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-500">{item.sellerId}</p>
                        <p className="font-bold text-blue-600">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-green-50">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-emerald-200">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">Order Processing</h4>
                      <p className="text-sm text-emerald-600">Our team is now preparing your digital products</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-blue-200">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Quality Check</h4>
                      <p className="text-sm text-blue-600">We verify all products before delivery</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-purple-200">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">Instant Delivery</h4>
                      <p className="text-sm text-purple-600">Products delivered to your email within 5-15 minutes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href={`/order-tracking/${order.id}`}>
                    <Package className="h-4 w-4 mr-2" />
                    Track Your Order
                  </Link>
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href="/products">
                    <Star className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>

                <Button
                  className="w-full bg-transparent border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold"
                  asChild
                >
                  <Link
                    href={`https://wa.me/8801622839616?text=Thank you for approving my order ${order.id}! 🎉`}
                    target="_blank"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Thank Admin
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Gift className="h-4 w-4 text-white" />
                  </div>
                  Delivery Info
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-white border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Estimated Delivery</span>
                    </div>
                    <p className="text-purple-600 font-bold">5-15 minutes</p>
                  </div>

                  <div className="bg-white border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Download className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Delivery Method</span>
                    </div>
                    <p className="text-purple-600">Email + SMS notification</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-purple-700 text-center">
                    <strong>🎉 Congratulations!</strong>
                    <br />
                    You'll receive your digital products shortly!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  Special Offer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎁</div>
                  <h4 className="font-bold text-yellow-800 mb-2">Get 15% Off Next Order!</h4>
                  <p className="text-sm text-yellow-600 mb-4">
                    Use code: <strong>VERIFIED15</strong>
                  </p>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Valid for 7 days</Badge>
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
