"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Star, Check, ShoppingCart, ArrowLeft, Share2, Heart, Info, Shield, Clock, Zap } from "lucide-react"

// Mock product data - in a real app, this would come from your API
const products = {
  "1": {
    id: "1",
    name: "PUBG Mobile 8100 UC",
    price: 7999,
    originalPrice: 8500,
    image: "/pubg-8100-uc.png",
    category: "PUBG",
    rating: 4.9,
    seller: "Arekta Store",
    badge: "Best Seller",
    discount: "6% OFF",
    description:
      "8100 UC (Unknown Cash) for PUBG Mobile. Can be used to purchase Royale Pass, outfits, gun skins, and more.",
    features: [
      "Instant delivery (5-15 minutes)",
      "Works on all PUBG Mobile versions",
      "Safe and secure transaction",
      "24/7 customer support",
      "Cheapest price in Bangladesh",
    ],
    instructions:
      "After purchase, you'll need to provide your PUBG Mobile ID. We'll process your order and deliver the UC directly to your account.",
    reviews: [
      {
        id: 1,
        user: "Rakib H.",
        rating: 5,
        comment: "Super fast delivery! Got my UC within 5 minutes.",
        date: "2 days ago",
      },
      { id: 2, user: "Fahim A.", rating: 5, comment: "Best price in BD. Will buy again!", date: "1 week ago" },
      {
        id: 3,
        user: "Sadia K.",
        rating: 4,
        comment: "Good service but took about 20 minutes for delivery.",
        date: "2 weeks ago",
      },
    ],
    relatedProducts: ["3", "5", "7"],
  },
  "2": {
    id: "2",
    name: "iTunes Gift Card $50",
    price: 4799,
    originalPrice: 5200,
    image: "/itunes-50-card.png",
    category: "iTunes",
    rating: 4.8,
    seller: "Arekta Store",
    badge: "Hot Deal",
    discount: "8% OFF",
    description:
      "$50 US iTunes Gift Card. Can be used to purchase apps, games, music, movies, TV shows, and more from the Apple App Store and iTunes Store.",
    features: [
      "Instant delivery via email",
      "US region iTunes card",
      "Valid for App Store, iTunes, Apple Music",
      "Can be used for iCloud storage upgrade",
      "100% genuine Apple code",
    ],
    instructions:
      "After purchase, you'll receive the iTunes Gift Card code via email and SMS. To redeem, open the App Store, tap your profile icon, tap 'Redeem Gift Card or Code', and enter the code.",
    reviews: [
      {
        id: 1,
        user: "Tahmid R.",
        rating: 5,
        comment: "Code worked perfectly! Thanks for the quick delivery.",
        date: "3 days ago",
      },
      {
        id: 2,
        user: "Nusrat J.",
        rating: 5,
        comment: "Best price for iTunes cards in Bangladesh!",
        date: "1 week ago",
      },
      {
        id: 3,
        user: "Imran S.",
        rating: 5,
        comment: "Used it to upgrade my iCloud storage. Great service!",
        date: "3 weeks ago",
      },
    ],
    relatedProducts: ["4", "6", "8"],
  },
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products[id as keyof typeof products] || products["1"]

  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: product.seller,
    })

    toast({
      title: "Added to cart! 🎉",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/products" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

              {product.badge && (
                <Badge
                  className={`absolute top-3 left-3 ${
                    product.category === "PUBG" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {product.badge}
                </Badge>
              )}

              {product.discount && (
                <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">{product.discount}</Badge>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>

              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-gray-500">({product.reviews.length} reviews)</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <Badge variant="outline" className="border-gray-300 text-gray-700">
                  {product.category}
                </Badge>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-600 text-sm">Sold by {product.seller}</span>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold text-primary">৳{product.price.toLocaleString()}</div>
                {product.originalPrice && (
                  <div className="text-gray-500 line-through">৳{product.originalPrice.toLocaleString()}</div>
                )}
                {product.discount && <Badge className="bg-green-500 hover:bg-green-600">{product.discount}</Badge>}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 px-3"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 px-3">
                    +
                  </Button>
                </div>

                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold h-10"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 font-semibold h-12 text-lg"
                onClick={handleAddToCart}
              >
                <Zap className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="font-medium">Instant Delivery</p>
                    <p className="text-sm text-gray-500">5-15 minutes</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium">100% Secure</p>
                    <p className="text-sm text-gray-500">Safe transaction</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">24/7 Support</p>
                    <p className="text-sm text-gray-500">WhatsApp available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="instructions">How to Use</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Product Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="instructions" className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">How to Use</h3>
            <div className="flex items-start mb-4">
              <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-1" />
              <p className="text-gray-700">{product.instructions}</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
              <h4 className="font-bold text-blue-800 mb-2">Need Help?</h4>
              <p className="text-blue-700 text-sm">
                If you have any questions about how to use this product, please contact our support team via WhatsApp.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-bold mr-1">{product.rating}</span>
                <span className="text-gray-500">({product.reviews.length} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{review.user}</div>
                    <div className="text-gray-500 text-sm">{review.date}</div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedId) => {
              const relatedProduct = products[relatedId as keyof typeof products]
              if (!relatedProduct) return null

              return (
                <Link key={relatedId} href={`/products/${relatedId}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                      {relatedProduct.discount && (
                        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                          {relatedProduct.discount}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold mb-2 line-clamp-2">{relatedProduct.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-primary">৳{relatedProduct.price.toLocaleString()}</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
