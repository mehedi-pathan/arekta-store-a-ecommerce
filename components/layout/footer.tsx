"use client"

import type React from "react"
import { useSession } from "next-auth/react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  Gamepad2,
  Apple,
  Package,
  Shield,
  Zap,
  Clock,
  ArrowUp,
  Heart,
} from "lucide-react"

export function Footer() {
  const { data: session } = useSession()
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [email, setEmail] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    // Update year automatically
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear())
    }

    // Update year every minute to catch year changes
    const interval = setInterval(updateYear, 60000)

    // Handle scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  const quickLinks = [
    { name: "All Products", href: "/products" },
    { name: "PUBG UC", href: "/products/category/pubg" },
    { name: "iTunes Cards", href: "/products/category/itunes" },
    { name: "iCloud Storage", href: "/products/category/icloud" },
    ...(session
      ? [{ name: "Dashboard", href: "/dashboard" }, { name: "My Orders", href: "/dashboard/orders" }]
      : []),
  ]

  const supportLinks = [
    { name: "Help Center", href: "/contact" },
    { name: "How to Buy", href: "/about" },
    { name: "Payment Methods", href: "/contact" },
    { name: "Delivery Info", href: "/about" },
    { name: "Refund Policy", href: "/contact" },
    { name: "Terms of Service", href: "/terms" },
  ]

  const categories = [
    { name: "PUBG Mobile UC", href: "/products/category/pubg", icon: Gamepad2, color: "text-orange-500" },
    { name: "iTunes Gift Cards", href: "/products/category/itunes", icon: Apple, color: "text-blue-500" },
    { name: "iCloud Storage", href: "/products/category/icloud", icon: Package, color: "text-emerald-500" },
  ]

  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Main Footer Content */}
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <Image
                  src="/arekta-logo.png"
                  alt="Arekta.store"
                  width={180}
                  height={60}
                  className="h-12 w-auto object-contain brightness-110"
                />
                <p className="text-gray-300 leading-relaxed">
                  Bangladesh's most trusted digital marketplace for gaming currencies, iTunes cards, and premium digital
                  products.
                  <span className="text-emerald-400 font-semibold"> 100% authentic</span>,
                  <span className="text-blue-400 font-semibold"> instant delivery</span>.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <Zap className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-emerald-300">Instant</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-3 text-center">
                  <Shield className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-blue-300">Secure</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-lg p-3 text-center">
                  <Clock className="h-5 w-5 text-orange-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-orange-300">24/7</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Follow Us</h4>
                <div className="flex space-x-3">
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    <Facebook className="h-5 w-5 text-white" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-sky-500/25"
                  >
                    <Twitter className="h-5 w-5 text-white" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-pink-500/25"
                  >
                    <Instagram className="h-5 w-5 text-white" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 flex items-center group"
                    >
                      <div className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></div>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Categories
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full"></div>
              </h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group border border-white/10 hover:border-white/20"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-blue-300 transition-colors">
                        {category.name}
                      </p>
                      <p className="text-xs text-gray-400">Browse all products</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
              </h3>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-lg">
                  <Mail className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Email Support</p>
                    <Link
                      href="mailto:support@arekta.store"
                      className="text-emerald-300 hover:text-emerald-200 transition-colors text-sm"
                    >
                      support@arekta.store
                    </Link>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Call Us</p>
                    <Link
                      href="tel:+8801622839616"
                      className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-mono hover:scale-105 inline-block transition-transform duration-200"
                    >
                      +880 1622-839616
                    </Link>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Location</p>
                    <p className="text-purple-300 text-sm">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <Send className="h-4 w-4 mr-2 text-blue-400" />
                  Newsletter
                </h4>
                <p className="text-gray-300 text-sm mb-4">Get the latest deals and updates delivered to your inbox.</p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm flex items-center">
                  © {currentYear} Arekta.store. All rights reserved.
                  <Heart className="h-3 w-3 text-red-400 mx-1 animate-pulse" />
                  Made by <Link href="https://mehedipathan.online" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-200 transition-colors">{" - "}পাঠান ভাই</Link>
                </p>
                <div className="flex space-x-4 text-sm">
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-400 animate-bounce"
            size="icon"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </Button>
        )}
      </footer>
    </>
  )
}
