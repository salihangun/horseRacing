<template>
  <div v-if="schedule.length" class="round-schedule">
    <el-row class="row-bg">
      <el-col :span="24"><div class="grid-content" />
        <h2 class="mb-5 text-lg font-semibold pl-3">Yarış Takvimi (6 Round):</h2>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="8" v-for="round in schedule" :key="round.round" >
        <el-card class="m-2 p-0">
          <h2 class="mb-5 text-lg font-semibold pl-3" style="border-bottom: 1px solid #303133">Round {{ round.round }} - {{ round.distance }}m</h2>
          <ul>
            <li v-for="horse in round.horses" :key="horse.id">
              <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
              {{ horse.name }}
              <span class="font-bold text-sm" style="color:#888;"> - Condition: {{ horse.condition }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const schedule = computed(() => store.state.raceSchedule)
</script>

<style scoped>
.color-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 6px;
  border: 1px solid #aaa;
  vertical-align: middle;
}
</style>
