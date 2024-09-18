import { addCartAlert } from "./alerts.js"
import { products } from "./app.js"

export function addCart (item) {
	let existingItem = null
	if (localStorage.getItem("cart") != "" && localStorage.getItem("cart") != null) {
		parseCart().forEach((e) => {
			if (e.id == item.id) {
				existingItem = e
			}
		})
	}
	if (existingItem == null) {
		localStorage.setItem("cart",JSON.stringify({"id": item.id, "quantity": 1})+","+localStorage.getItem("cart"))
		displayCart()
		addCartAlert("Se ha añadido el producto \""+item.title+"\" al carrito!")
	} else {
		addCartAlert("El producto ya fue añadido al carrito")
	}
}

let cartList = document.getElementById("cart-elements")

function parseCart () {
	if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == "")
		return "No hay nada en el carrito"
	return JSON.parse("["+localStorage.getItem("cart").slice(0,-1)+"]")
}

function increaseProduct (obj) {
	let newItem = {...obj}
	newItem.quantity += 1
	localStorage.setItem("cart", localStorage.getItem("cart").replace(JSON.stringify(obj)+",",JSON.stringify(newItem)+","))
	displayCart()
}

function decreaseProduct (obj) {
	let newItem = {...obj}
	newItem.quantity -= 1
	if (newItem.quantity > 0) {
		localStorage.setItem("cart", localStorage.getItem("cart").replace(JSON.stringify(obj)+",",JSON.stringify(newItem)+","))
		displayCart()
	} else {
		displayCart()
		deleteProduct(obj)
	}
}

function deleteProduct (obj) {
	localStorage.setItem("cart", localStorage.getItem("cart").replace(JSON.stringify(obj)+",",""))
	displayCart()
}

function displayCart() {
	let cart = parseCart()
	cartList.innerHTML = ""
	if (typeof cart !== "string") {
		let quantities = {}
		let totalPrice = 0
		cart.forEach((obj, i) => {
			let item = null
			products.forEach((e) => {
				if (e.id == obj.id) {
					item = e
				}
			})
			if (item != null) {
				totalPrice += item.price * obj.quantity
				let product = document.createElement("div")
				let productName = document.createElement("span")
				let productQuantity = document.createElement("b")
				let productRemove =document.createElement("button")
				let productIncrease = document.createElement("b")
				let productDecrease = document.createElement("b")
				product.className="cart-item"
				productName.textContent = item.title
				productQuantity.textContent = "x"+obj.quantity
				productQuantity.className = "quantity"
				productRemove.textContent="Quitar"
				productDecrease.textContent = "-"
				productIncrease.textContent = "+"
				productIncrease.addEventListener("click", () => {
					increaseProduct(obj)
				})
				productDecrease.addEventListener("click", () => {
					decreaseProduct(obj)
				})
				productRemove.addEventListener("click", () => {
					deleteProduct(obj)
				})
				product.appendChild(productName)
				product.appendChild(productIncrease)
				product.appendChild(productQuantity)
				product.appendChild(productDecrease)
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