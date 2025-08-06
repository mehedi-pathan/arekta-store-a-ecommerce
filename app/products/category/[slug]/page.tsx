import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { Separator } from "@/components/ui/separator"
import { Gamepad2, Apple, Gift, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for different categories
const categoryData = {
  pubg: {
    title: "PUBG Mobile UC",
    description:
      "Buy PUBG Mobile UC (Unknown Cash) at the cheapest price in Bangladesh. Instant delivery to your PUBG Mobile account.",
    icon: <Gamepad2 className="h-8 w-8 text-yellow-500" />,
    color: "from-yellow-400 to-orange-500",
    products: [
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
    ],
  },
  itunes: {
    title: "iTunes Gift Cards",
    description:
      "Buy US iTunes Gift Cards at the cheapest price in Bangladesh. Use for App Store, Apple Music, iCloud, and more.",
    icon: <Apple className="h-8 w-8 text-blue-500" />,
    color: "from-blue-400 to-purple-500",
    products: [
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
    ],
  },
  icloud: {
    title: "iCloud Storage",
    description:
      "Upgrade your iCloud storage plans at the cheapest price in Bangladesh. Instant activation on your Apple account.",
    icon: <Gift className="h-8 w-8 text-green-500" />,
    color: "from-green-400 to-teal-500",
    products: [
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
    ],
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Get category data or default to PUBG if not found
  const category = categoryData[slug as keyof typeof categoryData] || categoryData.pubg

  return (
    <div className="bg-gray-50">
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${category.color} py-12 text-white`}>
        <div className="container mx-auto px-4">
          <Link href="/products" className="flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Products
          </Link>

          <div className="flex items-center mb-4">
            {category.icon}
            <h1 className="text-3xl font-bold ml-3">{category.title}</h1>
          </div>
          <p className="text-lg max-w-2xl">{category.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              <ProductFilters category={slug} />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">All {category.title}</h2>
                  <p className="text-gray-500 text-sm">Showing {category.products.length} products</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="border rounded-md px-3 py-1 text-sm bg-white">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Popularity</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Category Information */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">About {category.title}</h3>
              <Separator className="my-4" />

              {slug === "pubg" && (
                <div className="text-gray-700 space-y-4">
                  <p>
                    PUBG Mobile UC (Unknown Cash) is the in-game currency used in PUBG Mobile. UC can be used to
                    purchase various items like Royale Pass, outfits, gun skins, emotes, and more.
                  </p>
                  <p>
                    At Arekta.store, we offer the cheapest PUBG UC prices in Bangladesh with instant delivery. Our UC is
                    100% legal and safe, delivered directly to your PUBG Mobile account.
                  </p>
                  <p>
                    We support all PUBG Mobile versions including BGMI (Battlegrounds Mobile India) and PUBG Mobile
                    Global. Simply provide your PUBG Mobile ID during checkout, and we'll deliver your UC within
                    minutes.
                  </p>
                </div>
              )}

              {slug === "itunes" && (
                <div className="text-gray-700 space-y-4">
                  <p>
                    iTunes Gift Cards can be used to purchase apps, games, music, movies, TV shows, books, and more from
                    the Apple App Store, iTunes Store, and Apple Books.
                  </p>
                  <p>
                    Our iTunes Gift Cards are US region cards that can be redeemed on US Apple accounts. They can also
                    be used for Apple Music subscriptions, iCloud+ storage upgrades, and in-app purchases.
                  </p>
                  <p>
                    At Arekta.store, we offer the cheapest iTunes Gift Cards in Bangladesh with instant delivery. After
                    purchase, you'll receive the gift card code via email and SMS.
                  </p>
                </div>
              )}

              {slug === "icloud" && (
                <div className="text-gray-700 space-y-4">
                  <p>
                    iCloud+ is Apple's premium cloud storage service that offers additional storage space for your
                    photos, videos, documents, and backups.
                  </p>
                  <p>
                    Our iCloud+ plans are significantly cheaper than purchasing directly from Apple. We offer monthly
                    and annual plans with instant activation on your Apple ID.
                  </p>
                  <p>
                    At Arekta.store, we provide the cheapest iCloud+ storage upgrades in Bangladesh. Simply provide your
                    Apple ID during checkout, and we'll upgrade your storage plan immediately.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
