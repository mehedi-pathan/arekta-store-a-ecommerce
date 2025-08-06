"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ProductSearchProps {
  onSearch: (query: string) => void
  onFilter: (filters: any) => void
  onSort: (sortBy: string) => void
}

export function ProductSearch({ onSearch, onFilter, onSort }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])

  const categories = [
    { id: "pubg", label: "PUBG Mobile UC", count: 25 },
    { id: "itunes", label: "iTunes Gift Cards", count: 18 },
    { id: "icloud", label: "iCloud Storage", count: 12 },
    { id: "gaming", label: "Other Games", count: 35 },
  ]

  const ratings = [
    { id: "4-up", label: "4★ & up", count: 120 },
    { id: "3-up", label: "3★ & up", count: 180 },
    { id: "2-up", label: "2★ & up", count: 200 },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleRatingChange = (ratingId: string, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, ratingId])
    } else {
      setSelectedRatings(selectedRatings.filter((id) => id !== ratingId))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 50000])
    setSelectedCategories([])
    setSelectedRatings([])
    onFilter({})
  }

  useEffect(() => {
    onFilter({
      priceRange,
      categories: selectedCategories,
      ratings: selectedRatings,
    })
  }, [priceRange, selectedCategories, selectedRatings])

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="professional-card">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Sort and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <Select onValueChange={onSort}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 ||
          selectedRatings.length > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < 50000) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return (
                <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                  {category?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                </Badge>
              )
            })}
            {(priceRange[0] > 0 || priceRange[1] < 50000) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                ৳{priceRange[0]} - ৳{priceRange[1]}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 50000])} />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="professional-card animate-fade-in">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={50000} step={100} className="mb-4" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <Label htmlFor={`category-${category.id}`} className="ml-2 text-sm">
                          {category.label}
                        </Label>
                      </div>
                      <span className="text-xs text-gray-500">({category.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Customer Rating</h3>
                <div className="space-y-3">
                  {ratings.map((rating) => (
                    <div key={rating.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox
                          id={`rating-${rating.id}`}
                          checked={selectedRatings.includes(rating.id)}
                          onCheckedChange={(checked) => handleRatingChange(rating.id, checked as boolean)}
                        />
                        <Label htmlFor={`rating-${rating.id}`} className="ml-2 text-sm">
                          {rating.label}
                        </Label>
                      </div>
                      <span className="text-xs text-gray-500">({rating.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
