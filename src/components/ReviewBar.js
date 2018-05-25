import React from 'react'
import { FaStar } from 'react-icons/lib/fa'

const ReviewBar = (props) => {
	const num = props.num
	const maxRating = props.maxRating
	const distribution = props.distribution

	return (
		<div className='d-flex mt-1 mb-1'>
			<div className='mr-2'>
				{num} <FaStar />
			</div>
			<div className='bar-background'>
				<div className='bar-style' style={createBarStyle(num, maxRating, distribution)}></div>
			</div>
			<div className='ml-2 flex-1 text-right'>{distribution[num]}</div>
		</div>
	)
}

export default ReviewBar

const createBarStyle = (num, maxRating, distribution) => {
	let pct
	if (distribution[num] === maxRating) {
		pct = 100
	} else {
		pct = Math.round(distribution[num] / maxRating * 100)
	}
	return {
		width: `${pct}%`,
	}
}
