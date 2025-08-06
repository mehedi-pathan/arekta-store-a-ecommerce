import Link from "next/link"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"
import { ArrowRight } from "lucide-react" // Added import for ArrowRight

// Updated products focused on PUBG UC and iTunes
const popularProducts = [
  {
    id: "1",
    name: "PUBG Mobile 985 UC",
    price: 1299,
    originalPrice: 1500,
    image: "/pubg-985-uc.png",
    category: "PUBG",
    rating: 4.9,
    seller: "Arekta Store",
    badge: "Best Seller",
    discount: "6% OFF",
  },
  {
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
  },
  {
    id: "3",
    name: "PUBG Mobile 3850 UC",
    price: 3899,
    originalPrice: 4200,
    image: "/pubg-3850-uc.png",
    category: "PUBG",
    rating: 4.9,
    seller: "Arekta Store",
    badge: "Popular",
    discount: "7% OFF",
  },
  {
    id: "4",
    name: "iTunes Gift Card $25",
    price: 2499,
    originalPrice: 2700,
    image: "/itunes-25-card.png",
    category: "iTunes",
    rating: 4.7,
    seller: "Arekta Store",
    badge: "Great Value",
    discount: "7% OFF",
  },
]

export function PopularProducts() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="h-8 w-8 text-orange-500 mr-2" />
            <h2 className="text-3xl font-bold">🔥 Hottest Deals</h2>
          </div>
          <p className="text-gray-600 text-lg">Bangladesh's cheapest PUBG UC & iTunes cards with instant delivery</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            asChild
          >
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
