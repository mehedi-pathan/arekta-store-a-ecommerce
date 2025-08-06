import { formatPrice, formatPriceWithDecimals } from "@/utils/currency"

interface PriceDisplayProps {
  price: number
  className?: string
  showDecimals?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

export function PriceDisplay({ price, className = "", showDecimals = false, size = "md" }: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  }

  const formattedPrice = showDecimals ? formatPriceWithDecimals(price) : formatPrice(price)

  return <span className={`font-bold text-primary ${sizeClasses[size]} ${className}`}>{formattedPrice}</span>
}
