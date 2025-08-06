"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  Package,
  MessageCircle,
  Download,
  ArrowLeft,
  Truck,
  Mail,
  Phone,
  Zap,
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

const orderStatuses = [
  {
    id: "pending",
    name: "Order Placed",
    description: "Your order has been received",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-500",
  },
  {
    id: "processing",
    name: "Processing",
    description: "We're preparing your order",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500",
  },
  {
    id: "ready",
    name: "Ready for Delivery",
    description: "Your order is ready",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-500",
  },
  {
    id: "delivered",
    name: "Delivered",
    description: "Order delivered successfully",
    icon: Download,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500",
  },
]

export default function OrderTrackingPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<Order | null>(null)
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState("")
  const [progress, setProgress] = useState(25)

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("sobgamecoin_orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === params.orderId)

    if (foundOrder) {
      setOrder(foundOrder)

      // If order is not verified yet, redirect to verification
      if (foundOrder.status === "pending_verification" && !foundOrder.adminApproved) {
        router.push(`/order-verification/${foundOrder.id}`)
        return
      }

      // Simulate order progress only for verified orders
      if (foundOrder.adminApproved) {
        const orderTime = new Date(foundOrder.createdAt).getTime()
        const now = new Date().getTime()
        const elapsed = now - orderTime

        if (elapsed < 5 * 60 * 1000) {
          setCurrentStatusIndex(0)
          setProgress(25)
        } else if (elapsed < 10 * 60 * 1000) {
          setCurrentStatusIndex(1)
          setProgress(50)
        } else if (elapsed < 15 * 60 * 1000) {
          setCurrentStatusIndex(2)
          setProgress(75)
        } else {
          setCurrentStatusIndex(3)
          setProgress(100)
          foundOrder.status = "delivered"
          const updatedOrders = orders.map((o: Order) => (o.id === foundOrder.id ? foundOrder : o))
          localStorage.setItem("sobgamecoin_orders", JSON.stringify(updatedOrders))
        }
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

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const currentStatus = orderStatuses[currentStatusIndex]

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/order-confirmation/${order.id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Order Details
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Tracking</h1>
            <p className="text-gray-600">Track your order in real-time</p>
            <Badge variant="outline" className="mt-2 font-mono text-lg px-4 py-1">
              {order.id}
            </Badge>
          </div>
        </div>

        {/* Current Status */}
        <Card className="mb-8 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${currentStatus.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                  <currentStatus.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{currentStatus.name}</h2>
                  <p className="text-sm text-gray-600">{currentStatus.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">ETA</p>
                <p className="font-bold text-lg">{timeLeft}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Order Progress</span>
                <span className="text-sm text-gray-500">{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Status Timeline */}
            <div className="space-y-4">
              {orderStatuses.map((status, index) => (
                <div key={status.id} className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStatusIndex ? `${status.bgColor} text-white` : "bg-gray-200 text-gray-400"
                    } ${index === currentStatusIndex ? "animate-pulse" : ""}`}
                  >
                    <status.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${index <= currentStatusIndex ? status.color : "text-gray-400"}`}>
                      {status.name}
                    </h3>
                    <p className="text-sm text-gray-500">{status.description}</p>
                  </div>
                  {index <= currentStatusIndex && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  Order Items
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
                        <Badge
                          className={`${
                            currentStatusIndex >= 3
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-yellow-100 text-yellow-800 border-yellow-300"
                          }`}
                        >
                          {currentStatusIndex >= 3 ? (
                            <>
                              <Download className="h-3 w-3 mr-1" />
                              Ready
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Processing
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Updates */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                  Delivery Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Order Confirmed</p>
                      <p className="text-sm text-green-600">Your payment has been received and verified</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {currentStatusIndex >= 1 && (
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-yellow-800">Processing Started</p>
                        <p className="text-sm text-yellow-600">Our team is preparing your digital products</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(Date.now() - 5 * 60 * 1000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStatusIndex >= 2 && (
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-800">Ready for Delivery</p>
                        <p className="text-sm text-blue-600">Your order is ready and will be delivered shortly</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(Date.now() - 2 * 60 * 1000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStatusIndex >= 3 && (
                    <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <Download className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-800">Delivered Successfully</p>
                        <p className="text-sm text-emerald-600">Your digital products have been sent to your email</p>
                        <p className="text-xs text-gray-500 mt-1">Just now</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link
                    href={`https://wa.me/8801622839616?text=Hi! I need help with my order ${order.id}`}
                    target="_blank"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Support
                  </Link>
                </Button>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>+880 1622-839616</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>support@sobgamecoin.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>24/7 Support Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-৳{order.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">৳{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {currentStatusIndex >= 3 && (
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Products
                  </Button>
                )}

                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/products">
                    <Star className="h-4 w-4 mr-2" />
                    Shop More
                  </Link>
                </Button>

                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/dashboard/orders">
                    <Package className="h-4 w-4 mr-2" />
                    View All Orders
                  </Link>
                </Button>
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
