export const handleLogin = async (email, password) => {
	const data = {
		username: email,
		password: password,
	}
	const res = await fetch('http://localhost:5000/auth', {
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
