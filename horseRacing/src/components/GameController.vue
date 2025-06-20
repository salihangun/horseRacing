<template>
  <div class="controller">
    <el-button plain type="primary"  size="large" @click="generateRaceSchedule">Generate Race Schedule</el-button>
 </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

function generateHorses() {
}
function generateRaceSchedule() {
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
.horse-list {
  float: left;
  max-width: 410px;
  background: #fffefa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 18px 24px 12px 24px;
  box-shadow: 0 1px 4px #0001;
}
.horse-list ul {
  margin: 0;
  padding: 0 0 0 8px;
  list-style: none;
}
.horse-list li {
  margin-bottom: 7px;
  font-size: 1.08rem;
  display: flex;
  align-items: center;
}
.color-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 8px;
  border: 1px solid #aaa;
  vertical-align: middle;
}
</style>
