import LoginForm from '../components/LoginForm'
import './Login.css'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
const LoginRegister = ({ user, setUser }) => {
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

	return (
		<div className='login-image'>
			<div className='login-page-container'>
				<LoginForm setUser={setUser} />
			</div>
		</div>
	)
}

export default LoginRegister
