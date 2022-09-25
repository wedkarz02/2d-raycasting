
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const getRandomCoordinates = (marginFactor) => {
    const horizontalLowerBound = canvas.width  * marginFactor
    const verticalLowerBound = canvas.height * marginFactor
    const horizontalUpperBound = canvas.width - horizontalLowerBound
    const verticalUpperBound = canvas.height - verticalLowerBound

    return {
        x1: Math.floor(Math.random() * (horizontalUpperBound - horizontalLowerBound) +  horizontalLowerBound),
        y1: Math.floor(Math.random() * (verticalUpperBound - verticalLowerBound) + verticalLowerBound),
        x2: Math.floor(Math.random() * (horizontalUpperBound - horizontalLowerBound) +  horizontalLowerBound),
        y2: Math.floor(Math.random() * (verticalUpperBound - verticalLowerBound) + verticalLowerBound)
    }
}

const drawCircle = (x, y, radius, color) => {
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
}

let walls = new Array()

for (let i = 0; i < 8; i++) {
    const coordinates = getRandomCoordinates(0.05)
    walls.push(new Wall(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2))
}

window.onmousemove = (ev) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const wall of walls) {
        wall.draw("white")
    }

    const mouseX = ev.pageX
    const mouseY = ev.pageY
}
