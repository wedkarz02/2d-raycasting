
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

ctx.fillStyle = "#00000"
ctx.fillRect(0, 0, canvas.width, canvas.height)
