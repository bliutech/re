import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// pages
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import Camera from './pages/Camera'
import Error404 from './pages/Error404'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
	const [user, setUser] = useState()
	return (
		<div className='App'>
			{user ? <Navbar setUser={setUser} /> : null}
			<Routes>
				<Route
					path='/'
					element={<LoginRegister user={user} setUser={setUser} />}
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
				<Route path='*' element={<Error404 />} />
			</Routes>
		</div>
	)
}

export default App;
