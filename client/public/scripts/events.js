const renderEvents = async () => {
    const response = await fetch('http://localhost:3001/events')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')
    if (!mainContent) return

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
            link.href = `/event.html?id=${event.id}`
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

const renderEvent = async () => {
    const params = new URLSearchParams(window.location.search)
    const requestedID = parseInt(params.get('id'))

    const response = await fetch('http://localhost:3001/events')
    const data = await response.json()

    const eventContent = document.getElementById('gift-content')
    if (!eventContent) return

    let event
    event = data.find(event => event.id === requestedID)

    if (event) {
        document.getElementById('image').src = event.image
        document.getElementById('name').textContent = event.name
        document.getElementById('submittedBy').textContent = 'Submitted by: ' + event.submittedBy
        document.getElementById('pricePoint').textContent = 'Price: ' + event.pricePoint
        document.getElementById('audience').textContent = 'Great For: ' + event.audience
        document.getElementById('description').textContent = event.description
        document.title = `Vently - ${event.name}`
      
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        eventContent.appendChild(message)
    }
}

const pathname = window.location.pathname;

const validPages = ['/', '/index.html', '/event.html'];

if (!validPages.includes(pathname)) {
    window.location.href = '/404.html';
} else {
    if (pathname === '/' || pathname === '/index.html') {
        renderEvents();
    }

    if (pathname === '/event.html') {
        const params = new URLSearchParams(window.location.search);
        const requestedID = parseInt(params.get('id'));

        if (!requestedID) {
            window.location.href = '/404.html';
        } else {
            renderEvent();
        }
    }
}