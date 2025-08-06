"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const whatsappNumber = "+8801622839616"
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}`

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Popup Message */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 mb-2 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 shadow-md">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">Customer Support</h3>
              <p className="text-xs text-green-600 font-medium">ONLINE NOW</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Need help with <span className="text-orange-600 font-semibold">PUBG UC</span> or{" "}
            <span className="text-blue-600 font-semibold">iTunes cards</span>? Our support team is ready to assist! 🚀
          </p>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg font-medium"
            size="sm"
            asChild
          >
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start WhatsApp Chat
            </Link>
          </Button>

          <p className="text-xs text-center text-gray-500 mt-3">Response time: &lt; 30 seconds ⚡</p>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-green-600 hover:bg-green-700 hover:scale-110"
          }`}
          aria-label="WhatsApp Support"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
        </Button>

        {/* Notification Dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </div>
    </div>
  )
}
