"use client"

import { useState } from "react"
import { ProductCard } from "@/components/products/product-card"
import { ProductSearch } from "@/components/products/product-search"

// Expanded mock data with more products
const mockProducts = [
  // PUBG UC Products
  {
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
    id: "9",
    name: "PUBG Mobile 300 UC",
    price: 349,
    originalPrice: 400,
    image: "/pubg-300-uc.png",
    category: "PUBG",
    rating: 4.7,
    seller: "Arekta Store",
    badge: "Basic",
    discount: "13% OFF",
  },
  {
    id: "10",
    name: "PUBG Mobile 16500 UC",
    price: 15999,
    originalPrice: 17000,
    image: "/pubg-16500-uc.png",
    category: "PUBG",
    rating: 4.9,
    seller: "Arekta Store",
    badge: "Premium",
    discount: "6% OFF",
  },
  {
    id: "21",
    name: "PUBG Mobile 120 UC",
    price: 149,
    originalPrice: 180,
    image: "/pubg-120-uc.png",
    category: "PUBG",
    rating: 4.6,
    seller: "Arekta Store",
    badge: "Starter",
    discount: "17% OFF",
  },
  {
    id: "22",
    name: "PUBG Mobile 60 UC",
    price: 79,
    originalPrice: 90,
    image: "/pubg-60-uc.png",
    category: "PUBG",
    rating: 4.5,
    seller: "Arekta Store",
    badge: "Mini",
    discount: "12% OFF",
  },

  // iTunes Products
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
  {
    id: "11",
    name: "iTunes Gift Card $15",
    price: 1499,
    originalPrice: 1650,
    image: "/itunes-15-card.png",
    category: "iTunes",
    rating: 4.6,
    seller: "Arekta Store",
    badge: "Popular",
    discount: "9% OFF",
  },
  {
    id: "12",
    name: "iTunes Gift Card $200",
    price: 18999,
    originalPrice: 20400,
    image: "/itunes-200-card.png",
    category: "iTunes",
    rating: 4.9,
    seller: "Arekta Store",
    badge: "Premium",
    discount: "7% OFF",
  },
  {
    id: "23",
    name: "iTunes Gift Card $5",
    price: 549,
    originalPrice: 600,
    image: "/itunes-5-card.png",
    category: "iTunes",
    rating: 4.5,
    seller: "Arekta Store",
    badge: "Starter",
    discount: "9% OFF",
  },
  {
    id: "24",
    name: "iTunes Gift Card $75",
    price: 7199,
    originalPrice: 7800,
    image: "/itunes-75-card.png",
    category: "iTunes",
    rating: 4.8,
    seller: "Arekta Store",
    badge: "Value Pack",
    discount: "8% OFF",
  },

  // iCloud Storage
  {
    id: "13",
    name: "iCloud+ 50GB (1 Month)",
    price: 99,
    originalPrice: 120,
    image: "/icloud-50gb.png",
    category: "iCloud",
    rating: 4.7,
    seller: "Arekta Store",
    badge: "Basic",
    discount: "18% OFF",
  },
  {
    id: "14",
    name: "iCloud+ 200GB (1 Month)",
    price: 299,
    originalPrice: 350,
    image: "/icloud-200gb.png",
    category: "iCloud",
    rating: 4.8,
    seller: "Arekta Store",
    badge: "Popular",
    discount: "15% OFF",
  },
  {
    id: "15",
    name: "iCloud+ 2TB (1 Month)",
    price: 899,
    originalPrice: 1050,
    image: "/icloud-2tb.png",
    category: "iCloud",
    rating: 4.9,
    seller: "Arekta Store",
    badge: "Premium",
    discount: "14% OFF",
  },
  {
    id: "16",
    name: "iCloud+ 50GB (1 Year)",
    price: 999,
    originalPrice: 1200,
    image: "/icloud-50gb-year.png",
    category: "iCloud",
    rating: 4.8,
    seller: "Arekta Store",
    badge: "Value",
    discount: "17% OFF",
  },

  // Other Gaming Products
  {
    id: "17",
    name: "Free Fire 2180 Diamonds",
    price: 2199,
    originalPrice: 2400,
    image: "/freefire-2180-diamonds.png",
    category: "Gaming",
    rating: 4.6,
    seller: "Arekta Store",
    badge: "Popular",
    discount: "8% OFF",
  },
  {
    id: "18",
    name: "Call of Duty Mobile CP",
    price: 1599,
    originalPrice: 1800,
    image: "/cod-mobile-cp.png",
    category: "Gaming",
    rating: 4.7,
    seller: "Arekta Store",
    badge: "New",
    discount: "11% OFF",
  },
  {
    id: "19",
    name: "Mobile Legends Diamonds",
    price: 1899,
    originalPrice: 2100,
    image: "/ml-diamonds.png",
    category: "Gaming",
    rating: 4.5,
    seller: "Arekta Store",
    badge: "Hot",
    discount: "10% OFF",
  },
  {
    id: "20",
    name: "Clash of Clans Gems",
    price: 1299,
    originalPrice: 1500,
    image: "/coc-gems.png",
    category: "Gaming",
    rating: 4.4,
    seller: "Arekta Store",
    badge: "Classic",
    discount: "13% OFF",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products)
      return
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  const handleFilter = (filters: any) => {
    let filtered = products

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.some((cat: string) => product.category.toLowerCase().includes(cat)),
      )
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
      )
    }

    setFilteredProducts(filtered)
  }

  const handleSort = (sortBy: string) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id.localeCompare(a.id)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })
    setFilteredProducts(sorted)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600">Discover amazing digital products from trusted sellers</p>
        </div>

        <ProductSearch onSearch={handleSearch} onFilter={handleFilter} onSort={handleSort} />

        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
