import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { toast } from 'react-toastify'
interface MapComponentProps {
  address: string
  provinceCity: string
}

const MapComponent: React.FC<MapComponentProps> = ({ address, provinceCity }) => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true)
      try {
        const encodedAddress = encodeURIComponent(`${address}, ${provinceCity}`)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`)
        if (!response.ok) {
          throw new Error('Failed to fetch coordinates')
        }
        const data = await response.json()
        if (data.length > 0) {
          const { lat, lon } = data[0]
          setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) })
        } else {
          toast.error('Location not found')
        }
      } catch (error) {
        toast.error('Failed to fetch coordinates')
      } finally {
        setLoading(false)
      }
    }

    fetchCoordinates()
  }, [address, provinceCity])

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {loading ? (
        <div>Loading map...</div>
      ) : (
        <MapContainer center={mapCenter} zoom={25} style={{ height: '100%', width: '100%', zIndex: '10' }}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <Marker position={mapCenter}>
            <Popup>Cinema Location</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  )
}

export default MapComponent
