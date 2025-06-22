<template>
  <div v-if=" store.state.isRacing">
    <el-row class="row-bg">
      <el-col :span="24"><div class="grid-content mt-20" />
        <h2 class="mb-5 text-lg font-semibold pl-3">Round {{ store.state.currentRound + 1 }} / 6 - {{ currentRoundData.distance }}m</h2>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="24" >
        <el-card class="m-2 p-0">
          <div class="lanes mx-10 ">
            <div v-for="(horse, idx) in currentRoundData.horses" :key="horse.id" class="lane">
              <div
                  class="horse"
                  :style="horseStyle(idx)"
              >
                <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
                <span class="horse-name">{{ horse.name }}</span>
                <img :src="horseImg" class="image multi-content" style="width: 50px" />

              </div>
              <div class="finish"></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-button
        type="success"
        plain
        size="large"
        v-if="store.state.isRacing && !animating && store.state.currentRound < 5"
        class="next-btn"
        @click="runNextRound"
    >Next Round</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import horseImg from '@/assets/horse.gif'

const raceAudio = new Audio('/race.webm')
raceAudio.loop = true

const store = useStore()
const animating = ref(false)
const horsePositions = ref<number[]>([])
const horseTransitions = ref<string[]>([])
const finishOrder = ref<number[]>([])
const laneWidth = ref(0)
const HORSE_WIDTH = 200

const currentRoundData = computed(() => store.state.raceSchedule[store.state.currentRound])

function horseStyle(idx: number) {
  let left = horsePositions.value[idx] ?? 0
  if (left === 100 && laneWidth.value) {
    //yarış bitiminde at ekrandan cıkmasın istersen + yerine - ver
    const percent = ((laneWidth.value + HORSE_WIDTH) / laneWidth.value) * 100
    left = percent
  }
  return {
    left: left + '%',
    transition: animating.value ? horseTransitions.value[idx] : 'none'
  }
}

function updateLaneWidth() {
  setTimeout(() => {
    const lane = document.querySelector('.lane') as HTMLElement
    if (lane) laneWidth.value = lane.offsetWidth
  }, 0)
}

watch(() => store.state.isRacing, (isRacing) => {
  if (isRacing && currentRoundData.value) {
    updateLaneWidth()
    startRound()
  }
})

function startRound() {
  horsePositions.value = new Array(10).fill(0)
  horseTransitions.value = new Array(10).fill('none')
  finishOrder.value = []
  animating.value = false

  const roundDistance = currentRoundData.value.distance
  const baseDuration = 10 // sn
  const durationPerMeter = baseDuration / 1000 // sn/metre
  const roundDuration = roundDistance * durationPerMeter // sn

  const horses = currentRoundData.value.horses
  const conditions = horses.map((h: any) => h.condition)
  const maxCond = Math.max(...conditions)
  const minCond = Math.min(...conditions)

  // Her at için süreyi hesapla: round süresi * kondisyon oranı
  function getDuration(condition: number) {
    const minFactor = 0.7, maxFactor = 1.1
    if (maxCond === minCond) return roundDuration
    // Yüksek kondisyon daha kısa sürede bitirsin
    const factor = minFactor + (maxCond - condition) * (maxFactor - minFactor) / (maxCond - minCond)
    return roundDuration * factor
  }

  nextTick(() => {
    // 1. Her at için transition'ı ayarla
    horseTransitions.value = horses.map((h: any) =>
        `left ${getDuration(h.condition)}s linear`
    )
    animating.value = true

    try {
      raceAudio.currentTime = 0
      raceAudio.play()
    } catch (e) {
      console.warn('Audio auto-start failed.')
    }

    // 2. Hepsini aynı anda finish'e gönder
    horsePositions.value = new Array(10).fill(100)

    // 3. Bitme sırasını takip et
    horses.forEach((h: any, idx: number) => {
      const duration = getDuration(h.condition) * 1000
      setTimeout(() => {
        finishOrder.value.push(idx)
        if (finishOrder.value.length === horses.length) {
          store.commit('addResult', {
            round: store.state.currentRound + 1,
            horses: finishOrder.value.map(i => horses[i]),
            distance: currentRoundData.value.distance
          })
          animating.value = false
          raceAudio.pause()
          raceAudio.currentTime = 0
        }
      }, duration)
    })
  })
}

function runNextRound() {
  if (store.state.currentRound < 5) {
    store.commit('setCurrentRound', store.state.currentRound + 1)
    animating.value = false
    horsePositions.value = new Array(10).fill(0)
    horseTransitions.value = new Array(10).fill('none')
    finishOrder.value = []
    setTimeout(() => {
      updateLaneWidth()
      startRound()
    }, 50)
  } else {
    store.commit('setIsRacing', false)
    raceAudio.pause()
    raceAudio.currentTime = 0
  }
}
watch(() => store.state.restartFlag, () => {
  animating.value = false
  horsePositions.value = new Array(10).fill(0)
  horseTransitions.value = new Array(10).fill('none')
  finishOrder.value = []
  raceAudio.pause()
  raceAudio.currentTime = 0
})
</script>
<style scoped>
.lane { height: 48px; border-bottom: 1px dashed #bbb; position: relative; margin-bottom: 10px; background: #f9f9f9; }
.horse {
  position: absolute;
  top: 6px;
  left: 0;
  width: 190px;
  height: 36px;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding-left: 8px;
  font-weight: bold;
}
.horse-name { margin-left: 6px;
  font-size: 1rem;
  font-weight: bold;
  width: calc(100% - 66px);
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.finish { position: absolute; right: 0; top: 0; height: 100%; width: 8px; background: repeating-linear-gradient(45deg, #d33, #d33 4px, #fff 4px, #fff 8px); border-radius: 6px; }
.next-btn { margin: 20px auto 0 auto; display: block;  }
</style>
