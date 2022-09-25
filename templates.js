
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
    constructor(x, y, angle) {
        this.x = x
        this.y = y
        this.angle = angle
    }
}
