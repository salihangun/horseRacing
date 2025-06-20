<template>
  <div class="controller">
    <el-button plain type="primary" size="large" @click="generateRaceSchedule">Generate Race Schedule</el-button>
    <el-button plain type="success" size="large" @click="startRace" >Start</el-button>
    <el-button plain type="danger" size="large" @click="restartGame">Restart</el-button>
 </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

function generateHorses() {
}
function generateRaceSchedule() {
  store.dispatch('generateRaceSchedule')
  setTimeout(() => {
    window.scrollTo({ top: 850, behavior: 'smooth' })
  }, 100);
}
function startRace() {
}
function restartGame() {
}
onMounted(() => {
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
