import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuests } from '../../store/questSlice/questSlice'
import type { AppDispatch, RootState } from '../../store/store'
import QuestElement from './components/QuestElement/QuestElement'
import styles from './Main.module.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41],
})

export default function Main() {
	const position = [51.505, -0.09]
	const initialized = useRef(false)
	const dispatch = useDispatch<AppDispatch>()
	if (!initialized.current) {
		dispatch(getAllQuests())
		initialized.current = true
	}
	const quests = useSelector((state: RootState) => state.quests.quests)

	return (
		<div className='map-container'>
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				style={{ height: '500px', width: '100%' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
			<h1 className={styles.questTitle}>Acceptable quests</h1>
			<div className={styles.questContainer}>
				{quests.map(quest => (
					<QuestElement key={quest.id} quest={quest} />
				))}
			</div>
		</div>
	)
}
