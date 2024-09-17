export function addCartAlert(msg) {
    let background = document.createElement("div")
    let messageItself = document.createElement("div")
    let text = document.createElement("h2")
    let button = document.createElement("button")
    background.className = "AlertBg"
    messageItself.className = "product"
    messageItself.id = "AlertMessageItself"
    button.textContent = "Ok"
    text.textContent = msg
    
    button.addEventListener("click", (element) => {
        document.body.removeChild(background)
    })

    messageItself.appendChild(text)
    messageItself.appendChild(button)
    background.appendChild(messageItself)
    document.body.appendChild(background)
}