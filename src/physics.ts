import { IWorld, IParticle, IRect } from './types'

export interface IEngineUpdateArgs {
  bodies: Array<IParticle>
  bounds: IRect
}

export interface IPhysicsEngine {
  update: (args: IEngineUpdateArgs) => void
}

export function createEngine(options: IWorld): IPhysicsEngine {
  return {
    update: ({ bodies, bounds }: IEngineUpdateArgs): void => {
      for (const particle of bodies) {
        if (particle.velocity.x > options.terminalVelocity) {
          particle.velocity.x = options.terminalVelocity
        } else if (particle.velocity.x < -options.terminalVelocity) {
          particle.velocity.x = -options.terminalVelocity
        }

        if (particle.velocity.y > options.terminalVelocity) {
          particle.velocity.y = options.terminalVelocity
        } else if (particle.velocity.y < -options.terminalVelocity) {
          particle.velocity.y = -options.terminalVelocity
        }

        particle.pos.x += particle.velocity.x
        particle.pos.y += particle.velocity.y

        if (particle.pos.y <= particle.radius) {
          // Handle top bounce
          particle.pos.y = particle.radius
          particle.velocity.x = particle.velocity.x * options.bounce
          particle.velocity.y = particle.velocity.y * -options.bounce
        } else if (particle.pos.y >= bounds.height - particle.radius) {
          // Hangle bottom bounce
          particle.pos.y = bounds.height - particle.radius
          particle.velocity.x = particle.velocity.x * options.bounce
          particle.velocity.y = particle.velocity.y * -options.bounce
        } else if (particle.pos.x >= bounds.width - particle.radius) {
          // Handle right bounce
          particle.pos.x = bounds.width - particle.radius
          particle.velocity.x = particle.velocity.x * -options.bounce
        } else if (particle.pos.x <= particle.radius) {
          // Handle left bounce
          particle.pos.x = particle.radius
          particle.velocity.x = particle.velocity.x * -options.bounce
        } else {
          particle.velocity.y += options.gravity
          particle.velocity.x *= options.drag
          particle.velocity.y *= options.drag
        }
      }
    },
  }
}
