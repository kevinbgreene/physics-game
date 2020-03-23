export interface IPoint {
  x: number
  y: number
}

export interface IRect {
  width: number
  height: number
}

export interface IParticle {
  pos: IPoint
  radius: number
  velocity: IPoint
}

export interface IWorld {
  gravity: number
  drag: number
  bounce: number
  terminalVelocity: number
}
