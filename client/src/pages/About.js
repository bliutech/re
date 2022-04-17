import React from 'react'
import './About.css'
export default function About() {
	return (
		<div className='about-container'>
			<div className='element-1'>
				<h1 className='first'>Recycling </h1>
				<h1 className='second'>Elevated</h1>
			</div>
			<div className='element-2'>
				<p>
					Ever walked over to the recycling/garbage bins before realizing that
					you don't actually know which one to throw your trash in? Instead of
					randomly choosing whichever bin seems the most logical, use <b>Re</b>{' '}
					to help you figure out where to throw out your trash.{' '}
				</p>
			</div>
			<h5>So how does Re work?</h5>
			<ul>
				<li>
					First, please take a photo of your trash using our built-in camera app
				</li>
				<li>Our Tensorflow model then predicts what that trash is</li>
				<li>
					Finally, we correlate your trash to its corresponding type (landfill,
					recycle, compost, or special) so that you can both improve your
					recycling habits and feel at ease after disposing of your trash.
				</li>
			</ul>
			<h3>Meet the Team</h3>
			<table>
				<tr>
					<td>Benson Liu</td>
					<td>Jordan Lin</td>
					<td>Connor Pederson</td>
					<td>Ming Zhu</td>
					<td>Henry Wang</td>
				</tr>
			</table>
		</div>
	)
}
