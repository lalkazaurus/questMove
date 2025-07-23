import type { Marker as LeafletMarker } from 'leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { TbXboxX } from 'react-icons/tb'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../../layout/loading-component/LoadingComponent'
import { customIcon } from '../../layout/map-customize/CustomIcon/CustomIcon'
import { addQuest } from '../../store/questSlice/questSlice'
import type { AppDispatch, RootState } from '../../store/store'
import type { Quest } from '../../types/Quest'
import styles from './AddQuest.module.css'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
})

function DraggableMarker({
	initialPosition,
	onPositionChange,
}: {
	initialPosition: { lat: number; lng: number }
	onPositionChange: (lat: number, lng: number) => void
}) {
	const draggable = true
	const [position, setPosition] = useState(initialPosition)
	const markerRef = useRef<LeafletMarker | null>(null)

	useEffect(() => {
		setPosition(initialPosition)
	}, [initialPosition])

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					const newPosition = marker.getLatLng()
					setPosition(newPosition)
					onPositionChange(newPosition.lat, newPosition.lng)
				}
			},
		}),
		[onPositionChange]
	)

	return (
		<Marker
			draggable={draggable}
			eventHandlers={eventHandlers}
			position={position}
			ref={markerRef}
			icon={customIcon}
		>
			<Popup className={styles.popup} minWidth={90}>
				<span>Move me to your destination</span>
			</Popup>
		</Marker>
	)
}

