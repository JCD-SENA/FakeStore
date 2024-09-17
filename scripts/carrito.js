import { addCartAlert } from "./alerts.js"
import { products } from "./app.js"

export function addCart (item) {
	localStorage.setItem("carrito",item+","+localStorage.getItem("carrito"))
	displayCart()
	addCartAlert(item)
}

let cartList = document.getElementById("cart-elements")

function parseCart () {
	if (localStorage.getItem("carrito") == null || localStorage.getItem("carrito") == "null")
		return "No hay nada en el carrito"
	let res = []
	localStorage.getItem("carrito").split(",").forEach((item, i) => {
		if (products[parseInt(item)] != undefined)
			res.push(products[parseInt(item)])
	})
	return res
}

function displayCart() {
	let cart = parseCart()
	cartList.innerHTML = ""
	if (Array.isArray(cart)) {
		let cartIds = localStorage.getItem("carrito").split(",")
		let quantities = {}
		let totalPrice = 0
		cart.forEach((item, i) => {
			if (quantities.hasOwnProperty(item["title"]))
				quantities[item["title"]] += 1
			else
				quantities[item["title"]] = 1
			totalPrice += item["price"]
		})
		let totalPriceDisplay = document.createElement("span")
		let totalPriceContainer = document.createElement("div")
		let totalPriceTag = document.createElement("b")
		Object.keys(quantities).forEach((itemKey, i) => {
			let product = document.createElement("div")
			let productName = document.createElement("span")
			let productQuantity = document.createElement("b")
			let productRemove =document.createElement("button")
			product.className="cart-item"
			productName.textContent = itemKey
			productQuantity.textContent = "x"+quantities[itemKey]
			productRemove.textContent="Quitar"
			productRemove.addEventListener("click", () => {
				localStorage.setItem("carrito", localStorage.getItem("carrito").replace(cartIds[i]+",",""))
				displayCart()
			})
			product.appendChild(productName)
			product.appendChild(productQuantity)
			product.appendChild(productRemove)
			cartList.appendChild(product)
		})
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