
class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    draw(color) {
        ctx.strokeStyle = color
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.stroke()
    }

    calculateLength() {
        return Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2)
    }
}

class Ray {
    constructor(x, y, dir) {
        this.x = x
        this.y = y
        this.dir = dir
    }

    cast(point, color) {
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
    }

    wallIntersectionCheck(wall) {
        // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        const x1 = wall.x1
        const y1 = wall.y1
        const x2 = wall.x2
        const y2 = wall.y2

        const x3 = this.x
        const y3 = this.y
        const x4 = this.x + this.dir.x
        const y4 = this.y + this.dir.y

        const denominator = 
            (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

        if (denominator == 0) {
            return
        }

        const t = 
            ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator
        const u = 
            ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator

        if (t > 0 && t < 1 && u > 0) {
            return {
                x: x1 + t * (x2 - x1),
                y: y1 + t * (y2 - y1)
            }
        } else {
            return
        }
    }

    normalize(number, min, max) {
        return (number - min) / (max - min)
    }

    // setDirection(x, y) {
    //     this.dir.x = this.normalize(x - this.x, 0, canvas.width)
    //     this.dir.y = this.normalize(y - this.y, 0, canvas.height)
    // }
}
