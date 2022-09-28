
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

const generateWalls = (numberOfWalls, marginFactor) => {
    let walls = new Array()

    for (let i = 0; i < numberOfWalls; i++) {
        const coordinates = getRandomCoordinates(marginFactor)
        const wall = new Wall(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2)
        walls.push(wall)
    }

    return walls
}

const drawWalls = (walls) => {
    for (const wall of walls) {
        wall.draw("white")
    }
}

const drawText = (mouseX, mouseY, lineHeight) => {
    ctx.font = `${lineHeight}px Consolas`
    ctx.fillStyle = "white"
    ctx.fillText(`Mouse Pos X: ${mouseX}`, 0, lineHeight)
    ctx.fillText(`Mouse Pos Y: ${mouseY}`, 0, lineHeight * 2)
}

(function main() {
    const walls = generateWalls(5, 0.05)
    const lineHeight = 18

    drawText(0, 0, lineHeight)
    drawWalls(walls)
    
    const ray = new Ray(100, 200)
    ray.draw("white")

    for (const wall of walls) {
        console.log(wall.x1, wall.y1, wall.x2, wall.y2)
        console.log(ray.wallIntersectionCheck(wall))
    }

    window.onmousemove = (ev) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        const mouseX = ev.pageX
        const mouseY = ev.pageY
        
        drawText(mouseX, mouseY, lineHeight)
        drawWalls(walls)

        ray.setDirection(mouseX, mouseY)
        for (const wall of walls) {
            ray.wallIntersectionCheck(wall)
        }

        ray.draw("white")
    }
}())
