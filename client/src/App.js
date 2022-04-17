import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// pages

import Home from './pages/Home'
import LoginForm from './components/LoginForm'
import Camera from './pages/Camera'
import Error404 from './pages/Error404'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import RegisterForm from './components/RegisterForm'
import About from "./pages/About";

function App() {
	const [user, setUser] = useState()
	return (
		<div className='App'>
			{user ? <Navbar setUser={setUser} /> : null}
			<Routes>
				<Route path='/' element={<LoginForm user={user} setUser={setUser} />} />
				<Route
					path='/register'
					element={<RegisterForm user={user} setUser={setUser} />}
				/>
				<Route
					path='/home'
					element={
						<ProtectedRoute user={user}>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path='/camera' element={<Camera />} />
        <Route path="/about" element={<About />} />
				<Route path='*' element={<Error404 />} />
			</Routes>
		</div>
	)
}

export default App
