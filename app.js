
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

const generateRays = (angleStep) => {
    let rays = new Array()

    // Set a default value of 10 to angleStep in case of an invalid input.
    if (angleStep <= 0 || isNaN(angleStep)) {
        angleStep = 10
    } else if (!Number.isInteger(360 / angleStep)) {
        angleStep = 10
    }

    for (let angle = 0; angle < 360; angle += angleStep) {
        const dir = angleToCoordiantes(degreeToRadians(angle))
        rays.push(new Ray(0, 0, dir))
    }

    return rays
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

const angleToCoordiantes = (angle) => {
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
}

const degreeToRadians = (angle) => {
    return angle * (Math.PI / 180)
}

const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

(function main() {
    // SETUP
    const walls = generateWalls(5, 0.05)
    const lineHeight = 18

    walls.push(
        new Wall(0, 0, canvas.width, 0),                            // Top wall
        new Wall(canvas.width, 0, canvas.width, canvas.height),     // Right wall
        new Wall(canvas.width, canvas.height, 0, canvas.height),    // Bottom wall
        new Wall(0, canvas.height, 0, 0)                            // Left wall
    )

    drawText(0, 0, lineHeight)
    drawWalls(walls)

    const rays = generateRays(0.5)

    // LOOP
    window.onmousemove = (ev) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        const mouseX = ev.pageX
        const mouseY = ev.pageY

        drawText(mouseX, mouseY, lineHeight)
        drawWalls(walls)

        for (const ray of rays) {
            ray.x = mouseX
            ray.y = mouseY

            let closestPoint = null
            let closestDistance = Infinity

            for (const wall of walls) {
                const intersectionPoint = ray.wallIntersectionCheck(wall)
                
                if (intersectionPoint) {
                    const currentDistance = 
                        calculateDistance(ray.x, ray.y, intersectionPoint.x, intersectionPoint.y)

                    if (currentDistance < closestDistance) {
                        closestDistance = currentDistance
                        closestPoint = intersectionPoint
                    }
                }
            }

            if (closestPoint) {
                ray.cast(closestPoint, "rgba(255, 255, 255, 0.4)")
            }
        }
    }
}())
