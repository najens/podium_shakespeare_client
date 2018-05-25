const API_ENDPOINT = 'http://shakespeare.podium.co/api/'
const REVIEWS_ENDPOINT = API_ENDPOINT + 'reviews'
const TOKEN = 'koOheljmQX'

export const fetchReviews = () =>
  fetch(REVIEWS_ENDPOINT, {
    'credentials': 'include',
    'headers': {
      'Authorization': TOKEN
    }
  }).then(res => {
		if(!res.ok) {
			throw new Error(res.statusText)
		}
		return res.json()
	})

export const fetchReview = (id) =>
	fetch(`${REVIEWS_ENDPOINT}/${id}`, {
  	'credentials': 'include',
    'headers': {
      'Authorization': TOKEN
    }
  }).then(res => {
		if(!res.ok) {
			throw new Error(res.statusText)
		}
		return res.json()
	})
