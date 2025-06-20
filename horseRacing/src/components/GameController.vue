<template>
  <div class="controller">
    <el-button plain type="primary" size="large" :disabled="!store.state.hasGenerated || store.state.hasScheduled" @click="generateRaceSchedule">Generate Race Schedule</el-button>
    <el-button plain type="success" size="large" :disabled="!canStart" @click="startRace" >Start</el-button>
    <el-button plain type="danger" size="large" @click="restartGame">Restart</el-button>
 </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const canStart = computed(() =>
    store.state.hasGenerated &&
    store.state.hasScheduled &&
    !store.state.isRacing &&
    store.state.results.length < 6
)

function generateHorses() {
  store.dispatch('generateHorses')
}
function generateRaceSchedule() {
  store.dispatch('generateRaceSchedule')
  setTimeout(() => {
    window.scrollTo({ top: 850, behavior: 'smooth' })
  }, 100);
}
function startRace() {
  store.commit('setIsRacing', true)
  setTimeout(() => {
    window.scrollTo({ top: 1850, behavior: 'smooth' })
  }, 100);
}
function restartGame() {
  store.dispatch('restartGame')
  generateHorses()
}
onMounted(() => {
  generateHorses()
})
</script>

<style scoped>
.controller {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-bottom: 32px;
}
</style>
