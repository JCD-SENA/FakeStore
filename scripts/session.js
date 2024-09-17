/* Creé este archivo pensando que me iba a costar más crear el usuario, pero al final resulta que nada se registra por lo que
decidí hacer el carrito de formal local. */

export async function createUser() {
	if (localStorage.getItem("user-id") == null) {
		const response = await fetch('https://fakestoreapi.com/users',{
            method:"POST",
            body:JSON.stringify({
				email:"testest@email.com",
				username:"bosniachorseman",
				password:"ñ987654321"
			})
		})
		let user = await response.json()
		localStorage.setItem("user-id", user["id"])
	}
}