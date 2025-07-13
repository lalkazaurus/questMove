import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { customIcon } from '../../layout/map-customize/CustomIcon/CustomIcon'
import { getQuestById } from '../../store/questSlice/questSlice'
import type { AppDispatch, RootState } from '../../store/store'
import styles from './QuestPage.module.css'

interface AnswerForm {
	answer: string
}

function MapCenterUpdater({ position }: { position: [number, number] }) {
	const map = useMap()
	useEffect(() => {
		map.setView(position)
	}, [position, map])
	return null
}

export default function QuestPage() {
	const { id } = useParams()
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const initialized = useRef(false)
	const [step, setStep] = useState<number>(0)

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<AnswerForm>({
		mode: 'onChange',
	})

	const quest = useSelector((state: RootState) => state.quests.currentData)

	useEffect(() => {
		if (id && !initialized.current) {
			dispatch(getQuestById(id))
			initialized.current = true
		}
	}, [id, dispatch])

	if (!quest) {
		return <p>Loading...</p>
	}

	const currentCheckpoint = quest.checkpoints[step]
	const position: [number, number] = [
		currentCheckpoint.lat,
		currentCheckpoint.lng,
	]

	function handleSteps() {
		setStep(prev => prev + 1)
	}

	function onSubmit(data: AnswerForm): void {
		if (currentCheckpoint.answer === data.answer) {
			if (step + 1 === quest.checkpoints.length) {
				navigate(`/quest-success/${quest.id}`)
			} else {
				handleSteps()
				reset()
				clearErrors()
			}
		} else {
			setError('answer', {
				type: 'manual',
				message: 'Your answer is wrong',
			})
		}
	}

	return (
		<>
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

				<MapCenterUpdater position={position} />

				{quest.checkpoints.map(cp => (
					<Marker
						key={cp.id ?? `${cp.lat}-${cp.lng}`}
						position={[cp.lat, cp.lng]}
						icon={customIcon}
					>
						<Popup>
							<strong>{cp.title}</strong>
							<br />
							{cp.task}
							<br />
							<b>Question:</b> {cp.question}
						</Popup>
					</Marker>
				))}
			</MapContainer>
			<div className={styles.title}>
				<h1>{quest.name}</h1>
				<span>{quest.description}</span>
			</div>

			<div className={styles.formContainer}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<h2>{`Question ${step + 1} of ${quest.checkpoints.length}`}</h2>
					<h3>{currentCheckpoint.question}</h3>

					<input {...register('answer')} />
					{errors.answer && (
						<span className={styles.errors}>{errors.answer.message}</span>
					)}
					<button type='submit'>Check my answer</button>
				</form>
			</div>

			<p
				className={styles.author}
			>{`Quest is created by ${quest.createdBy}`}</p>
		</>
	)
}
