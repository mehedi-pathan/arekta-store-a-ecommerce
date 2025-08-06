import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Users, Award, Clock, Globe, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-blue-100 text-blue-700 mb-4">About Arekta.store</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Bangladesh's Most Trusted
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent block">
                Digital Marketplace
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Since our inception, we've been committed to providing authentic digital products at unbeatable prices.
              From PUBG UC to iTunes Gift Cards, we've served over 50,000 satisfied customers across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <p className="text-gray-600">Products Sold</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 mb-4">Our Story</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Built by Gamers, for Gamers</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Arekta.store was founded in 2021 by a team of passionate gamers who understood the struggle of finding
                  authentic and affordable digital gaming products in Bangladesh. We started with a simple mission: to
                  make premium digital products accessible to everyone.
                </p>
                <p>
                  What began as a small venture has now grown into Bangladesh's most trusted digital marketplace. We've
                  built strong relationships with official distributors and partners worldwide to ensure every product
                  we sell is 100% authentic.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers daily, from casual mobile gamers to professional
                  esports players, all while maintaining our commitment to quality, authenticity, and customer
                  satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image src="/about-hero.png" alt="Our Story" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just another digital store. Here's what sets us apart from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="professional-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>100% Authentic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our products are sourced directly from official channels. We guarantee authenticity with every
                  purchase.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle>Instant Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get your digital products delivered instantly. Most orders are processed within 5-15 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our dedicated support team is available round the clock to assist you with any queries or issues.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer the most competitive prices in Bangladesh. If you find a better deal, we'll match it.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle>Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We go above and beyond to ensure every customer has a great
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We work with international partners to bring you products from around the world at local prices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the People Behind Arekta.store</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team of gaming enthusiasts, tech experts, and customer service professionals work together to
              bring you the best digital shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="professional-card text-center">
              <CardContent className="p-6">
                <Image
                  src="/team-member-1.jpg"
                  alt="Team Member"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">Rakib Ahmed</h3>
                <p className="text-blue-600 font-medium mb-2">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Gaming enthusiast with 10+ years of experience in digital commerce and customer service.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card text-center">
              <CardContent className="p-6">
                <Image
                  src="/team-member-2.jpg"
                  alt="Team Member"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">Soud Khan</h3>
                <p className="text-emerald-600 font-medium mb-2">Head of Operations</p>
                <p className="text-gray-600 text-sm">
                  Ensures smooth operations and maintains our high standards of product authenticity and delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card text-center">
              <CardContent className="p-6">
                <Image
                  src="/team-member-3.jpg"
                  alt="Team Member"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">Arif Hassan</h3>
                <p className="text-purple-600 font-medium mb-2">Customer Success Manager</p>
                <p className="text-gray-600 text-sm">
                  Dedicated to providing exceptional customer support and ensuring customer satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Arekta.store for their digital gaming needs. Start shopping
            today and see why we're Bangladesh's #1 choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
