import { addCart } from "./cart.js"
import { createUser } from "./session.js"

let catalogue = null
let filter = {}

export let products = null

async function loadCategories() {
	const categoryFetch = await fetch("https://fakestoreapi.com/products/categories")
	const categories = await categoryFetch.json()
	categories.forEach((category) => {
		const option = document.createElement("option")
		option.value = category
		option.textContent = category
		document.getElementById("categories").appendChild(option)
	})
}

async function loadCatalogue() {
	try {
		catalogue.innerHTML = ""
		let url = "https://fakestoreapi.com/products"
		if (filter["category"] != undefined && filter["category"] != "")
			url = "https://fakestoreapi.com/products/category/"+filter.category
		const response = await fetch(url)
		products = await response.json()
		if (filter != null) {
			if (filter["priceFilter"] == "expensive") {
				products.sort((item, secondItem) => {
					if (item.price < secondItem.price)
						return 1
					else
						return -1
				})
			} else if (filter["priceFilter"] == "cheaper") {
				products.sort((item, secondItem) => {
					if (item.price > secondItem.price)
						return 1
					else
						return -1
				})
			}
		}
		products.forEach((product, i) => {
			const { title, image, price, category, description } = product
			const container = document.createElement("article")
			const name = document.createElement("h2")
			const imageContainer = document.createElement("img")
			const button = document.createElement("button")
			const priceValue = document.createElement("h3")
			const cath = document.createElement("span")
			const desc = document.createElement("p")

			container.className = "product"
			name.textContent = title
			imageContainer.src = image
			button.textContent = "Adquirir"
			button.addEventListener("click", () => {
				addCart(product)
			})
			priceValue.textContent = price+"$"
			container.id = i
			cath.className = "category"
			desc.className = "desc"
			cath.textContent = category["name"]
			desc.textContent = description
			container.appendChild(name)
			container.appendChild(imageContainer)
			container.appendChild(priceValue)
			container.appendChild(cath)
			container.appendChild(desc)
			container.appendChild(button)
			catalogue.appendChild(container)
		})
		
	} catch (error) {
		console.error(error)
		catalogue.style.fontSize = "75px"
		catalogue.innerHTML = "La API no respondió."
	}
}

window.addEventListener("DOMContentLoaded", () => {
	catalogue = document.getElementById("container-products")
	document.getElementById("filter-expensive").addEventListener("click", () => {
		filter["priceFilter"] = "expensive"
		loadCatalogue()
	})
	document.getElementById("filter-cheaper").addEventListener("click", () => {
		filter["priceFilter"] = "cheaper"
		loadCatalogue()
	})
	document.getElementById("categories").addEventListener("change", (e) => {
		filter["category"] = e.srcElement.value
		loadCatalogue()
	})
	createUser()
	loadCategories()
	loadCatalogue()
})