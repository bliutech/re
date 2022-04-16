import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';

// pages
import Home from './pages/Home';
import LoginRegister from './pages/Login';
import Camera from './pages/Camera';
import Error404 from './pages/Error404';

import Navbar from './components/Navbar';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<LoginRegister />} />
				<Route path='/camera' element={<Camera />} />
				<Route path='*' element={<Error404 />} />
			</Routes>
		</div>
	)
}

export default App
