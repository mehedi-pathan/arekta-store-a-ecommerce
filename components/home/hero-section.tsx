import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, ShoppingBag, Zap, Shield, Clock, Gamepad2, Apple, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-emerald-200/30 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-orange-200/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-40 w-24 h-24 bg-purple-200/30 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Animated Brand Header */}
            <div className="flex items-center justify-center lg:justify-start mb-8 group">
              <div className="relative">
                <Image
                  src="/arekta-logo.png"
                  alt="Arekta.store Logo"
                  width={280}
                  height={93}
                  className="h-24 lg:h-32 w-auto object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-lg"
                  priority
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-emerald-400/20 to-orange-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>

                {/* Floating Particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-pulse"></div>
                <div
                  className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-700"></div>
              </div>
            </div>

            {/* Main Headline with Enhanced Animation */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-7xl leading-tight font-bold mb-6 lg:line-height[4rem]">
                <span className="text-gray-900 inline-block animate-fade-in-up">Premium</span>
                <br />
                <span
                  className="bg-gradient-to-r from-blue-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent inline-block animate-fade-in-up bg-size-200 animate-gradient-x"
                  style={{ animationDelay: "0.2s" }}
                >
                  Digital Products
                </span>
                <br />
                <span className="text-gray-900 inline-block animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  Instant Delivery
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-6 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                Get PUBG UC, iTunes Gift Cards, and premium digital products at the best prices in Bangladesh.
                <span className="font-semibold text-emerald-600"> 100% authentic</span>,
                <span className="font-semibold text-blue-600"> instant delivery</span>, guaranteed satisfaction.
              </p>
            </div>

            {/* Enhanced Feature Pills */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 border-emerald-200 hover:scale-105 transition-all duration-200 cursor-default">
                <Zap className="h-4 w-4 mr-1 animate-pulse" />
                Instant Delivery
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 border-blue-200 hover:scale-105 transition-all duration-200 cursor-default">
                <Shield className="h-4 w-4 mr-1" />
                100% Authentic
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 border-orange-200 hover:scale-105 transition-all duration-200 cursor-default">
                <Clock className="h-4 w-4 mr-1" />
                24/7 Support
              </Badge>
            </div>

            {/* Enhanced CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/products?category=pubg">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Shop PUBG UC
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 shadow-lg hover:shadow-xl bg-transparent transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/products?category=itunes">
                  <Apple className="h-5 w-5 mr-2" />
                  iTunes Cards
                </Link>
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div
              className="grid grid-cols-3 gap-6 text-center lg:text-left animate-fade-in-up"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="group cursor-default">
                <div className="flex items-center justify-center lg:justify-start mb-2 group-hover:scale-110 transition-transform duration-200">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">50K+</span>
                </div>
                <p className="text-gray-600 font-medium">Happy Customers</p>
              </div>
              <div className="group cursor-default">
                <div className="flex items-center justify-center lg:justify-start mb-2 group-hover:scale-110 transition-transform duration-200">
                  <ShoppingBag className="h-5 w-5 mr-2 text-emerald-600" />
                  <span className="text-2xl font-bold text-gray-900">1M+</span>
                </div>
                <p className="text-gray-600 font-medium">Products Sold</p>
              </div>
              <div className="group cursor-default">
                <div className="flex items-center justify-center lg:justify-start mb-2 group-hover:scale-110 transition-transform duration-200">
                  <Star className="h-5 w-5 mr-2 text-amber-500 animate-pulse" />
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-gray-600 font-medium">Rating</p>
              </div>
            </div>
          </div>

          {/* Enhanced Right Side - Featured Products */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Card className="professional-card p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white mb-2 px-3 py-1 animate-pulse">
                  🔥 Featured Deals
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Today's Best Offers</h3>
                <p className="text-gray-600">Limited time deals - Don't miss out!</p>
              </div>

              <div className="space-y-4">
                {/* Enhanced PUBG UC Deal */}
                <Card className="professional-card p-4 border-l-4 border-orange-500 hover:shadow-md transition-all hover:scale-105 duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-transform duration-200">
                        <Gamepad2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">PUBG 985 UC</h4>
                        <p className="text-emerald-600 text-sm font-medium animate-pulse">MOST POPULAR</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="line-through text-gray-400 text-sm">৳1,500</p>
                      <p className="text-xl font-bold text-gray-900">৳1,299</p>
                      <p className="text-emerald-600 text-xs font-semibold">Save ৳201</p>
                    </div>
                  </div>
                </Card>

                {/* Enhanced iTunes Deal */}
                <Card className="professional-card p-4 border-l-4 border-blue-500 hover:shadow-md transition-all hover:scale-105 duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-transform duration-200">
                        <Apple className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">iTunes $50 Card</h4>
                        <p className="text-blue-600 text-sm font-medium">BEST VALUE</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="line-through text-gray-400 text-sm">৳5,200</p>
                      <p className="text-xl font-bold text-gray-900">৳4,799</p>
                      <p className="text-emerald-600 text-xs font-semibold">Save ৳401</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="text-center mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200 hover:shadow-inner transition-all duration-200">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2 animate-bounce" />
                  <p className="font-semibold text-gray-900">Flash Sale Active</p>
                </div>
                <p className="text-gray-600 text-sm">Limited time offers - Grab them now!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
