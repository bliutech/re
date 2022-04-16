import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
import 'font-awesome/css/font-awesome.min.css'

export default function Navbar() {
	const [isActive, setActive] = useState(false)
	const navBtn = document.getElementById('nav-toggle')
	const links = document.getElementById('nav-links')
	// add event listener

	return (
		<header id='home'>
			<nav className='navbar'>
				<div className='nav-center'>
					<div className='nav-header'>
						<button
							type='button'
							className='nav-toggle'
							id='nav-toggle'
							onClick={() => {
								setActive(!isActive)
							}}
						>
							<FontAwesomeIcon icon={faBars} />
						</button>
					</div>
					<ul
						className={isActive ? 'nav-links show-links' : 'nav-links'}
						id='nav-links'
					>
						<li>
							<a href='#home' className='nav-link scroll-link'>
								home
							</a>
						</li>
						<li>
							<a href='#services' className='nav-link scroll-link'>
								recycle
							</a>
						</li>
						<li>
							<a href='#featured' className='nav-link scroll-link'>
								leaderboard
							</a>
						</li>
						<li>
							<a href='#gallery' className='nav-link scroll-link'>
								about
							</a>
						</li>
						<li>
							<a href='#gallery' className='nav-link scroll-link'>
								logout
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	)
}
