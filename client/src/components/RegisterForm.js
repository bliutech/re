import './RegisterForm.css'
import React, { useState, useEffect } from 'react'
import { handleRegister } from '../utils/endpoints'
import { Navigate, useNavigate } from 'react-router-dom'

const RegisterForm = ({ user, setUser }) => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [err, setErr] = useState('')

	const navigate = useNavigate()

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user')
		console.log(JSON.stringify(loggedInUser))
		if (loggedInUser) {
			setUser(loggedInUser)
		}
	}, [])

	if (user) {
		console.log(user)
		return <Navigate to='/home' />
	}
	// TODO: set error message on screen
	// TODO: abstract this and register form into 1
	return (
		<div className='register-image'>
			<div className='register-page-container'>
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
							let response = await handleRegister(email, password)
							if (!response.error) {
								console.log(response)
								localStorage.setItem('user', JSON.stringify(response))
								setUser(response)
							}
							spinner.style.opacity = '0'
							signForm.style.opacity = '1'
						}}
					>
						<h2>Register</h2>
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
							Have an account?{' '}
							<span
								className='nav-login'
								onClick={() => {
									navigate('/')
								}}
							>
								Login Here
							</span>
						</p>
					</form>
					<div className='spinner' id='spinner'></div>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm
