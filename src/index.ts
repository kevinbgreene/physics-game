const canvas: HTMLCanvasElement = document.createElement('canvas')
const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
const root: HTMLElement | null = document.getElementById('root')

if (context === null || root === null) {
  throw new Error('Unable to add canvas')
}

root.appendChild(canvas)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.fillStyle = 'rgb(255,0,0)'
context.beginPath()
context.arc(200, 200, 30, 0, 2 * Math.PI)
context.closePath()
context.fill()
