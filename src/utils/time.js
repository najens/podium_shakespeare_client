export const timeElapsed = (reviewDate) => {
	const date = new Date(reviewDate)
	const now = new Date()
	const timeInSeconds = (now.getTime() - date.getTime()) / 1000

  switch(timeInSeconds) {
    case timeInSeconds < 60 :
      return `${timeInSeconds} seconds ago`
		case timeInSeconds < 60 * 2 :
			const min = Math.round(timeInSeconds / 60)
			return `${min} minute ago`
		case timeInSeconds < 60 * 60 :
			const mins = Math.round(timeInSeconds / 60)
			return `${mins} minutes ago`
		case timeInSeconds < 60 * 60 * 2:
			const hr = Math.round(timeInSeconds / (60 * 60))
			return `${hr} hour ago`
		case timeInSeconds < 60 * 60 * 24 :
			const hrs = Math.round(timeInSeconds / (60 * 60))
			return `${hrs} hours ago`
		case timeInSeconds < 60 * 60 * 24 * 2:
			const day = Math.round(timeInSeconds / (60 * 60 * 24))
			return `${day} day ago`
		case timeInSeconds < 60 * 60 * 24 * 30.475 :
			const days = Math.round(timeInSeconds / (60 * 60 * 24))
			return `${days} days ago`
		case timeInSeconds < 60 * 60 * 24 * 30.475 * 2 :
			const mon = Math.round(timeInSeconds / (60 * 60 * 24 * 30.475))
			return `${mon} month ago`
		case timeInSeconds < 60 * 60 * 24 * 365.25 :
			const mons = Math.round(timeInSeconds / (60 * 60 * 24 * 30.475))
			return `${mons} months ago`
		case timeInSeconds < 60 * 60 * 24 * 365.25 * 2 :
			const yr = Math.round(timeInSeconds / (60 * 60 * 24 * 365.25))
			return `${yr} year ago`
    default :
			const yrs = Math.round(timeInSeconds / (60 * 60 * 24 * 365.25))
      return `${yrs} years ago`
  }
}

export const getMonthDayYear = (reviewDate) => {
	const date = new Date(reviewDate)
	let month = date.getMonth()
	month = convertMonth(month)
	const day = date.getDate()
	let year = date.getYear()
	year = convertYear(year)
	return `${month} ${day}, ${year}`
}

const convertMonth = (month) => {
	switch(month) {
		case 1 :
			return 'January'
		case 2 :
			return 'February'
		case 3 :
			return 'March'
		case 4 :
			return 'April'
		case 5 :
			return 'May'
		case 6 :
			return 'June'
		case 7 :
			return 'July'
		case 8 :
			return 'August'
		case 9 :
			return 'September'
		case 10 :
			return 'October'
		case 11 :
			return 'November'
		case 12 :
			return 'December'
		default:
			return null
	}
}

const convertYear = (year) => {
	const convertedYear = year + 1900
	return convertedYear.toString()
}
