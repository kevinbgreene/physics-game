interface IKeyMap {
  [key: string]: boolean
}

export enum ControllerKeys {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}

export type InputCallback<T> = (args: T) => void

export interface IController<T> {
  update: InputCallback<T>
}

export type IControllerOptions<T> = Partial<
  Record<ControllerKeys, InputCallback<T>>
>

export function createController<T>(
  options: IControllerOptions<T>,
): IController<T> {
  const keys: IKeyMap = {}

  document.addEventListener('keydown', (evt) => {
    if (evt.code) {
      keys[evt.code] = true
    }
  })

  document.addEventListener('keyup', (evt) => {
    if (evt.code) {
      keys[evt.code] = false
    }
  })

  return {
    update: (args: T): void => {
      for (const key in options) {
        const callback = options[key as ControllerKeys]
        if (keys[key] && callback != undefined) {
          callback(args)
        }
      }
    },
  }
}
