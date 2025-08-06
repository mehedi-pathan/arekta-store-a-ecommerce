"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  CheckCircle,
  Clock,
  Package,
  Search,
  Eye,
  MessageCircle,
  Calendar,
  Filter,
  Shield,
  Copy,
  Phone,
  Mail,
  User,
  CreditCard,
  Zap,
  X,
  Check,
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending_verification")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [approvalCode, setApprovalCode] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Get orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("sobgamecoin_orders") || "[]")
    setOrders(storedOrders.reverse()) // Show newest first
  }, [])

  useEffect(() => {
    let filtered = orders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.verificationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerInfo.phone.includes(searchTerm),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      if (statusFilter === "pending_verification") {
        filtered = filtered.filter((order) => order.status === "pending_verification" && !order.adminApproved)
      } else {
        filtered = filtered.filter((order) => order.status === statusFilter)
      }
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter])

  const generateApprovalCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setApprovalCode(code)
  }

  const approveOrder = (order: Order) => {
    if (!approvalCode.trim()) {
      toast({
        title: "Please generate approval code",
        description: "Generate an approval code before approving the order",
        variant: "destructive",
      })
      return
    }

    // Update order in localStorage
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return {
          ...o,
          adminApproved: true,
          approvalNumber: approvalCode,
          status: "verified",
          adminNotes: adminNotes,
        }
      }
      return o
    })

    localStorage.setItem("sobgamecoin_orders", JSON.stringify(updatedOrders))
    setOrders(updatedOrders)

    toast({
      title: "Order Approved Successfully! ✅",
      description: `Order ${order.id} has been approved with code: ${approvalCode}`,
    })

    // Reset form
    setSelectedOrder(null)
    setApprovalCode("")
    setAdminNotes("")
  }

  const rejectOrder = (order: Order) => {
    // Update order in localStorage
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return {
          ...o,
          status: "rejected",
          adminNotes: adminNotes,
        }
      }
      return o
    })

    localStorage.setItem("sobgamecoin_orders", JSON.stringify(updatedOrders))
    setOrders(updatedOrders)

    toast({
      title: "Order Rejected",
      description: `Order ${order.id} has been rejected`,
      variant: "destructive",
    })

    // Reset form
    setSelectedOrder(null)
    setAdminNotes("")
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${label} Copied! 📋`,
      description: `${label} has been copied to clipboard`,
    })
  }

  const getStatusBadge = (order: Order) => {
    if (order.status === "pending_verification" && !order.adminApproved) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
          <Clock className="h-3 w-3 mr-1" />
          Pending Verification
        </Badge>
      )
    } else if (order.adminApproved) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    } else if (order.status === "rejected") {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300">
          <X className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
          <Package className="h-3 w-3 mr-1" />
          {order.status}
        </Badge>
      )
    }
  }

  const paymentMethods = {
    bkash: { name: "bKash", icon: "📱", color: "bg-pink-500" },
    nagad: { name: "Nagad", icon: "💰", color: "bg-orange-500" },
    rocket: { name: "Rocket", icon: "🚀", color: "bg-purple-500" },
    bank: { name: "Bank Transfer", icon: "🏦", color: "bg-blue-500" },
  }

  const pendingCount = orders.filter((o) => o.status === "pending_verification" && !o.adminApproved).length
  const approvedCount = orders.filter((o) => o.adminApproved).length
  const totalRevenue = orders.filter((o) => o.adminApproved).reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage and approve customer orders</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-semibold">Pending Verification</p>
                    <p className="text-3xl font-bold text-orange-800">{pendingCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-semibold">Approved Orders</p>
                    <p className="text-3xl font-bold text-green-800">{approvedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold">Total Revenue</p>
                    <p className="text-3xl font-bold text-blue-800">৳{totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="shadow-lg border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Order ID, Verification Number, Name, or Phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending_verification">Pending Verification</option>
                    <option value="all">All Orders</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            {filteredOrders.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
                  <p className="text-gray-600">No orders match your current filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                              <Package className="h-4 w-4 text-white" />
                            </div>
                            <span>Order #{order.id}</span>
                          </CardTitle>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(order.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>{paymentMethods[order.paymentMethod as keyof typeof paymentMethods]?.icon}</span>
                              <span>{paymentMethods[order.paymentMethod as keyof typeof paymentMethods]?.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(order)}
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-bold text-lg text-blue-600">৳{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Customer & Payment Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Customer Info
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <strong>Name:</strong> {order.customerInfo.name}
                            </p>
                            <p>
                              <strong>Phone:</strong> {order.customerInfo.phone}
                            </p>
                            <p>
                              <strong>Email:</strong> {order.customerInfo.email}
                            </p>
                            {order.customerInfo.gameId && (
                              <p>
                                <strong>Game ID:</strong> {order.customerInfo.gameId}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Verification Info
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Verification #:</span>
                              <div className="flex items-center space-x-2">
                                <Badge className="font-mono bg-green-100 text-green-800 border-green-300">
                                  {order.verificationNumber}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(order.verificationNumber, "Verification Number")}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Transaction ID:</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-mono">{order.customerInfo.transactionId}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(order.customerInfo.transactionId, "Transaction ID")}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Order Items ({order.items.length}):</h4>
                        <div className="flex space-x-2 overflow-x-auto">
                          {order.items.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex-shrink-0 bg-gray-50 rounded-lg p-2 min-w-[200px]">
                              <div className="flex items-center space-x-2">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{item.name}</p>
                                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2 min-w-[100px] flex items-center justify-center">
                              <span className="text-sm text-gray-600">+{order.items.length - 3} more</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        {order.status === "pending_verification" && !order.adminApproved && (
                          <>
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Review & Approve
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent border-red-300 text-red-700 hover:bg-red-50"
                              onClick={() => {
                                setSelectedOrder(order)
                                setApprovalCode("")
                              }}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject Order
                            </Button>
                          </>
                        )}
                        <Button variant="outline" asChild>
                          <Link
                            href={`https://wa.me/88${order.customerInfo.phone}?text=Hello ${order.customerInfo.name}, regarding your order ${order.id}`}
                            target="_blank"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Customer
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Review Panel */}
          <div className="xl:col-span-1">
            {selectedOrder ? (
              <Card className="shadow-xl border-0 sticky top-8">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                      Order Review
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(null)
                        setApprovalCode("")
                        setAdminNotes("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Order Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Order Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Order ID:</span>
                        <Badge variant="outline" className="font-mono">
                          {selectedOrder.id}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Verification #:</span>
                        <Badge className="font-mono bg-green-100 text-green-800 border-green-300">
                          {selectedOrder.verificationNumber}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer:</span>
                        <span className="font-medium">{selectedOrder.customerInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-mono">{selectedOrder.customerInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transaction ID:</span>
                        <span className="font-mono text-xs">{selectedOrder.customerInfo.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span>{paymentMethods[selectedOrder.paymentMethod as keyof typeof paymentMethods]?.name}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span className="text-blue-600">৳{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Approval Actions */}
                  {selectedOrder.status === "pending_verification" && !selectedOrder.adminApproved && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="approvalCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Approval Code
                        </Label>
                        <div className="flex space-x-2">
                          <Input
                            id="approvalCode"
                            type="text"
                            placeholder="Generate approval code"
                            value={approvalCode}
                            onChange={(e) => setApprovalCode(e.target.value.toUpperCase())}
                            className="flex-1 font-mono text-center"
                          />
                          <Button onClick={generateApprovalCode} variant="outline">
                            <Zap className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="adminNotes" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Admin Notes (Optional)
                        </Label>
                        <Textarea
                          id="adminNotes"
                          placeholder="Add any notes about this order..."
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={() => approveOrder(selectedOrder)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={!approvalCode.trim()}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve Order
                        </Button>
                        <Button
                          onClick={() => rejectOrder(selectedOrder)}
                          variant="outline"
                          className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Already Processed */}
                  {selectedOrder.adminApproved && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-green-700 mb-2">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-semibold">Order Approved</span>
                      </div>
                      <div className="space-y-1 text-sm text-green-600">
                        <p>
                          <strong>Approval Code:</strong> {selectedOrder.approvalNumber}
                        </p>
                        <p>
                          <strong>Status:</strong> {selectedOrder.status}
                        </p>
                        {selectedOrder.adminNotes && (
                          <p>
                            <strong>Notes:</strong> {selectedOrder.adminNotes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Customer */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Quick Contact
                    </h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                        <Link
                          href={`https://wa.me/88${selectedOrder.customerInfo.phone}?text=Hello ${selectedOrder.customerInfo.name}! Your order ${selectedOrder.id} has been approved. Your approval code is: ${approvalCode || "[APPROVAL_CODE]"}`}
                          target="_blank"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Send Approval via WhatsApp
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href={`tel:+88${selectedOrder.customerInfo.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href={`mailto:${selectedOrder.customerInfo.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 sticky top-8">
                <CardContent className="p-12 text-center">
                  <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Order</h3>
                  <p className="text-gray-600">
                    Click on "Review & Approve" to review order details and approve/reject orders.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
