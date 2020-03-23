import { IParticle } from './types'
import { createController, IController, ControllerKeys } from './controller'
import { IPhysicsEngine, createEngine } from './physics'

function render(particle: IParticle, context: CanvasRenderingContext2D): void {
  const canvas: HTMLCanvasElement = context.canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'rgb(255,0,0)'
  context.beginPath()
  context.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI)
  context.closePath()
  context.fill()
}

const engine: IPhysicsEngine = createEngine({
  gravity: 0.25,
  drag: 0.998,
  bounce: 0.8,
  terminalVelocity: 20,
})

const controller: IController<IParticle> = createController<IParticle>({
  [ControllerKeys.UP]: (particle: IParticle) => {
    particle.velocity.y = -0.5 + Math.abs(particle.velocity.y) * -1.9
  },
  [ControllerKeys.LEFT]: (particle: IParticle) => {
    particle.velocity.x = -0.5 + Math.abs(particle.velocity.x) * -1.9
  },
  [ControllerKeys.RIGHT]: (particle: IParticle) => {
    particle.velocity.x = -0.5 + Math.abs(particle.velocity.x) * 1.9
  },
})

export function startGame(context: CanvasRenderingContext2D): void {
  const particle: IParticle = {
    pos: {
      x: context.canvas.width / 2,
      y: context.canvas.height / 2,
    },
    radius: 20,
    velocity: { x: 7, y: 0 },
  }

  function loop(): void {
    requestAnimationFrame(() => {
      engine.update({
        bodies: [particle],
        bounds: {
          width: context.canvas.width,
          height: context.canvas.height,
        },
      })
      controller.update(particle)
      render(particle, context)
      loop()
    })
  }

  loop()
}
