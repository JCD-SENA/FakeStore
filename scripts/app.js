import { addCart } from "./carrito.js"

let catalogue = document.getElementById("main")
let onCatalogue = []
let playingMusic = false;

export let products = null

async function loadCatalogue() {
	try {
		const response = await fetch("https://api.escuelajs.co/api/v1/products")
		products = await response.json()

		products.forEach((product, i) => {
			if (!onCatalogue.includes(i)) {
				const { title, images, price, category, description } = product
				const container = document.createElement("article")
				const name = document.createElement("h2")
				const image = document.createElement("img")
				const button = document.createElement("button")
				const priceValue = document.createElement("h3")
				const cath = document.createElement("span")
				const desc = document.createElement("p")
	
				container.className = "producto"
				name.textContent = title
				image.src = images[0].replaceAll('"', "").replaceAll("[", "").replaceAll("]", "")
				button.textContent = "Adquirir"
				button.addEventListener("click", () => {addCart(i)})
				priceValue.textContent = price+"$"
				container.id = i
				cath.className = "category"
				desc.className = "desc"
				cath.textContent = category["name"]
				desc.textContent = description
				container.appendChild(name)
				container.appendChild(image)
				container.appendChild(priceValue)
				container.appendChild(cath)
				container.appendChild(desc)
				container.appendChild(button)
				catalogue.appendChild(container)
				onCatalogue.push(i)
			}
		})
	} catch (error) {
		console.error(error)
		catalogue.style.fontSize = "75px"
		catalogue.innerHTML = "La API no respondió."
	}
}

export function addCatalogue (name, priceNumber, img) {
	products.push({
		"nombre": name,
		"img": img,
		"precio": price
	})
	loadCatalogue()
}

document.getElementById("footer").addEventListener("click", () => {
	let themenoid = new Audio("https://vgmtreasurechest.com/soundtracks/club-penguin-original-soundtrack/eayrodluzi/29.%20Charlie%27s%20Here.mp3");
    if (!playingMusic)
        themenoid.play()
    playingMusic = true;
})

window.addEventListener("DOMContentLoaded", loadCatalogue)