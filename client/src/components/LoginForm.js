import './LoginForm.css'
import React, { useState } from 'react'
import { handleLogin } from '../utils/endpoints'
const LoginForm = ({ setUser }) => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [err, setErr] = useState('')

	// TODO: set error message on screen
	// TODO: abstract this and register form into 1
	return (
		<div className='form-container'>
			<form
				className='sign-form'
				id='sign-form'
				onSubmit={async (e) => {
					e.preventDefault()
					let signForm = document.getElementById('sign-form')
					let spinner = document.getElementById('spinner')
					signForm.style.opacity = '0'
					spinner.style.opacity = '1'
					let response = await handleLogin(email, password)
					if (!response.error) {
						response.username = email
						response.password = password
						console.log(response)
						localStorage.setItem('user', JSON.stringify(response))
						setUser(response)
					}
					spinner.style.opacity = '0'
					signForm.style.opacity = '1'
				}}
			>
				<h2>Sign In</h2>
				<div className='line'></div>
				<input
					type='email'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
					className='sign-form-input'
					placeholder='Email'
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
					className='sign-form-input'
				/>
				<input type='submit' className='btn sign-btn' />
				<p className='forgot-pass'>
					Don't have an account{' '}
					<span className='nav-register'>Register Here</span>
				</p>
			</form>
			<div className='spinner' id='spinner'></div>
		</div>
	)
}

export default LoginForm
