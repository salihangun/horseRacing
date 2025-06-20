import { createStore } from 'vuex'
import type { Horse, RaceRound, State, RaceResult } from "../interface/state-interface"

const horseColors = [
    '#332d29', '#a17853', '#785234', '#cbc5ae', '#c7c3ba', '#e2ad76', '#9d6b47',
    '#c1a181', '#383838', '#7c5e3c', '#b22222', '#4682b4', '#228b22', '#ff8c00',
    '#d2691e', '#8a2be2', '#ff1493', '#2e8b57', '#00ced1', '#ffd700'
]
const horseNames = [
    "Siyah Havyar", "Alydar", "Amerikan Firavunu", "AP Bağımsız", "Barbaro", "Onaylandı", "Kalın Cetvel", "Alıntı",
    "Kont Filosu", "Dr. Fager", "Kırmızı Rom", "Kutsal Boğa", "Savunmak", "Kelso", "Siste Kaybolmuş", "Savaş Adamı",
    "Yerli Dansçı", "Phar Turu", "Tutulma", "Serseri"
]
const roundDistances = [1200, 1400, 1600, 1800, 2000, 2200]

function generateHorses(): Horse[] {
    return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: horseNames[i % horseNames.length],
        color: horseColors[i % horseColors.length],
        condition: Math.floor(Math.random() * 100) + 1
    }))
}

const state: State = {
    horses: [],
    raceSchedule: [],
    results: [],
    currentRound: 0,
    isRacing: false,
    hasGenerated: false,
    hasScheduled: false,
    restartFlag: false
}

const store = createStore({
    state: state as State,
    mutations: {
        triggerRestartFlag(state: State) {
            state.restartFlag = !state.restartFlag
        },
        setHorses(state: State, horses: Horse[]) {
            state.horses = horses
            state.hasGenerated = true
            state.hasScheduled = false
        },
        setRaceSchedule(state: State, schedule: RaceRound[]) {
            state.raceSchedule = schedule
            state.currentRound = 0
            state.hasScheduled = true
            state.isRacing = false
            state.results = []
        },
        setCurrentRound(state: State, round: number) {
            state.currentRound = round
        },
        setIsRacing(state: State, isRacing: boolean) {
            state.isRacing = isRacing
        },
        addResult(state: State, result: RaceResult) {
            state.results.push(result)
        },
        resetGame(state: State) {
            state.horses = []
            state.raceSchedule = []
            state.results = []
            state.currentRound = 0
            state.isRacing = false
            state.hasGenerated = false
            state.hasScheduled = false
        }
    },
    actions: {
        generateHorses({ commit }: { commit: Function }) {
            commit('setHorses', generateHorses())
        },
        generateRaceSchedule({ state, commit }: { state: State; commit: Function }) {
            const schedule: RaceRound[] = roundDistances.map((distance, idx) => {
                const shuffled = [...state.horses].sort(() => 0.5 - Math.random())
                return {
                    round: idx + 1,
                    distance,
                    horses: shuffled.slice(0, 10)
                }
            })
            commit('setRaceSchedule', schedule)
        },
        restartGame({ commit }: { commit: Function }) {
            commit('resetGame')
            commit('triggerRestartFlag')
        }
    }
})

export default store
