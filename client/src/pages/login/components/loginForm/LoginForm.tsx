import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import type { AppDispatch } from '../../../../store/store'
import { login } from '../../../../store/userSlice/userSlice'
import type { IUserLogin } from '../../../../types/User'
import styles from './LoginForm.module.css'

export default function LoginForm() {
	const dispatch = useDispatch<AppDispatch>()

	const { register, handleSubmit, reset, formState } = useForm<IUserLogin>({
		mode: 'onChange',
	})

	const emailError = formState.errors['email']?.message
	const passwordError = formState.errors['password']?.message

	const onSubmit = (data: IUserLogin) => {
		dispatch(login({ email: data.email, password: data.password }))
	}

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Login</h1>
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
				<button className={styles.submit} type='submit'>
					Send
				</button>
				<button className={styles.reset} onClick={() => reset()}>
					Reset
				</button>
				<Link className={styles.registerLink} to={'/user/register'}>
					If you don't have an account, please register
				</Link>
			</form>
		</div>
	)
}
