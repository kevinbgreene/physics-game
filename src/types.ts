export interface IPoint {
  x: number
  y: number
}

export interface IParticle {
  pos: IPoint
  radius: number
  velocity: IPoint
}

export interface IWorld {
  gravity: number
}
