import { createStore } from 'vuex'
export interface Horse {
    id: number
    name: string
    color: string
    condition: number
}


export interface State {
    horses: Horse[]
}

const horseColors = [
    '#332d29', '#a17853', '#785234', '#cbc5ae', '#c7c3ba', '#e2ad76', '#9d6b47',
    '#c1a181', '#383838', '#7c5e3c', '#b22222', '#4682b4', '#228b22', '#ff8c00',
    '#d2691e', '#8a2be2', '#ff1493', '#2e8b57', '#00ced1', '#ffd700'
]
const horseNames = [
    "Onaylandı", "Alydar", "Amerikan Firavunu", "AP Bağımsız", "Barbaro", "Siyah Havyar", "Kalın Cetvel", "Alıntı",
    "Kont Filosu", "Dr. Fager", "Tutulma", "Kutsal Boğa", "Savunmak", "Kelso", "Siste Kaybolmuş", "Savaş Adamı",
    "Yerli Dansçı", "Phar Turu", "Kırmızı rom", "Serseri"
]


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
}

export default createStore<State>({
    state,
    mutations: {
        setHorses(state: State, horses: Horse[]) {
            state.horses = horses
        },
    },
    actions: {
        generateHorses({ commit }) {
            commit('setHorses', generateHorses())
        },
    }
})
