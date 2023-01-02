export const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getError = (string: string | null) =>
  string?.split('/')[1].split(')')[0].split('-').join(' ')

export const strToUpper = (string: any) =>
  string?.charAt(0).toUpperCase() + string?.slice(1)
