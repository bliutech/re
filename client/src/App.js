import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginRegister from './pages/Login';
import Camera from './pages/Camera';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<LoginRegister />} />
				<Route path='/camera' element={<Camera />} />
			</Routes>
		</div>
	)
}

export default App
