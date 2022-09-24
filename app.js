
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

wall = new Wall(50, 50, 150, 210)
wall.draw("white")

console.log(wall.calculateLength());