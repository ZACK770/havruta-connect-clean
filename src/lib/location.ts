import { Geolocation, Position } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'

export interface UserLocation {
  latitude: number
  longitude: number
  city?: string // Will be populated via reverse geocoding in a real app
}

export class LocationService {
  /**
   * Request permissions and get current location
   */
  static async getCurrentLocation(): Promise<UserLocation> {
    try {
      // Check permissions
      const permissions = await Geolocation.checkPermissions()
      
      if (permissions.location !== 'granted') {
        const request = await Geolocation.requestPermissions()
        if (request.location !== 'granted') {
          throw new Error('Location permission denied')
        }
      }

      // Get position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      })

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    } catch (error) {
      console.error('Error getting location:', error)
      
      // Fallback for web if Capacitor fails
      if (!Capacitor.isNativePlatform()) {
        return this.getWebLocation()
      }
      
      throw error
    }
  }

  /**
   * Fallback for standard web browser geolocation
   */
  private static getWebLocation(): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          reject(error)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      )
    })
  }

  /**
   * Calculate distance between two coordinates in kilometers using Haversine formula
   */
  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return Math.round(distance * 10) / 10 // Round to 1 decimal place
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}
