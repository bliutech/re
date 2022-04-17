export function backend(endpoint) {
	const mode = 'development' // "development or "production"
	if (mode === 'production') {
		return '' + endpoint
	} else {
		return 'http://localhost:8000/' + endpoint
	}
}

export const handleLogin = async (email, password) => {
	const data = {
		username: email,
		password: password,
	}
	const res = await fetch(backend('auth'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	if (res.status >= 400) {
		return {
			error: 'Incorrect username or password',
		}
	} else {
		const user = await res.json()
		console.log(user)
		return user
	}
}

export const handleRegister = async (email, password) => {
	const data = {
		username: email,
		password: password,
	}
	const res = await fetch(backend('register'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	if (res.status >= 400) {
		return {
			error: 'User already exists with email',
		}
	} else {
		const user = await res.json()
		console.log(user)
		return user
	}
}

export const handleIncrement = async (name, category) => {
	const data = {
		username: name,
		category: category,
	}
	console.log(data)
	const res = await fetch(backend('points'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	if (res.status >= 400) {
		return {
			error: 'Increment Failed',
		}
	} else {
		const user = await res.json()
		console.log(user)
		return user
	}
}
