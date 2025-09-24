const renderEvents = async () => {
    const response = await fetch('http://localhost:3001/events')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    if (data) {
        data.map(event => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            topContainer.style.backgroundImage = `url(${event.image})`

            const name = document.createElement('h3')
            name.textContent = event.name
            bottomContainer.appendChild(name)

            const pricePoint = document.createElement('p')
            pricePoint.textContent = 'Price: ' + event.pricePoint
            bottomContainer.appendChild(pricePoint)

            const audience = document.createElement('p')
            audience.textContent = 'Great For: ' + event.audience
            bottomContainer.appendChild(audience)

            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.setAttribute('role', 'button')
            link.href = `/events/${event.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer)

            mainContent.appendChild(card)
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = "No Current Events 😞"
        mainContent.appendChild(message)
    }
}

renderEvents()