import L from 'leaflet'

export const customIcon = L.icon({
	iconUrl: '/3.png',
	iconSize: [40, 40],
	iconAnchor: [20, 40],
	popupAnchor: [0, -40],
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	shadowSize: [41, 41],
	shadowAnchor: [12, 41],
})
