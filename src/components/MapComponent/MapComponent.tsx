import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { toast } from 'react-toastify'
import { Icon } from 'leaflet'
import { FaMapMarkerAlt } from 'react-icons/fa'
import ReactDOMServer from 'react-dom/server'
import { API_URL } from './constant'

interface MapComponentProps {
  address: string
  provinceCity: string
}

const customIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToString(<FaMapMarkerAlt size={38} color='red' />))}`,
  iconSize: [30, 30]
})

const MapComponent: React.FC<MapComponentProps> = ({ address, provinceCity }) => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true)
      try {
        const encodedAddress = encodeURIComponent(`${address}, ${provinceCity}`)
        const response = await fetch(`${API_URL}?format=json&q=${encodedAddress}`)
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
    <div className='h-100 min-w-full'>
      {loading ? (
        <div>Loading map...</div>
      ) : (
        <MapContainer center={mapCenter} zoom={25} className='z-10 h-full w-full'>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <Marker position={mapCenter} icon={customIcon}>
            <Popup>Cinema Location</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  )
}

export default MapComponent
