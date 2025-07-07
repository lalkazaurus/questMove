import { useFieldArray, useForm } from 'react-hook-form'
import { TbXboxX } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { addQuest } from '../../store/questSlice/questSlice'
import type { AppDispatch } from '../../store/store'
import type { Quest } from '../../types/Quest'
import styles from './AddQuest.module.css'

export default function AddQuest() {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
		control,
		setError,
		clearErrors,
	} = useForm<Quest>({
		mode: 'onChange',
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'checkpoints',
	})

	const dispatch = useDispatch<AppDispatch>()

	function onSubmit(data: Quest): void {
		if (data.checkpoints.length < 1) {
			setError('checkpoints', {
				type: 'manual',
				message: 'Має бути хоча б один чекпоінт',
			})
		} else {
			clearErrors('checkpoints')
			dispatch(addQuest(data))
			reset()
		}
	}

	return (
		<>
			<div className={styles.formContainer}>
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
							{errors.description && <span>{}</span>}
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
										lat: 0,
										lng: 0,
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
											type='number'
											placeholder='Latitude'
											{...register(`checkpoints.${index}.lat` as const, {
												required: 'Latitude is required',
												valueAsNumber: true,
											})}
										/>

										<label>Longitude</label>
										<input
											type='number'
											placeholder='Longitude'
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
