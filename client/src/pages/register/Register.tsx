import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../../store/store'
import { registration } from '../../store/userSlice/userSlice'
import type { IUserLogin } from '../../types/User'
import styles from './Register.module.css'

type RegisterFormData = IUserLogin & {
	passwordAgain: string
}

export default function Register() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const { register, handleSubmit, reset, formState, setError } =
		useForm<RegisterFormData>({
			mode: 'onChange',
		})

	const emailError = formState.errors['email']?.message
	const passwordError = formState.errors['password']?.message
	const passwordAgain = formState.errors['passwordAgain']?.message

	const onSubmit = (data: RegisterFormData) => {
		if (data.password === data.passwordAgain) {
			dispatch(
				registration({
					email: data.email,
					password: data.password,
					nickname: data.nickname,
				})
			)
			navigate('/user/login')
		} else {
			setError('passwordAgain', {
				type: 'manual',
				message: 'You have entered different passwords',
			})
		}
	}

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Register</h1>
				<input
					placeholder='Nickname'
					{...register('nickname', {
						required: 'Username is required',
						minLength: {
							value: 3,
							message: 'Nickname has to be longer than 3 characters',
						},
						pattern: {
							value: /^[A-Za-z]+$/,
							message: 'Nickname has to contain only English letters',
						},
					})}
				/>
				<input
					placeholder='Email'
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value:
								/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/,
							message: 'This text has to be an email',
						},
					})}
				/>
				{emailError && <p className={styles.error}>{emailError}</p>}
				<input
					type='password'
					placeholder='Password'
					{...register('password', {
						required: 'Password is required',
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
							message: 'Your password not strong enough',
						},
					})}
				/>
				{passwordError && <p className={styles.error}>{passwordError}</p>}
				<input
					type='password'
					placeholder='Please enter password again'
					{...register('passwordAgain', {
						required: 'Password is required',
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
							message: 'Your password not strong enough',
						},
					})}
				/>
				{passwordAgain && <p className={styles.error}>{passwordAgain}</p>}
				<button className={styles.submit} type='submit'>
					Send
				</button>
				<button className={styles.reset} onClick={() => reset()}>
					Reset
				</button>
			</form>
		</div>
	)
}
