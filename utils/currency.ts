/**
 * Utility functions for currency formatting in BDT (Bangladeshi Taka)
 */

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString("bn-BD")}`
}

export function formatPriceWithDecimals(price: number): string {
  return `৳${price.toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function parsePriceFromBDT(priceString: string): number {
  return Number.parseFloat(priceString.replace("৳", "").replace(/,/g, ""))
}

// Convert USD to BDT (approximate rate: 1 USD = 120 BDT)
export function convertUSDToBDT(usdPrice: number): number {
  return Math.round(usdPrice * 120)
}

// Price ranges for filters
export const PRICE_RANGES = {
  min: 0,
  max: 50000,
  step: 100,
  default: [0, 20000],
}
