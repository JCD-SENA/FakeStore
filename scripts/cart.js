import { addCartAlert } from "./alerts.js"
import { products } from "./app.js"

export function addCart (item) {
	if (parseCart().indexOf(item.id.toString()) == -1) {
		localStorage.setItem("cart",item.id+","+localStorage.getItem("cart"))
		displayCart()
		addCartAlert("Se ha añadido el producto \""+item.title+"\" al carrito!")
	} else {
		addCartAlert("El producto ya fue añadido al carrito")
	}
}

let cartList = document.getElementById("cart-elements")

function parseCart () {
	if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == "null")
		return "No hay nada en el carrito"
	let res = []
	localStorage.getItem("cart").split(",").forEach((item, i) => {
		res.push(item)
	})
	return res
}

function displayCart() {
	let cart = parseCart()
	cartList.innerHTML = ""
	if (Array.isArray(cart)) {
		let quantities = {}
		let totalPrice = 0
		cart.forEach((id, i) => {
			let item = null
			products.forEach((e) => {
				if (e.id == id) {
					item = e
				}
			})
			if (item != null) {
				if (!quantities.hasOwnProperty(item.title))
					quantities[item.title] = 1
				totalPrice += item.price
				let product = document.createElement("div")
				let productName = document.createElement("span")
				let productQuantity = document.createElement("b")
				let productRemove =document.createElement("button")
				product.className="cart-item"
				productName.textContent = item.title
				productQuantity.textContent = "x"+quantities[item.title]
				productRemove.textContent="Quitar"
				productRemove.addEventListener("click", () => {
					localStorage.setItem("cart", localStorage.getItem("cart").replace(cart[i]+",",""))
					displayCart()
				})
				product.appendChild(productName)
				product.appendChild(productQuantity)
				product.appendChild(productRemove)
				cartList.appendChild(product)
			}
		})
		let totalPriceDisplay = document.createElement("span")
		let totalPriceContainer = document.createElement("div")
		let totalPriceTag = document.createElement("b")
		totalPriceContainer.className = "totalPrice"
		totalPriceDisplay.textContent = "Precio total "
		totalPriceTag.textContent = totalPrice+"$"
		totalPriceContainer.appendChild(totalPriceDisplay)
		totalPriceContainer.appendChild(totalPriceTag)
		cartList.appendChild(totalPriceContainer)
	} else {
		let noContnet = document.createElement("i")
		noContnet.textContent = "No hay nada en el carrito, por ahora"
		cartList.appendChild(noContnet)
	}
}

document.getElementById("cart").addEventListener("click", () => {
	let cartDisplay = document.getElementById("cart-display")
	displayCart()
	cartDisplay.style.animation = "show-cart 0.25s forwards"
	document.getElementById("close-cart").addEventListener("click", () => {
		cartDisplay.style.animation = "hide-cart 0.25s"
	})
})