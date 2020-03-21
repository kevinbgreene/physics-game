import { IParticle, IWorld } from './types'

function render(particle: IParticle, context: CanvasRenderingContext2D): void {
  const canvas: HTMLCanvasElement = context.canvas
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgb(255,0,0)'
  context.beginPath()
  context.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI)
  context.closePath()
  context.fill()
}

function update(particle: IParticle, world: IWorld): void {
  particle.pos.x += particle.velocity.x
  particle.pos.y += particle.velocity.y

  particle.velocity.y += world.gravity
}

export function startGame(context: CanvasRenderingContext2D): void {
  const particle: IParticle = {
    pos: { x: context.canvas.width / 2, y: 0 },
    radius: 20,
    velocity: { x: 1, y: 2 },
  }

  function loop(): void {
    requestAnimationFrame(() => {
      render(particle, context)
      update(particle, {
        gravity: 0.25,
      })
      loop()
    })
  }

  loop()
}
