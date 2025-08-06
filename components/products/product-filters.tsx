"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 20000])

  const categories = [
    { id: "gaming", label: "Gaming" },
    { id: "software", label: "Software" },
    { id: "music", label: "Music" },
    { id: "education", label: "Education" },
    { id: "design", label: "Design" },
    { id: "art", label: "Art" },
  ]

  const platforms = [
    { id: "windows", label: "Windows" },
    { id: "mac", label: "Mac" },
    { id: "linux", label: "Linux" },
    { id: "android", label: "Android" },
    { id: "ios", label: "iOS" },
  ]

  const ratings = [
    { id: "4-up", label: "4★ & up" },
    { id: "3-up", label: "3★ & up" },
    { id: "2-up", label: "2★ & up" },
    { id: "1-up", label: "1★ & up" },
  ]

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 20000]}
            max={50000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span>৳{priceRange[0]}</span>
            <span>৳{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox id={`category-${category.id}`} />
              <Label htmlFor={`category-${category.id}`} className="ml-2 text-sm font-medium">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Platforms</h3>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center">
              <Checkbox id={`platform-${platform.id}`} />
              <Label htmlFor={`platform-${platform.id}`} className="ml-2 text-sm font-medium">
                {platform.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Ratings</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.id} className="flex items-center">
              <Checkbox id={`rating-${rating.id}`} />
              <Label htmlFor={`rating-${rating.id}`} className="ml-2 text-sm font-medium">
                {rating.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
