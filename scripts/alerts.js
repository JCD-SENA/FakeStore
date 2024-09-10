import { products } from "./app.js"

export function addCartAlert(item) {
    let data = products[item]
    let background = document.createElement("div")
    let messageItself = document.createElement("div")
    let text = document.createElement("h2")
    let button = document.createElement("button")
    background.className = "AlertBg"
    messageItself.className = "producto"
    messageItself.id = "AlertMessageItself"
    button.textContent = "Ok"
    text.textContent = "Se ha añadido el producto \""+data["title"]+"\" al carrito!"
    
    button.addEventListener("click", (element) => {
        document.body.removeChild(background)
    })

    messageItself.appendChild(text)
    messageItself.appendChild(button)
    background.appendChild(messageItself)
    document.body.appendChild(background)
}