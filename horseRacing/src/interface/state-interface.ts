export interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

export interface RaceRound {
  round: number
  distance: number
  horses: Horse[]
}
export interface State {
  horses: Horse[],
  raceSchedule: RaceRound[]

}