export default function AddQuest() {
	const navigate = useNavigate()
	const { user, isLoading } = useSelector((state: RootState) => state.user)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
		control,
		setError,
		clearErrors,
		setValue,
	} = useForm<Quest>({
		mode: 'onChange',
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'checkpoints',
	})

	const [markerPosition, setMarkerPosition] = useState({
		lat: 51.505,
		lng: -0.09,
	})

	function setCheckpointCoords(lat: number, lng: number, index: number): void {
		setValue(`checkpoints.${index}.lat`, lat)
		setValue(`checkpoints.${index}.lng`, lng)
	}

	const dispatch = useDispatch<AppDispatch>()

	function onSubmit(data: Quest): void {
		if (data.checkpoints.length < 1) {
			setError('checkpoints', {
				type: 'manual',
				message: 'There has to be at least one checkpoint',
			})
		} else {
			clearErrors('checkpoints')
			dispatch(addQuest(data))
			reset()
		}
	}

	if (isLoading) {
		return <LoadingComponent />
	}

	if (!['ADMIN', 'MODERATOR'].includes(user.role)) {
		navigate('/')
	}

	return (
		<>
			<div className={styles.formContainer}>
				<MapContainer
					center={markerPosition}
					zoom={13}
					scrollWheelZoom={false}
					style={{ height: '400px', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<DraggableMarker
						initialPosition={markerPosition}
						onPositionChange={(lat, lng) => setMarkerPosition({ lat, lng })}
					/>
				</MapContainer>
				<p>{`Current coordinates: ${markerPosition.lat} ${markerPosition.lng}`}</p>
				<h1 className={styles.title}>Create a quest</h1>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.formBody}>
						<div className={styles.mainInfo}>
							<input
								type='hidden'
								value={crypto.randomUUID()}
								{...register('id')}
							/>
							<label>Enter a name of your quest</label>
							<input
								placeholder='Name'
								{...register('name', {
									required: 'Name is required',
									minLength: {
										value: 4,
										message: 'Name has to be longer than 4 symbols',
									},
									pattern: {
										value: /^[A-ZА-ЯЇЄІҐ][a-zа-яїєіґA-ZА-ЯЇЄІҐ0-9\s]{3,}$/,
										message: 'First letter has to be in Upper case',
									},
								})}
							/>
							{errors.description && <span>{errors.description.message}</span>}
							<label>Please enter a description</label>
							<textarea
								placeholder='Description'
								{...register('description', {
									minLength: {
										value: 20,
										message: 'Description must be longer than 4 symbols',
									},
									pattern: {
										value:
											/^[A-ZА-ЯЇЄІҐ][a-zа-яїєіґA-ZА-ЯЇЄІҐ0-9\s.,!?:;"'()-]{3,}$/,
										message: 'First letter has to be in Upper case',
									},
								})}
							/>
							{errors.description && <span>{}</span>}
							<input
								type='hidden'
								value={'Lalkazaurus'}
								{...register('createdBy')}
							/>
							<button
								className={styles.addCheckpointBtn}
								onClick={() =>
									append({
										lat: markerPosition.lat,
										lng: markerPosition.lng,
										title: '',
										task: '',
										question: '',
										answer: '',
									})
								}
							>
								{'Add quest'}
							</button>
						</div>
						<div className={styles.checkpoints}>
							{fields.length > 0 ? (
								fields.map((field, index) => (
									<div className={styles.quest} key={field.id}>
										<p>Checkpoint №{index + 1}</p>

										<label>Latitude</label>
										<input
											type='text'
											placeholder='Latitude'
											disabled
											{...register(`checkpoints.${index}.lat` as const, {
												required: 'Latitude is required',
												valueAsNumber: true,
											})}
										/>

										<label>Longitude</label>
										<input
											type='text'
											placeholder='Longitude'
											disabled
											{...register(`checkpoints.${index}.lng` as const, {
												required: 'Longitude is required',
												valueAsNumber: true,
											})}
										/>

										<label>Title</label>
										<input
											placeholder='Title'
											{...register(`checkpoints.${index}.title` as const, {
												required: 'Title is required',
												minLength: {
													value: 4,
													message: 'Title has to be longer than 4 symbols',
												},
												pattern: {
													value:
														/^[A-ZА-ЯЇЄІҐ][a-zа-яїєіґA-ZА-ЯЇЄІҐ0-9\s]{3,}$/,
													message: 'First letter has to be in Upper case',
												},
											})}
										/>

										<label>Task</label>
										<input
											placeholder='Task'
											{...register(`checkpoints.${index}.task` as const, {
												required: 'Task is required',
												minLength: {
													value: 4,
													message: 'Task has to be longer than 4 symbols',
												},
												pattern: {
													value:
														/^[A-ZА-ЯЇЄІҐ][a-zа-яїєіґA-ZА-ЯЇЄІҐ0-9\s]{3,}$/,
													message: 'First letter has to be in Upper case',
												},
											})}
										/>

										<label>Question(optional)</label>
										<input
											placeholder='Question(optional)'
											{...register(`checkpoints.${index}.question` as const, {
												minLength: {
													value: 10,
													message: 'Question has to be longer than 10 symbols',
												},
												pattern: {
													value:
														/^[A-ZА-ЯЇЄІҐ][a-zа-яїєіґA-ZА-ЯЇЄІҐ0-9\s]{3,}$/,
													message: 'First letter has to be in Upper case',
												},
											})}
										/>

										<label>Answer(optional)</label>
										<input
											placeholder='Answer(optional)'
											{...register(`checkpoints.${index}.answer` as const, {
												minLength: {
													value: 10,
													message: 'Answer has to be longer than 10 symbols',
												},
												pattern: {
													value:
														/^[A-ZА-ЯЇЄІҐ][a-zа-яїєіґA-ZА-ЯЇЄІҐ0-9\s]{3,}$/,
													message: 'First letter has to be in Upper case',
												},
											})}
										/>

										<button
											className={styles.remove}
											type='button'
											onClick={() => remove(index)}
										>
											<TbXboxX size={25} />
										</button>
										<button
											className={styles.coordBtn}
											onClick={() =>
												setCheckpointCoords(
													markerPosition.lat,
													markerPosition.lng,
													index
												)
											}
										>
											Use Current Coordinates
										</button>
									</div>
								))
							) : (
								<p className={styles.noCheckpoints}>
									There are no checkpoints in this quest
								</p>
							)}
						</div>
					</div>
					<div className={styles.buttonBlock}>
						<button className={styles.submit} type='submit'>
							{'Submit'}
						</button>
						<button className={styles.reset} onClick={() => reset()}>
							{'Reset'}
						</button>
					</div>
				</form>
			</div>
		</>
	)
}
