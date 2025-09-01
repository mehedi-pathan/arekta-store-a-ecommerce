/**
 * Utility functions for safe localStorage operations
 */

/**
 * Safely parse JSON from localStorage with error handling
 * @param key - The localStorage key
 * @param defaultValue - Default value to return if parsing fails
 * @returns Parsed data or default value
 */
export function safeGetFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue
  }

  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }

    // Basic validation to prevent JSON injection
    if (typeof item !== "string" || item.trim() === "") {
      return defaultValue
    }

    const parsed = JSON.parse(item)
    
    // Additional validation - ensure parsed data is expected type
    if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
      console.warn(`Expected array for localStorage key "${key}", got ${typeof parsed}`)
      return defaultValue
    }
    
    if (typeof defaultValue === "object" && defaultValue !== null && !Array.isArray(defaultValue)) {
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        console.warn(`Expected object for localStorage key "${key}", got ${typeof parsed}`)
        return defaultValue
      }
    }

    return parsed
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Safely set data to localStorage with error handling
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns boolean indicating success
 */
export function safeSetToLocalStorage<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") {
    return false
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Safely remove item from localStorage
 * @param key - The localStorage key to remove
 * @returns boolean indicating success
 */
export function safeRemoveFromLocalStorage(key: string): boolean {
  if (typeof window === "undefined") {
    return false
  }

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
    return false
  }
}