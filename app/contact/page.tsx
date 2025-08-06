import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, MessageSquare, Clock, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about PUBG UC or iTunes cards? Our support team is available 24/7 to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* WhatsApp */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-green-700">
                <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                WhatsApp Support
              </CardTitle>
              <CardDescription className="text-green-700/70">Fastest response time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
                  <Image src="/whatsapp-logo.png" alt="WhatsApp" width={28} height={28} />
                </div>
                <div>
                  <p className="font-medium text-green-800">WhatsApp Chat</p>
                  <p className="text-green-700">+8801622839616</p>
                </div>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                <Link href="https://wa.me/8801622839616" target="_blank" rel="noopener noreferrer">
                  Chat Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-blue-700">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                Phone Support
              </CardTitle>
              <CardDescription className="text-blue-700/70">Call us directly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-blue-800">Customer Service</p>
                  <p className="text-blue-700">+8801622839616</p>
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="tel:+8801622839616">Call Now</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-700">
                <Mail className="h-5 w-5 mr-2 text-purple-600" />
                Email Support
              </CardTitle>
              <CardDescription className="text-purple-700/70">For detailed inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
                  <Mail className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-purple-800">Customer Support</p>
                  <p className="text-purple-700">support@arekta.store</p>
                </div>
              </div>
              <Button className="w-full bg-purple-500 hover:bg-purple-600" asChild>
                <Link href="mailto:support@arekta.store">Email Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Business Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>We're available to assist you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-gray-600">24/7 - Always Available</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-gray-600">24/7 - Instant Delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
                <CardDescription>Based in Bangladesh</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Dhaka, Bangladesh</p>
                    <p className="text-gray-600">Online Store - Digital Delivery Only</p>
                  </div>
                </div>
                <div className="aspect-video relative rounded-md overflow-hidden">
                  <Image src="/bangladesh-map.png" alt="Bangladesh Map" fill className="object-cover" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">How long does delivery take?</h3>
              <p className="text-gray-600">
                For PUBG UC and iTunes cards, delivery is typically instant to within 15 minutes after payment
                confirmation.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept bKash, Nagad, Rocket, bank transfers, and other popular payment methods in Bangladesh.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg">Are your products authentic?</h3>
              <p className="text-gray-600">
                Yes, all our PUBG UC and iTunes cards are 100% authentic and sourced directly from official channels.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg">What if I don't receive my order?</h3>
              <p className="text-gray-600">
                In the rare case of a delay, please contact our support via WhatsApp and we'll resolve it immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
