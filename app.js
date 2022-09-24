
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

for (let i = 0; i < 8; i++) {
    const coordinates = getRandomCoordinates(0.05)
    wall = new Wall(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2)
    wall.draw("white")
}