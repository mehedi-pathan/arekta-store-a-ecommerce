import Link from "next/link"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"

// New PUBG and iTunes focused products
const newListings = [
  {
    id: "5",
    name: "PUBG Mobile 1800 UC",
    price: 1899,
    originalPrice: 2100,
    image: "/pubg-1800-uc.png",
    category: "PUBG",
    rating: 4.8,
    seller: "Arekta Store",
    badge: "New",
    discount: "10% OFF",
  },
  {
    id: "6",
    name: "iTunes Gift Card $10",
    price: 999,
    originalPrice: 1100,
    image: "/itunes-10-card.png",
    category: "iTunes",
    rating: 4.7,
    seller: "Arekta Store",
    badge: "New",
    discount: "9% OFF",
  },
  {
    id: "7",
    name: "PUBG Mobile 660 UC",
    price: 699,
    originalPrice: 800,
    image: "/pubg-660-uc.png",
    category: "PUBG",
    rating: 4.9,
    seller: "Arekta Store",
    badge: "New",
    discount: "13% OFF",
  },
  {
    id: "8",
    name: "iTunes Gift Card $100",
    price: 9499,
    originalPrice: 10200,
    image: "/itunes-100-card.png",
    category: "iTunes",
    rating: 4.8,
    seller: "Arekta Store",
    badge: "New",
    discount: "7% OFF",
  },
]

export function NewListings() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-blue-500 mr-2" />
            <h2 className="text-3xl font-bold">⚡ Fresh Arrivals</h2>
          </div>
          <p className="text-gray-600 text-lg">Latest PUBG UC packages and iTunes cards added to our collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newListings.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="bg-white hover:bg-blue-50 border-blue-200" asChild>
            <Link href="/products?sort=newest">
              View All New Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
