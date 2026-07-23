import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useLang } from '../context/LangContext'

// Coordonnées approximatives du centre-ville d'Antsirabe, Madagascar
const ANTSIRABE_COORDS: [number, number] = [-19.8667, 47.0333]

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const { t } = useLang()

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: ANTSIRABE_COORDS,
      zoom: 15,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    const icon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="
        width: 34px; height: 34px; border-radius: 50%;
        background: #C97A53; border: 3px solid #FAF7F2;
        box-shadow: 0 4px 10px rgba(46,64,51,0.35);
        display:flex; align-items:center; justify-content:center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FAF7F2" width="16" height="16">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
        </svg>
      </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
    })

    L.marker(ANTSIRABE_COORDS, { icon })
      .addTo(map)
      .bindPopup(`<strong>Boutique Mahalia</strong><br/>${t.contact.mapCaption}`)
      .openPopup()

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={mapRef}
      className="h-full w-full"
      role="application"
      aria-label={t.contact.mapCaption}
    />
  )
}
