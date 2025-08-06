import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Gamepad2, Apple, Gift, Coins } from "lucide-react"

const categories = [
  {
    id: "pubg",
    name: "PUBG Mobile UC",
    description: "All UC packages at cheapest prices in Bangladesh",
    count: 25,
    icon: <Gamepad2 className="h-12 w-12 text-yellow-500" />,
    gradient: "from-yellow-400 to-orange-500",
    popular: true,
  },
  {
    id: "itunes",
    name: "iTunes Gift Cards",
    description: "US iTunes cards for App Store & Apple services",
    count: 15,
    icon: <Apple className="h-12 w-12 text-blue-500" />,
    gradient: "from-blue-400 to-purple-500",
    popular: true,
  },
  {
    id: "icloud",
    name: "iCloud Storage",
    description: "Upgrade your iCloud storage plans instantly",
    count: 8,
    icon: <Gift className="h-12 w-12 text-green-500" />,
    gradient: "from-green-400 to-teal-500",
    popular: false,
  },
  {
    id: "gaming",
    name: "Other Games",
    description: "Free Fire, Call of Duty, and more gaming currencies",
    count: 35,
    icon: <Coins className="h-12 w-12 text-purple-500" />,
    gradient: "from-purple-400 to-pink-500",
    popular: false,
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">🎯 Our Specialties</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We specialize in PUBG UC and iTunes products, offering the most competitive prices in Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card
                className={`h-full hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative overflow-hidden ${category.popular ? "ring-2 ring-yellow-400" : ""}`}
              >
                {category.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">{category.count} products</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
