import React from 'react'
import './About.css'
export default function About() {
	return (
		<div className='about-container-2'>
			<div className='about-container'>
				<div className='element-1'>
					<h1 className='first'>Recycling </h1>
					<h1 className='second'>Elevated</h1>
				</div>
				<div className='element-2'>
					<div className='section'>
						<h1>
							<span className='Re'>Re</span>asoning
						</h1>
						<p>
							Ever walked over to the recycling/garbage bins before realizing
							that you don't actually know which one to throw your trash in?
							Instead of randomly choosing whichever bin seems the most logical,
							use <b>RE</b> to help you figure out where to throw out your
							trash.
						</p>
					</div>
				</div>
				<div className='element-2'>
					<div className='section'>
						<h1>
							<span className='Re'>Re</span>fer
						</h1>
						<p>
							Simply take a photo of your trash using our built-in camera app,
							and our machine learning model will categorize into one of the
							four categories: landfill, recycle, compost, or special.
						</p>
					</div>
				</div>

				<div className='element-2'>
					<div className='section '>
						<h1>
							c<span className='Re'>Re</span>eators
						</h1>
						<p>Connor Pedersen</p>
						<p>Jordan Lin</p>
						<p>Ming Zhu</p>
						<p>Benson Liu</p>
						<p>Henry Wang</p>
					</div>
				</div>
			</div>
		</div>
	)
}
