import { IPoint } from './types'

function render(pos: IPoint, context: CanvasRenderingContext2D): void {
  context.fillStyle = 'rgb(255,0,0)'
  context.beginPath()
  context.arc(pos.x, pos.y, 30, 0, 2 * Math.PI)
  context.closePath()
  context.fill()
}

export function startGame(context: CanvasRenderingContext2D): void {
  render({ x: 200, y: 200 }, context)
}
