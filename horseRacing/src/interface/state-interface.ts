export interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

export interface RaceResult {
  round: number
  horses: Horse[]
  distance: number
}

export interface RaceRound {
  round: number
  distance: number
  horses: Horse[]
}

export interface State {
  horses: Horse[]
  raceSchedule: RaceRound[]
  results: RaceResult[]
  currentRound: number
  isRacing: boolean
  hasGenerated: boolean
  hasScheduled: boolean
  restartFlag: boolean
}
