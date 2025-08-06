import { HeroSection } from "@/components/home/hero-section"
import { PopularProducts } from "@/components/home/popular-products"
import { NewListings } from "@/components/home/new-listings"
import { FeaturedCategories } from "@/components/home/featured-categories"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <div className="container mx-auto px-4">
        <PopularProducts />
        <NewListings />
        <FeaturedCategories />
      </div>
    </div>
  )
}
