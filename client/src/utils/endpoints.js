export function backend(endpoint){
	const mode = "development" // "development or "production"
	if (mode === "production")
	{
		return "" + endpoint;
	}
	else
	{
		return "http://localhost:8000/" + endpoint;
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
