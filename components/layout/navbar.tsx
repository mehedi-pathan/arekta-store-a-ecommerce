"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import {
  UserIcon,
  Search,
  Menu,
  Phone,
  ChevronDown,
  Gamepad2,
  Apple,
  Package,
  Grid3X3,
  X,
  LogOut,
  Settings,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useState, useRef, useEffect } from "react"
import { CartSidebar } from "@/components/cart/cart-sidebar"
import { useToast } from "@/hooks/use-toast"
import { safeGetFromLocalStorage, safeRemoveFromLocalStorage } from "@/utils/localStorage"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "super_admin"
  avatar?: string
  lastLogin: string
}

export function Navbar() {
  const { items } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Get current user from localStorage
  useEffect(() => {
    const userSession = safeGetFromLocalStorage<User | null>("currentUser", null)
    if (userSession) {
      setCurrentUser(userSession)
    }
  }, [])

  // Mock search suggestions
  const searchSuggestions = [
    { id: "1", name: "PUBG Mobile 8100 UC", category: "PUBG", price: 7999 },
    { id: "2", name: "iTunes Gift Card $50", category: "iTunes", price: 4799 },
    { id: "3", name: "PUBG Mobile 3850 UC", category: "PUBG", price: 3899 },
    { id: "4", name: "iTunes Gift Card $25", category: "iTunes", price: 2499 },
    { id: "5", name: "iCloud+ 200GB", category: "iCloud", price: 299 },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(filtered.slice(0, 5))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
    }
  }

  const handleSearchResultClick = (productId: string) => {
    router.push(`/products/${productId}`)
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  const handleLogout = () => {
    safeRemoveFromLocalStorage("currentUser")
    document.cookie = "user-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    setCurrentUser(null)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
      router.push("/")
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="relative">
                <Image
                  src="/arekta-logo.png"
                  alt="Arekta.store"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-100 ${
                isActive("/") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-all duration-200">
                Categories <ChevronDown className="ml-1 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 shadow-lg border-0 bg-white/95 backdrop-blur-md">
                <DropdownMenuItem asChild>
                  <Link href="/products/category/pubg" className="flex items-center py-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <Gamepad2 className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">PUBG Mobile UC</p>
                      <p className="text-xs text-gray-500">All UC packages</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/category/itunes" className="flex items-center py-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Apple className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">iTunes Gift Cards</p>
                      <p className="text-xs text-gray-500">US iTunes cards</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/category/icloud" className="flex items-center py-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                      <Package className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">iCloud Storage</p>
                      <p className="text-xs text-gray-500">Storage upgrades</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/products" className="flex items-center py-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <Grid3X3 className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">All Products</p>
                      <p className="text-xs text-gray-500">Browse everything</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/products"
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-100 ${
                isActive("/products") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Products
            </Link>

            <Link
              href="/about"
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-100 ${
                isActive("/about") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-100 ${
                isActive("/contact") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Contact
            </Link>

            {currentUser && (
              <Link
                href={currentUser.role === "super_admin" ? "/admin/dashboard" : "/dashboard"}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-100 ${
                  isActive("/dashboard") || isActive("/admin/dashboard")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Modern Search */}
            <div className="relative" ref={searchRef}>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-gray-100 lg:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-4 w-4 text-gray-600" />
              </Button>

              {/* Desktop Search */}
              <div className="hidden lg:block">
                <div className="relative">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchOpen(true)}
                        className="w-64 pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all duration-200"
                      />
                    </div>
                  </form>

                  {/* Search Results Dropdown */}
                  {isSearchOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                      {searchQuery.trim() ? (
                        searchResults.length > 0 ? (
                          <div className="p-2">
                            <p className="text-xs text-gray-500 px-3 py-2 font-medium">Search Results</p>
                            {searchResults.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleSearchResultClick(result.id)}
                                className="w-full flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors text-left"
                              >
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  {result.category === "PUBG" ? (
                                    <Gamepad2 className="h-4 w-4 text-orange-600" />
                                  ) : result.category === "iTunes" ? (
                                    <Apple className="h-4 w-4 text-blue-600" />
                                  ) : (
                                    <Package className="h-4 w-4 text-emerald-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm text-gray-900">{result.name}</p>
                                  <p className="text-xs text-gray-500">{result.category}</p>
                                </div>
                                <p className="text-sm font-semibold text-blue-600">৳{result.price.toLocaleString()}</p>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-sm text-gray-500">No products found</p>
                          </div>
                        )
                      ) : (
                        <div className="p-2">
                          <p className="text-xs text-gray-500 px-3 py-2 font-medium">Popular Searches</p>
                          {searchSuggestions.slice(0, 3).map((suggestion) => (
                            <button
                              key={suggestion.id}
                              onClick={() => handleSearchResultClick(suggestion.id)}
                              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors text-left"
                            >
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                {suggestion.category === "PUBG" ? (
                                  <Gamepad2 className="h-4 w-4 text-orange-600" />
                                ) : suggestion.category === "iTunes" ? (
                                  <Apple className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <Package className="h-4 w-4 text-emerald-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm text-gray-900">{suggestion.name}</p>
                                <p className="text-xs text-gray-500">{suggestion.category}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Support Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex items-center space-x-2 h-9 px-3 hover:bg-gray-100 text-gray-700 hover:text-blue-600"
              asChild
            >
              <Link href="/contact">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">Support</span>
              </Link>
            </Button>

            {/* User Menu or Login Button */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 h-9 px-3 hover:bg-gray-100">
                    <div className="relative">
                      {currentUser.avatar ? (
                        <Image
                          src={currentUser.avatar || "/placeholder.svg"}
                          alt={currentUser.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-3 w-3 text-blue-600" />
                        </div>
                      )}
                      {currentUser.role === "super_admin" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                          <Shield className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                      {currentUser.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 shadow-lg border-0 bg-white/95 backdrop-blur-md">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                    {currentUser.role === "super_admin" && (
                      <div className="flex items-center mt-1">
                        <Shield className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-xs text-red-600 font-medium">Super Admin</span>
                      </div>
                    )}
                  </div>

                  <DropdownMenuItem asChild>
                    <Link
                      href={currentUser.role === "super_admin" ? "/admin/dashboard" : "/dashboard"}
                      className="flex items-center py-2"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <UserIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  {currentUser.role === "super_admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/users" className="flex items-center py-2">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <Shield className="h-4 w-4 text-red-600" />
                        </div>
                        User Management
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/orders" className="flex items-center py-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="h-4 w-4 text-emerald-600" />
                      </div>
                      My Orders
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center py-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <Settings className="h-4 w-4 text-gray-600" />
                      </div>
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 py-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <LogOut className="h-4 w-4 text-red-600" />
                    </div>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}

            {/* Cart */}
            <CartSidebar />

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9 p-0 hover:bg-gray-100">
                  <Menu className="h-5 w-5 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white/95 backdrop-blur-md">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center">
                    <Image
                      src="/arekta-logo.png"
                      alt="Arekta.store"
                      width={80}
                      height={26}
                      className="h-6 w-auto object-contain mr-2"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200"
                    />
                  </form>

                  {/* User Info in Mobile */}
                  {currentUser && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center space-x-3">
                        {currentUser.avatar ? (
                          <Image
                            src={currentUser.avatar || "/placeholder.svg"}
                            alt={currentUser.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                          <div className="flex items-center">
                            <p className="text-xs text-gray-500">{currentUser.email}</p>
                            {currentUser.role === "super_admin" && (
                              <div className="ml-2 flex items-center">
                                <Shield className="h-3 w-3 text-red-500 mr-1" />
                                <span className="text-xs text-red-600 font-medium">Admin</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation Links */}
                  <div className="space-y-1">
                    <Link
                      href="/"
                      className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="font-medium">Home</span>
                    </Link>

                    <Link
                      href="/products/category/pubg"
                      className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <Gamepad2 className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">PUBG Mobile UC</p>
                        <p className="text-xs text-gray-500">All UC packages</p>
                      </div>
                    </Link>

                    <Link
                      href="/products/category/itunes"
                      className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Apple className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">iTunes Gift Cards</p>
                        <p className="text-xs text-gray-500">US iTunes cards</p>
                      </div>
                    </Link>

                    <Link
                      href="/products"
                      className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <Grid3X3 className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium">All Products</span>
                    </Link>

                    <Link
                      href="/about"
                      className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      </div>
                      <span className="font-medium">About</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <Phone className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Contact & Support</span>
                    </Link>

                    {currentUser ? (
                      <>
                        <div className="border-t border-gray-200 my-4"></div>
                        <Link
                          href={currentUser.role === "super_admin" ? "/admin/dashboard" : "/dashboard"}
                          className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <UserIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium">Dashboard</span>
                        </Link>

                        {currentUser.role === "super_admin" && (
                          <Link
                            href="/admin/users"
                            className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                              <Shield className="h-4 w-4 text-red-600" />
                            </div>
                            <span className="font-medium">User Management</span>
                          </Link>
                        )}

                        <button
                          onClick={() => {
                            handleLogout()
                            setIsMenuOpen(false)
                          }}
                          className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                            <LogOut className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <div className="border-t border-gray-200 my-4 pt-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            Login / Register
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-gray-50 border-gray-200"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}
