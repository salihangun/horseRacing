<template>
  <div v-if="schedule.length" class="round-schedule mt-20">
    <el-row class="row-bg">
      <el-col :span="24"><div class="grid-content" />
        <h2 class="mb-5 text-lg font-semibold pl-3">Race Program (6 Round):</h2>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="4" v-for="round in schedule" :key="round.round" >
        <el-card class="m-2 p-0">
          <h2 class="mb-5 text-lg font-semibold pl-3" style="border-bottom: 1px solid #303133">Round {{ round.round }} - {{ round.distance }}m</h2>
          <ul>
            <li v-for="horse in round.horses" :key="horse.id">
              <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="`Condition: ${horse.condition}`"
                  placement="top-start"
              ><span class="winner cursor-pointer" >{{ horse.name }}</span>
              </el-tooltip>
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
</style>
