"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Clock,
  Package,
  MessageCircle,
  Download,
  Star,
  ArrowLeft,
  Copy,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Zap,
  Shield,
  Gift,
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
  createdAt: string
  estimatedDelivery: string
  adminApproved?: boolean
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<Order | null>(null)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("sobgamecoin_orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === params.orderId)

    if (foundOrder) {
      setOrder(foundOrder)
      // If order is not verified yet, redirect to verification
      if (foundOrder.status === "pending_verification" && !foundOrder.adminApproved) {
        router.push(`/order-verification/${foundOrder.id}`)
      }
    } else {
      router.push("/products")
    }
  }, [params.orderId, router])

  useEffect(() => {
    if (order) {
      const updateTimeLeft = () => {
        const now = new Date().getTime()
        const deliveryTime = new Date(order.estimatedDelivery).getTime()
        const difference = deliveryTime - now

        if (difference > 0) {
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          setTimeLeft(`${minutes}m ${seconds}s`)
        } else {
          setTimeLeft("Ready for delivery!")
        }
      }

      updateTimeLeft()
      const timer = setInterval(updateTimeLeft, 1000)
      return () => clearInterval(timer)
    }
  }, [order])

  const copyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.id)
      toast({
        title: "Order ID Copied! 📋",
        description: "Order ID has been copied to clipboard",
      })
    }
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
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed! 🎉</h1>
          <p className="text-gray-600 text-lg">Thank you for your purchase. Your order is being processed.</p>
        </div>

        {/* Order Status */}
        <Card className="mb-8 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <Package className="h-4 w-4 text-white" />
                </div>
                Order Status
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                <Clock className="h-3 w-3 mr-1" />
                Processing
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-green-600">Order Placed</h3>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-yellow-600">Processing</h3>
                <p className="text-sm text-gray-500">ETA: {timeLeft}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Download className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-500">Delivered</h3>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    Order Details
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="font-mono">
                      {order.id}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={copyOrderId}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.sellerId}</p>
                        <p className="font-bold text-blue-600">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          <Zap className="h-3 w-3 mr-1" />
                          Digital
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{order.customerInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold">{order.customerInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-semibold">
                          {paymentMethods[order.paymentMethod as keyof typeof paymentMethods]?.name}
                        </p>
                      </div>
                    </div>
                    {order.customerInfo.gameId && (
                      <div className="flex items-center space-x-3">
                        <Package className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Game ID</p>
                          <p className="font-semibold">{order.customerInfo.gameId}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
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
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({order.discount}%):</span>
                      <span>-৳{order.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-600">
                    <span>Delivery:</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">৳{order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-700 mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-semibold">Payment Confirmed</span>
                  </div>
                  <p className="text-sm text-green-600">Your payment has been received and is being processed.</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href={`/order-tracking/${order.id}`}>
                    <Package className="h-4 w-4 mr-2" />
                    Track Order
                  </Link>
                </Button>

                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link
                    href={`https://wa.me/8801622839616?text=Hi! I have a question about my order ${order.id}`}
                    target="_blank"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>

                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/products">
                    <Star className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Gift className="h-4 w-4 text-white" />
                  </div>
                  Delivery Info
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated Delivery</p>
                      <p className="font-semibold">{timeLeft}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Delivery Method</p>
                      <p className="font-semibold">Digital Delivery</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> Digital products will be delivered to your email address within 5-15 minutes
                    after payment confirmation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Home */}
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
