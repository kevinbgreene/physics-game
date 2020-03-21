import { startGame } from './app'

const canvas: HTMLCanvasElement = document.createElement('canvas')
const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
const root: HTMLElement | null = document.getElementById('root')

if (context === null || root === null) {
  throw new Error('Unable to add canvas')
}

root.appendChild(canvas)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

startGame(context)
