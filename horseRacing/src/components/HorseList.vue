<template>
<div v-if="store.state.horses.length">
  <el-row class="row-bg">
    <el-col :span="24"><div class="grid-content" />
      <h2 class="mb-5 text-lg font-semibold pl-3">Horse List:</h2>
    </el-col>
  </el-row>
  <el-row class="row-bg">
    <el-col :span="6" v-for="horse in store.state.horses" :key="horse.id">
      <el-card class="m-2 p-0">
        <div style="width: 60px" class="float-left mb-4"><img
            :src="horseImg"
            class="image"
            style="width: 50px;height: 50px;border-radius: 50%"
        /></div>
        <div style="width:calc(100% - 60px)" class="float-left">
          <p class="font-bold">
            <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
              {{ horse.name }}
            <span class="left block text-sm" style="color:#888;">Condition: {{ horse.condition }}</span>
          </p>
        </div>
      </el-card>
    </el-col>
  </el-row>

</div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import horseImg from '@/assets/horse.png'

const store = useStore()

function generateHorses() {
  store.dispatch('generateHorses')
}
onMounted(() => {
  generateHorses()
})
</script>

<style scoped>
</style>
