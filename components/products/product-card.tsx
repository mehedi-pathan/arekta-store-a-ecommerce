"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  seller: string
  badge?: string
  discount?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
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

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Category Badge */}
          <Badge
            className={`absolute top-3 left-3 ${
              product.category === "PUBG"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : product.category === "iTunes"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-primary"
            }`}
          >
            {product.category}
          </Badge>

          {/* Discount Badge */}
          {product.discount && (
            <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 animate-pulse">
              {product.discount}
            </Badge>
          )}

          {/* Product Badge */}
          {product.badge && (
            <Badge className="absolute bottom-3 left-3 bg-green-500 hover:bg-green-600">{product.badge}</Badge>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-600">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600 font-medium">{product.seller}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">৳{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            {discountPercentage > 0 && (
              <p className="text-xs text-green-600 font-semibold">
                Save ৳{(product.originalPrice! - product.price).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
          onClick={handleAddToCart}
        >
          <Zap className="h-4 w-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </div>
  )
}
